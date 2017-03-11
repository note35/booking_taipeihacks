#http://blog.rainy.im/2015/11/25/extract-color-themes-from-images/
import json
import struct
import scipy
import scipy.misc
import scipy.cluster
import binascii

from os import listdir
from os.path import isfile, join
from PIL import Image
from tqdm import tqdm

from rgb2color import rgb2color, rgb, rgb2hex

NUM_CLUSTERS = 4
WIDTH=128
HEIGHT=128

def get_major_colors(inputfile):
    """
    Args:
        string, input filename
    Return:
        list[tuple,...], major tuple_rgb colors
    """
    im = Image.open(inputfile)
    ar = scipy.misc.fromimage(im)
    shape = ar.shape
    ar = ar.reshape(scipy.product(shape[:2]), shape[2])
    codes, dist = scipy.cluster.vq.kmeans(ar.astype(float), NUM_CLUSTERS)

    return [(int(round(code[0])), int(round(code[1])), int(round(code[2]))) for code in codes]

def render_example_png(outputfile, major_colors):
    """
    Args:
        string, output filename
    """
    HEIGHT_BLOCK = int(HEIGHT/NUM_CLUSTERS)
    img = Image.new('RGB', (WIDTH, HEIGHT))
    pixs = img.load()
    line = 0
    for idx in range(0, NUM_CLUSTERS):
        for cord_x in range(0, WIDTH):
            for cord_y in range(line, line+HEIGHT_BLOCK):
                pixs[cord_x, cord_y] = major_colors[idx]
        line = line+HEIGHT_BLOCK
    img.save(outputfile, "png")

def load_file_name_list(folder):
    return [filename for filename in listdir(folder) if isfile(join(folder, filename))]

def write2file(outputfile, content):
    with open(outputfile, "w") as fptr:
        fptr.write(content)

def calc_color_to_dict(folder):
    """
    Args:
        string, folder name (which contains all photos of one region)
    Return:
        dict of dict
            {
                dict["hotel_id"]{
                    "main_color": "some_color,some_color",
                    "sub_color": "some_color,some_color",
                    "hex": "some_color,some_color"
                }, ...
            }
    """
    filename_list = load_file_name_list(folder)
    dic = {}
    for filename in tqdm(filename_list):
        filename_noext = filename.split(".")[0]

        print('processing: {}'.format(filename))
        try:
            colors = get_major_colors(folder+"/"+filename)
            color_names = [rgb2color(color) for color in colors]
            hex_colors = [rgb2hex(color) for color in colors]
            dic[filename_noext] = {
                "main_color": ''.join([color_name[0]+',' for color_name in color_names])[:-1],
                "sub_color": ''.join([color_name[1]+',' for color_name in color_names])[:-1],
                "hex": ''.join(hex_color+',' for hex_color in hex_colors)
            }
        except:
            print("skipping: {}".format(filename))
    return dic

#major_colors = get_major_colors("../../examples/input.jpg")
#print([rgb2color(color_pair) for color_pair in major_colors])
#render_example_png("../../examples/output.png", major_colors)
