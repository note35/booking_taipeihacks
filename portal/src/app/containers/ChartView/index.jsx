import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { setChartFilter } from 'actions';

import MainColorPie from 'components/Chart/MainColorPie';
import SubColorBar from 'components/Chart/SubColorBar';

import css from './ChartView.css'

class ChartFilter extends Component {

  state = {};

  render() {
    console.log(this.props)
    const { ChartFilter, ChartData } = this.props; 
    let source = [];
    if(ChartData[ChartFilter.city])
      source = ChartData[ChartFilter.city][ChartFilter.score]

    console.log(source);

    return (
      <div className={css.container}>
      
        <h1 className={css.title}>Color Analytics</h1>
        <MainColorPie source={source} />
        <h1 className={css.title}>SubColor Analytics</h1>
        <SubColorBar source={source} />
      </div>
    );
  }
}

function mapStateToProps( {ChartFilter, ChartData} ) {
  return {
    ChartFilter,
    ChartData,
  };
}

export default connect(
  mapStateToProps, {
    setChartFilter,
  }
)(ChartFilter)
