import sys
import configparser
from http.client import HTTPSConnection
from base64 import b64encode
import json
from img_crawler import crawl_image
from hotel_detail_api import crawl_hotel_detail

print("Enter the city:")
city_name = sys.stdin.readline().strip()
print(city_name)

config = configparser.ConfigParser()
config.read('../secret.ini')

c = HTTPSConnection("distribution-xml.booking.com")
userAndPassString = config['default']['user'] + ":" + config['default']['password']
userAndPass = b64encode(str.encode(userAndPassString)).decode("ascii")
headers = { 'Authorization' : 'Basic %s' %  userAndPass }
c.request('GET', '/json/bookings.autocomplete?text={},&languagecode=en'.format(city_name), headers=headers)
res = c.getresponse()
data = res.read()
results = json.loads(data.decode("utf-8"))

for result in results:
    if 'dest_type' in result and result['dest_type'] == 'city':
        dest_id = result['dest_id']
        city_name = result['city_name']
        crawl_image(city_name, dest_id)
        crawl_hotel_detail(city_name)
