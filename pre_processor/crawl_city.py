import sys
import json
from api_connect import get_api_connector
from img_crawler import crawl_image, crawl_image_by_api
from hotel_detail_api import crawl_hotel_detail

print("Enter the city:")
city_name = sys.stdin.readline().strip()
print(city_name)

c, headers = get_api_connector()
c.request('GET', '/json/bookings.autocomplete?text={},&languagecode=en'.format(city_name), headers=headers)
res = c.getresponse()
data = res.read()
results = json.loads(data.decode("utf-8"))

for result in results:
    if 'dest_type' in result and result['dest_type'] == 'city':
        dest_id = result['dest_id']
        city_name = result['city_name']
        #crawl_image_by_api(city_name, dest_id)
        image_urls = crawl_image(city_name, dest_id)
        crawl_hotel_detail(city_name, image_urls)
