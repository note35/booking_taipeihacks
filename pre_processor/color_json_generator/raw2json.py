#http://www.discoveryplayground.com/computer-programming-for-kids/rgb-colors/

import json

PREFIX4 = "    "
PREFIX8 = "        "

# read and get raw colr data
raw_data = ""
with open("color.raw.data", "r") as color_in:
    raw_data = color_in.readlines()

with open("color.json", "w") as color_out:
    # write the beginning part into json file
    color_out.write("{\n")

    for key,item in enumerate(raw_data):
        # "\n" should be skipped
        item = item.replace("\n", "")

        if not item:
            # '    ],' at the end of each main color (excluding last line)
            content = PREFIX4 + '],\n'

        elif item[0] == "#":
            # '    "MAINCOLORNAME": [' while first character is #MAINCOLORNAME
            content = PREFIX4 + '"{}": [\n'.format(item[1:])

        else:
            # details of color
            (item_name, item_rgb, item_hex) = tuple(item.split())
            line = '{{"hex": "{}", "rgb": "{}", "name": "{}"}}'.format(item_hex, item_rgb, item_name)

            # ',\n' default posix of each color
            POSTFIX = ",\n"
            try:
                # '\n' for last color of each main color (excluding last line)
                if raw_data[key+1] == "\n":
                    POSTFIX = "\n"
            except IndexError:
                # '\n' for last color of last main color
                POSTFIX = "\n"

            content = PREFIX8 + line + POSTFIX

        # write content into json file
        color_out.write(content)
            
    # write the end part into json file
    color_out.write(PREFIX4+"]\n")
    color_out.write("}")
