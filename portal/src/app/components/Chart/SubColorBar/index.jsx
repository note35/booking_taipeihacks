import React, { Component } from 'react';
const ReactHighcharts = require('react-highcharts'); 

// import css from './AppBar.css'

let config = {

    chart: {
        type: 'column'
    },

    title: {
        text: 'Total fruit consumtion, grouped by gender'
    },

    xAxis: {
        categories: ['Colors']
    },

    yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
            text: 'Number of fruits'
        }
    },

    tooltip: {
        formatter: function () {
            return '<b>' + this.x + '</b><br/>' +
                this.series.name + ': ' + this.y + '<br/>' +
                'Total: ' + this.point.stackTotal;
        }
    },

    plotOptions: {
        column: {
            stacking: 'normal'
        }
    },

    series: [{
        name: 'subBlue1',
        data: [5],
        stack: 'blue'
    }, {
        name: 'subBlue2',
        data: [3],
        stack: 'blue'
    }, {
        name: 'subred1',
        data: [2],
        stack: 'red'
    }, {
        name: 'subred2',
        data: [3],
        stack: 'red'
    }]
}

export default class SubColorBar extends Component {
  render() {
    return (
      <ReactHighcharts config = {config}></ReactHighcharts>
    );
  }
}
