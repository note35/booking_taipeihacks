import time
import urllib.request
import requests
from bs4 import BeautifulSoup
import os

def crawl_image(city_name, city_id):
    #fill offset in the end of crawl_url
    crawl_url = "http://www.booking.com/searchresults.zh-tw.html?aid=304142&label=gen173nr-1FCAEoggJCAlhYSDNiBW5vcmVmaOcBiAEBmAEwuAEHyAEM2AEB6AEB-AELqAID&sid=b2b6b157d462bd7727c111fc28a2a6c1&city=-2637882&class_interval=1&dest_id={}&dest_type=city&group_adults=2&group_children=0&label_click=undef&mih=0&no_rooms=1&raw_dest_type=city&room1=A%2CA&sb_price_type=total&rows=15&offset=".format(city_id)
    offset = 0

    image_dir_path = 'hotel_images/' + city_name + '/'
    if not os.path.exists(image_dir_path):
        os.makedirs(image_dir_path)

    last_hotel_id = -1
    while True:
        res = requests.get(crawl_url+str(offset))
        soup = BeautifulSoup(res.text, 'lxml')

        hotels = soup.select("div.sr_item.sr_item_default.sr_property_block")
        if len(hotels) > 0:
            if hotels[len(hotels)-1]['data-hotelid'] == last_hotel_id:
                break
            else:
                last_hotel_id = hotels[len(hotels)-1]['data-hotelid']

        for hotel in hotels:
            hotel_id = hotel['data-hotelid']
            print(hotel_id)
            title = hotel.select("span.sr-hotel__name")[0].text.strip()
            img_url = hotel.select("a.sr_item_photo_link img")[0]['src']
            img_type = img_url.split('.')
            img_type = img_type[len(img_type)-1]
            urllib.request.urlretrieve(img_url, image_dir_path+str(hotel_id)+'.'+img_type)

        offset = offset + 15
        time.sleep(2)


# print(len(hotels))
# print(title)

#print(title)
