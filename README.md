# Booking taipeihacks - City Color Analyzer

*Note: This project is a prototype.*

City Color Analyzer is a tool for showing the major colors of each main photo in hotels of different cities. While hosts of hotels got those information, they can provide booking.com better photos for better selling. On the other side, users can have better user experience while using search engine at booking.com.

## Introduction

This project contains two part

- Front-end: nodejs v7.7.2

- Back-end: python 3.5 (flask restful)

## Setup - Backend

0.(Option) Running python in virtualenv

    virtualenv -p /usr/local/bin/python3.5 venv
    . venv3.5/bin/activate

1.For initializing the project, you need to install all requirement first.

    pip install -r requirement.txt

2.After you installed those requirement, you can run the program by command below.

    python flaskr.py

3.Then, you can access the restful API.

    - Get evaluation statistics of given city: 

        http://127.0.0.1:5000/evaluation_statistics/<city>

    - Get views statistics of given city: 

        http://127.0.0.1:5000/views_statistics/<city>

    - Get all hotels in given city:

        http://127.0.0.1:5000/hotel_list/<city>

## Setup - Frontend

1.Please run backend engine first.

2.For initializing the project, you need to install all requirement first.

    cd portal
    npm install

3.After you installed those requirement, you can run the program by command below.

    npm run production

## Color Processor

In this project, there is a color processor for finding color in photos.

    libs/color_processor/color_processor.py

The method in this processor is kmeans, and the cluster of kmeans by default is 4.

    NUM_CLUSTERS = 4
