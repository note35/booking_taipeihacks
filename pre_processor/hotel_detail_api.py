from http.client import HTTPSConnection
from base64 import b64encode
import json
import sqlite3
import os
import sys
import random
from tqdm import tqdm

sys.path.insert(0, '../libs/color_processor/')
from color_processor import calc_color_to_dict, write2file

def get_review_score_word(score):
    if score >= 9:
        return 'wonderful'
    elif score >= 8:
        return 'very_good'
    elif score >= 7:
        return 'good'
    elif score >= 6:
        return 'pleasant'
    elif score >= 0:
        return 'normal'
    else:
        return 'no_rating'

#0-10000
def get_view_word(score):
    if score >= 4:
        return 'very_hot'
    elif score >= 2:
        return 'hot'
    elif score >= -1:
        return 'normal'
    elif score >= -8:
        return 'cold'
    else:
        return 'unknown'


image_path = "hotel_images/taipei/"
hotel_colors_file = "hotel_images/taipei/all.json"
db_path = "../hotel.db"

if not os.path.isfile(hotel_colors_file):
    hotel_colors = calc_color_to_dict(image_path)
    write2file(hotel_colors_file, json.dumps(hotel_colors))
else:
    with open(hotel_colors_file, "r") as fptr:
        hotel_colors = json.load(fptr)
#print(hotel_colors)

hotel_ids = []
hotel_img_names = []
for root, dirs, files in os.walk(image_path):
    for file_name in files:
        if not file_name.startswith(".") and not file_name.startswith('all.json'):
            hotel_id = file_name.split('.')
            hotel_id = hotel_id[len(hotel_id)-2]
            hotel_img_names.append(file_name)
            hotel_ids.append(hotel_id)

print(len(hotel_ids))
#This sets up the https connection
c = HTTPSConnection("distribution-xml.booking.com")
#we need to base 64 encode it
#and then decode it to acsii as python 3 stores it as a byte string
userAndPass = b64encode(b"hacker234:8hqNW6HtfU").decode("ascii")
headers = { 'Authorization' : 'Basic %s' %  userAndPass }
#then connect
c.request('GET', '/json/bookings.getHotels?hotel_ids={},&languagecode=en'.format(", ".join(hotel_ids)), headers=headers)
#get the response back
res = c.getresponse()
# at this point you could check the status etc
# this gets the page text
data = res.read()
#print(data.decode("utf-8"))
hotels = json.loads(data.decode("utf-8"))
print(len(hotels))

db = sqlite3.connect(db_path)
for idx, hotel in tqdm(enumerate(hotels)):
    view_r = random.normalvariate(0, 2)
    print(hotel)
    hotel_id = hotel['hotel_id']
    try:
        hotel_color = hotel_colors[hotel_id]
    except KeyError:
        next

    db.cursor().execute(
        "INSERT INTO \"Hotels\" " +
        "(hotel_id, countrycode, city, district," +
        "latitude, longitude," +
        "img, review_score_word, review_score, review_nr," +
        "view_word, view_nr," +
        "main_color, sub_color, hex)" +
        "VALUES (\'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', {}, {}, \'{}\', {}, \'{}\', \'{}\', \'{}\');".format(
            hotel['hotel_id'], hotel['countrycode'], hotel['city'], hotel['district'],
            hotel['location']['latitude'], hotel['location']['longitude'],
            hotel_img_names[idx], get_review_score_word( float( hotel['review_score'] ) ), hotel['review_score'], hotel['review_nr'],
            get_view_word(view_r), view_r,
            hotel_color['main_color'], hotel_color['sub_color'], hotel_color['hex']
        )
    )
    db.commit()