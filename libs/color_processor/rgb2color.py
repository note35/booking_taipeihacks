import json

color_table = json.load(open("color.json", "r"))

def get_main_color_name_list():
    """
    Return:
       list[str, ...], all main_colors
    """
    return list(color_table.keys())

def get_main_color_list(main_color):
    """
    Args:
        string, name of main_color
    Return:
        list[dict, ...], all sub_colors
    """
    return color_table[main_color]

def get_sub_color_name_pair_list(main_color=None):
    """
    Args:
        string, name of main_color
    Return:
        list[(main_color, sub_color),...)], all pair of sub/main color names
    """
    if main_color:
        main_color_list = get_main_color_list(main_color)
        return [(main_color, item["name"]) for item in main_color_list]
    else:    
        main_color_name_list = get_main_color_name_list()
        ret = []
        for main_color_name in main_color_name_list:
            main_color_list = get_main_color_list(main_color_name)
            ret.extend([(main_color_name, item["name"]) for item in main_color_list])
        return ret

def get_sub_color_info(main_color, sub_color):
    """
    Args:
        string, name of main_color
        string, name of color
    Return:
        dict, details of color
    Except:
        KeyError, sub_color is not exist in main_color
    """
    main_color_list = get_main_color_list(main_color)
    sub_color_infos = [color for color in main_color_list if color["name"] == sub_color]
    try:
        return sub_color_infos[0]
    except IndexError:
        raise("The sub_color is not found in main_color")

def rgb(json_rgb):
    """
    Args:
        string, (255-255-0)
    Return:
        tuple(R, G, B)
    """
    return tuple(json_rgb.split("-"))

def get_diff(rgb1, rgb2):
    """
    Args:
        tuple(R, G, B)
        tuple(R, G, B)
    Returns:
        int
    """
    return sum([(int(rgb1[color]) - int(rgb2[color]))**2 for color in range(0,3)])**(1/3)

def rgb2hex(tuple_rgb):
    """
    Args:
        tuple(R, G, B)
    Return:
        string, hex of color
    """
    tuple_rgb_new = (int(tuple_rgb[0]), int(tuple_rgb[1]), int(tuple_rgb[2]))
    return '#%02x%02x%02x' % tuple_rgb_new

def rgb2color(tuple_rgb):
    """
    Args:
        tuple(R, G, B)
    return:
        tuple(main_color, sub_color_name)
    """
    color_pairs = get_sub_color_name_pair_list()
    current_min = 65026
    return_color_pair = ("Whites/Pastels", "White")
    for color_pair in color_pairs:
        sub_color_rgb = rgb(get_sub_color_info(color_pair[0], color_pair[1])["rgb"])
        diff = get_diff(sub_color_rgb, tuple_rgb)
        if diff <= current_min: #Note: last win
             return_color_pair = color_pair
             current_min = diff
    return return_color_pair
