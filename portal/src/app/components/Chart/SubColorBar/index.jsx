import React, { Component } from 'react';
// const ReactHighcharts = require('react-highcharts'); 

// import css from './AppBar.css'

let config = {

    chart: {
        type: 'column',
        backgroundColor: '#EEEEEE',
    },

    title: {
        text: ''
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
    }],

    credits: false,
}

let myChart;

export default class SubColorBar extends Component {
   componentWillReceiveProps( nextProps ) {
    console.log('receive', nextProps.source)

    let series = [];

    for( var i = 0 ; i < nextProps.source['main_color'].length ; i++ ){
      const maincolor = nextProps.source['main_color'][i]['sub_color'].map((subColor) => {
        return {
              name: subColor.name,
              color: subColor.hex,
              stack: i + 1,
              data: [subColor['sub_color_orig']],
        }
      })

      series = [ ...series, ...maincolor ];
    }

    config.series = series;

    myChart = Highcharts.chart('subcolorbar', config)
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
