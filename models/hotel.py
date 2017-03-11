import sqlite3
from flask import current_app


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

    def get_evaluation_statistics(self, city):
        self.open_connection()
        city_str = str(city)
        r = self.db.cursor().execute("SELECT * FROM main.Hotels WHERE city=?;", [city_str])
        self.db.commit()
        return r.fetchone()

    def get_views_statistics(self, city):
        self.open_connection()
        city_str = str(city)
        r = self.db.cursor().execute("SELECT * FROM main.Hotels WHERE city=?;", [city_str])
        self.db.commit()
        return r.fetchone()

    def get_reviews_statistics(self, city):
        self.open_connection()
        city_str = str(city)
        r = self.db.cursor().execute("SELECT * FROM main.Hotels WHERE city=?;", [city_str])
        self.db.commit()
        return r.fetchone()
