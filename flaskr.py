from flask import Flask, jsonify
from flask_restful import reqparse, abort, Api, Resource

from models.hotel import HotelModel

app = Flask(__name__)
api = Api(app)

app.config["DATABASE"] = "./hotel.db"
hotel_model = HotelModel()

@app.teardown_appcontext
def close_connection(exception):
    hotel_model.close_connection(exception)

class EvaluationStatistics(Resource):
    def get(self, city):
        ret = hotel_model.get_evaluation_statistics(city)
        if not ret:
            abort(404, message="Region {} does not exist".format(city))
        return jsonify({})

class ViewsStatistics(Resource):
    def get(self, city):
        ret = hotel_model.get_views_statistics(city)
        if not ret:
            abort(404, message="Region {} does not exist".format(city))
        return jsonify({})

class ReviewsStatistics(Resource):
    def get(self, city):
        ret = hotel_model.get_reviews_statistics(city)
        if not ret:
            abort(404, message="Region {} does not exist".format(city))
        return jsonify({})

class HotelList(Resource):
    def get(self, city):
        ret = hotel_model.get_hotel_list(city)
        if not ret:
            abort(404, message="Region {} does not exist".format(city))
        return jsonify({})


## routing
api.add_resource(EvaluationStatistics, "/evaluation_statistics/<string:city>")
api.add_resource(ViewsStatistics, "/views_staticstics/<string:city>")
api.add_resource(ReviewsStatistics, "/reviews_staticstics/<string:city>")
api.add_resource(HotelList, "/hotel_list/<string:city>")


if __name__ == "__main__":
    with app.app_context():
        hotel_model.setup_init_data()
        app.run(debug=True)
