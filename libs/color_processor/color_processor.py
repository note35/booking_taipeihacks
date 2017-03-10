#http://blog.rainy.im/2015/11/25/extract-color-themes-from-images/
import struct
import scipy
import scipy.misc
import scipy.cluster
import binascii

from PIL import Image
from tqdm import tqdm

from rgb2color import rgb2color

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
    im = im.resize((150, 150)) # optional, to reduce time
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

#major_colors = get_major_colors("../../examples/input.jpg")
#print([rgb2color(color_pair) for color_pair in major_colors])
#render_example_png("../../examples/output.png", major_colors)
