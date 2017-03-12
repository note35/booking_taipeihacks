import React, { Component } from 'react';
// const ReactHighcharts = require('react-highcharts'); 

import css from './MainColorPie.css'

let config = {
   chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },

    colors: [
            'yellow', '#e6e6e6', '#b3b3b3', '#999999', '#808080', '#666666'
    ],
    title: {
        text: ''
    },
    tooltip: {
        pointFormat: 'Rate: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            }
        }
    },
    series: [{
        name: 'colors',
        colorByPoint: true,
                size: 350,
                innerSize: 200,
        data: [{
            name: 'Microsoft Internet Explorer',
            y: 100.33
        }, {
            name: 'Chrome',
            y: 24.03,
            // sliced: true,
            // selected: true
        }, {
            name: 'Firefox',
            y: 10.38
        }, {
            name: 'Safari',
            y: 4.77
        }, {
            name: 'Opera',
            y: 0.91
        }, {
            name: 'Proprietary or Undetectable',
            y: 0.2
        }]
    }],

    credits: false
}
let myChart;

export default class MainColorPie extends Component {
  componentWillReceiveProps( nextProps ) {
    console.log('receive', nextProps.source)
    // let chart = this.refs.chart.getChart();
    // chart.series[0].addPoint({x: 10, y: 12});
    // myChart.update({ colors: [
    //         nextProps.source['main_color'][0], 
    //         nextProps.source['main_color'][1], 
    //         nextProps.source['main_color'][2], 
    //         '#999999', '#808080', '#666666'
    // ]}, true)

    const colors = nextProps.source['main_color'].map((color) => {
        return color.name;
    })

    const data = nextProps.source['main_color'].map((color) => {
        let name = color.name;

        if( name.slice(-1) === 's')
            name = name.slice(0, -1);

        name = 'orange';

        return { name: name, y: color.main_color_orig };
    })

    config.colors = colors;
    config.series[0].data = data;

    myChart = Highcharts.chart('maincolorpie', config)
  }

  componentDidMount() {
    myChart = Highcharts.chart('maincolorpie', config)
  }

  render() {
    return (
      <div className={css.chart} id="maincolorpie"></div>
    );
  }
}
