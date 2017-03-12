from multiprocessing import Pool

from flask import Flask, jsonify, send_from_directory
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS, cross_origin

from models.hotel import HotelModel
from pre_processor.crawl_city import crawl_city

app = Flask(__name__)
CORS(app)

api = Api(app)

app.config["DATABASE"] = "./hotel.db"
app.config["HOTEL_IMG"] = "./libs/color_processor/"
hotel_model = HotelModel()

@app.teardown_appcontext
def close_connection(exception):
    hotel_model.close_connection(exception)

class CrawlCity(Resource):
    def get(self, city):
        pool = Pool(processes=1)
        result = pool.apply_async(crawl_city, [city])
        return jsonify({'status': 'success'})

class EvaluationStatistics(Resource):
    def get(self, city):
        ret = hotel_model.get_evaluation_statistics(city)
        if not ret:
            abort(404, message="City {} does not exist".format(city))
        return jsonify(ret)

class ViewsStatistics(Resource):
    def get(self, city):
        ret = hotel_model.get_views_statistics(city)
        if not ret:
            abort(404, message="City {} does not exist".format(city))
        return jsonify(ret)

class HotelList(Resource):
    def get(self, city):
        ret = hotel_model.get_hotel_list(city)
        if not ret:
            abort(404, message="City {} does not exist".format(city))
        array_of_dict = []
        for hotel in ret:
            hotel_dict = dict(hotel)
            hotel_dict['location'] = {
                'latitude': hotel['latitude'],
                'longitude': hotel['longitude']
            }
            del hotel_dict['latitude']
            del hotel_dict['longitude']
            array_of_dict.append(hotel_dict)
        return jsonify(array_of_dict)


## routing
api.add_resource(CrawlCity, "/crawl_city/<string:city>")
api.add_resource(EvaluationStatistics, "/evaluation_statistics/<string:city>")
api.add_resource(ViewsStatistics, "/views_statistics/<string:city>")
api.add_resource(HotelList, "/hotel_list/<string:city>")
@app.route('/static/image/<path:path>')
def send_js(path):
    return send_from_directory(app.config["HOTEL_IMG"], path)

if __name__ == "__main__":
    with app.app_context():
        #hotel_model.setup_init_data()
        app.run(debug=True)
