import React, { Component } from 'react';
// const ReactHighcharts = require('react-highcharts'); 

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

let myChart;

export default class SubColorBar extends Component {
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
    // config.colors[0] = nextProps.source['main_color'][0];
    // config.colors[1] = nextProps.source['main_color'][1];
    // config.colors[2] = nextProps.source['main_color'][2];

    // myChart = Highcharts.chart('subcolorbar', config)
  }

  componentDidMount() {
    myChart = Highcharts.chart('subcolorbar', config)
  }

  render() {
    return (
      <div id="subcolorbar"></div>
    );
  }
}