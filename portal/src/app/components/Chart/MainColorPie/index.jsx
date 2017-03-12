import React, { Component } from 'react';
// const ReactHighcharts = require('react-highcharts'); 

import css from './MainColorPie.css'

let config = {
   chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        backgroundColor: '#EEEEEE',
    },

    colors: [
            'blue', '#e6e6e6', '#b3b3b3', '#999999', '#808080', '#666666'
    ],
    title: {
        text: ''
    },
    tooltip: {
        pointFormat: 'Rate: <b>{point.percentage:.1f}%</b><br>Number: <b>{point.y}</b>'
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
        // size: 350,
        // innerSize: 200,
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

    const colors = nextProps.source['main_color'].map((color) => {
        return color.hex;
    })

    const data = nextProps.source['main_color'].map((color) => {
        let name = color.name;

        return { name: name, y: color.main_color_orig };
    })

    config.colors = colors;
    config.series[0].data = data;

    myChart = Highcharts.chart(this.props.id, config)
  }

  componentDidMount() {
    if(this.props.width)
      config.chart.width = this.props.width;
    
    config.series[0].size = this.props.size;
    config.series[0].innerSize = this.props.innerSize;
    // config.title = { text: this.props.title }

    myChart = Highcharts.chart(this.props.id, config)
  }

  render() {
    return (
      <div className={css.chart} id={this.props.id}></div>
    );
  }
}
