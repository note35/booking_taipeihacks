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
    def get(self, region_id):
        ret = hotel_model.get_evaluation_statistics(region_id)
        if not ret:
            abort(404, message="Region {} does not exist".format(region_id))
        return jsonify({})

class ViewsStatistics(Resource):
    def get(self, region_id):
        ret = hotel_model.get_views_statistics(region_id)
        if not ret:
            abort(404, message="Region {} does not exist".format(region_id))
        return jsonify({})

class ReviewsStatistics(Resource):
    def get(self, region_id):
        ret = hotel_model.get_reviews_statistics(region_id)
        if not ret:
            abort(404, message="Region {} does not exist".format(region_id))
        return jsonify({})

class HotelList(Resource):
    def get(self):
        ret = hotel_model.get_hotel_list(region_id)
        if not ret:
            abort(404, message="Region {} does not exist".format(region_id))
        return jsonify({})


## routing
api.add_resource(EvaluationStatistics, "/evaluation_statistics/<region_id>")
api.add_resource(ViewsStatistics, "/views_staticstics/<region_id>")
api.add_resource(ReviewsStatistics, "/reviews_staticstics/<region_id>")
api.add_resource(HotelList, "/hotel_list/<region_id>")


if __name__ == "__main__":
    with app.app_context():
        hotel_model.setup_init_data()
        app.run(debug=True)
