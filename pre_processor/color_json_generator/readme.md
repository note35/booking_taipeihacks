# How to generate a new color.json?

    # Generate a new json
    $ python raw2json.py

    # Check result
    $ ls
    color.json     color.raw.data raw2json.py    readme.md

    # Move to color_processor
    $ mv color.json ../../libs/color_processor
    
# How to define a new color information?

1. Main Color: #maincolorname

    (eg. #Whites/Pastels)
    You must use # at the beginning of the line 

2. Sub Color: subcolorname r-g-b hex 

    (eg. Snow 255-250-250 fffafa)
    Please check that there is no space after <hex>
    
3. Each Main Color must have at least one Sub Color

4. Put a newline between each Main Color.

