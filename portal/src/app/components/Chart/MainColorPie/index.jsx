import React, { Component } from 'react';
const ReactHighcharts = require('react-highcharts'); 

// import css from './AppBar.css'

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
        text: 'Browser market shares January, 2015 to May, 2015'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (ReactHighcharts.theme && ReactHighcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Microsoft Internet Explorer',
            y: 100.33
        }, {
            name: 'Chrome',
            y: 24.03,
            sliced: true,
            selected: true
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

export default class MainColorPie extends Component {
  componentWillReceiveProps( nextProps ){
    console.log('receive', nextProps.source)
    // let chart = this.refs.chart.getChart();
    // chart.series[0].addPoint({x: 10, y: 12});

    config.colors[0] = nextProps.source['main_color'][0];
  }

  render() {
    console.log(this.props)
    return (
      <ReactHighcharts config={config} ref="chart"></ReactHighcharts>
    );
  }
}
