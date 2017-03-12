import sqlite3
from flask import current_app
from libs.color_processor.rgb2color import color2hex

main_color_hex = {
    "Whites/Pastels": "#ffffff",
    "Grays": "#bebebe",
    "Blues": "#0000ff",
    "Greens": "#00ff00",
    "Yellow": "#ffff00",
    "Browns": "#a52a2a",
    "Oranges": "#ffa500",
    "Pinks/Violets": "#ffc0cb"
}

class HotelModel(object):

    def open_connection(self):
        self.db = sqlite3.connect(current_app.config["DATABASE"])

    def close_connection(self, exception):
        if hasattr(self, "db"):
            self.db.close()

    def setup_init_data(self):
        self.open_connection()
        try:
            self.db.cursor().execute("DROP TABLE main.Hotels")
        except:
            # table is not exist.
            pass
        self.db.cursor().execute(
            "CREATE TABLE IF NOT EXISTS main.Hotels(" +
            "ID integer PRIMARY KEY AUTOINCREMENT, " +
            "hotel_name string, " +
            "hotel_id string, " +
            "main_color string, " +
            "sub_color string, " +
            "hex string, " +
            "countrycode string, " +
            "city string, " +
            "district string, " +
            "latitude string, " +
            "longitude string, " +
            "img string, " +
            "review_score_word string, " +
            "review_score float, " +
            "review_nr integer, " +
            "view_word string, " +
            "view_nr integer)"
        )
        self.db.commit()

    def get_hotel_list(self, city):
        self.open_connection()
        self.db.row_factory = sqlite3.Row
        city_str = str(city)
        r = self.db.cursor().execute("SELECT * FROM main.Hotels WHERE city=?;", [city_str])
        self.db.commit()
        return r.fetchall()


    def seach_city_with_review_score_word(self, city, review_word):
        r = self.db.cursor().execute("SELECT * FROM main.Hotels WHERE city=? AND review_score_word=?", [city, review_word])
        self.db.commit()
        return r

    def seach_city_with_view_word(self, city, view_word):
        r = self.db.cursor().execute("SELECT * FROM main.Hotels WHERE city=? AND view_word=?", [city, view_word])
        self.db.commit()
        return r

    def get_main_components(self, r, city):
        main_color_cnt_table = {
            "Whites/Pastels": 0,
            "Grays": 0,
            "Blues": 0,
            "Greens": 0,
            "Yellow": 0,
            "Browns": 0,
            "Oranges": 0,
            "Pinks/Violets": 0
        }

        sub_color_cnt_table = {
            "Whites/Pastels": {},
            "Grays": {},
            "Blues": {},
            "Greens": {},
            "Yellow": {},
            "Browns": {},
            "Oranges": {},
            "Pinks/Violets": {}
        }

        main_components = []
        img_components = []

        for item in r:
            for color_tuple in zip(dict(item)["main_color"].split(","), dict(item)["sub_color"].split(","), dict(item)["hex"].split(",")):
                main_color_cnt_table[color_tuple[0]] += 1
                try:
                    sub_color_cnt_table[color_tuple[0]][color_tuple[1]] += 1
                except KeyError:
                    sub_color_cnt_table[color_tuple[0]][color_tuple[1]] = 1
            img_component = {
                "reviews": dict(item)["review_nr"],
                "views": dict(item)["view_word"],
                "score": dict(item)["review_score"],
                "hotel_name": dict(item)["hotel_name"],
                "url": city+"/"+dict(item)["img"]
            }
            img_components.append(img_component)

        total_main_color = sum(value for value in main_color_cnt_table.values())

        for key, value in main_color_cnt_table.items():
            sub_components = []
            for key2, value2 in sub_color_cnt_table[key].items():
                try:
                    sub_component = {
                        "name": key2,
                        "hex": color2hex(key, key2),
                        "sub_color_scale": value2/main_color_cnt_table[key],
                        "sub_color_orig": value2
                    }
                    sub_components.append(sub_component)
                except ZeroDivisionError:
                    pass

            try:
                main_component = {
                    "name": key,
                    "hex": main_color_hex[key],
                    "main_color_scale": value/total_main_color,
                    "main_color_orig": value,
                    "sub_color": sub_components
                }
                main_components.append(main_component)
            except ZeroDivisionError:
                pass

        return (sorted(main_components, key=lambda k: k["main_color_orig"], reverse=True), img_components)


    def get_evaluation_statistics(self, city):
        self.open_connection()
        self.db.row_factory = sqlite3.Row
        city_str = str(city)
        ret_json = {
            "city": city_str,
        }

        evaluation_words = ["wonderful", "very_good", "good", "pleasant", "normal", "no_rating"]
        for evaluation_word in evaluation_words:
            r = self.seach_city_with_review_score_word(city_str, evaluation_word)

            main_components = self.get_main_components(r, city_str)

            ret_json[evaluation_word] = {}
            ret_json[evaluation_word]["main_color"] = main_components[0]
            ret_json[evaluation_word]["img_urls"] = main_components[1]

        return ret_json

    def get_views_statistics(self, city):
        self.open_connection()
        self.db.row_factory = sqlite3.Row
        city_str = str(city)

        ret_json = {
            "city": city_str,
        }

        view_words = ["very_hot", "hot", "normal", "cold", "unknown"]
        for view_word in view_words:
            r = self.seach_city_with_view_word(city_str, view_word)

            main_components = self.get_main_components(r, city_str)

            ret_json[view_word] = {}
            ret_json[view_word]["main_color"] = main_components[0]
            ret_json[view_word]["img_urls"] = main_components[1]

        return ret_json
