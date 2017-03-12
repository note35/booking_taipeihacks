import configparser
from http.client import HTTPSConnection
from base64 import b64encode

def get_api_connector():
    config = configparser.ConfigParser()
    config.read('../secret.ini')

    c = HTTPSConnection("distribution-xml.booking.com")
    userAndPassString = config['default']['user'] + ":" + config['default']['password']
    userAndPass = b64encode(str.encode(userAndPassString)).decode("ascii")
    headers = { 'Authorization' : 'Basic %s' %  userAndPass }
    return c, headers
