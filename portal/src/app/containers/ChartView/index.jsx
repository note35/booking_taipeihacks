import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { setChartFilter } from 'actions';

import MainColorPie from 'components/Chart/MainColorPie';
import SubColorBar from 'components/Chart/SubColorBar';

import css from './ChartView.css'

class ChartView extends Component {

  state = {};

  render() {
    console.log('carview', this.props)
    const { ChartFilter, ChartData } = this.props; 
    let source = [];
    if(ChartData[ChartFilter.city])
      source = ChartData[ChartFilter.city][ChartFilter.score]

    const title = `${ChartFilter.city} Analytics`

    return (
      <div className={css.container}>
      
        <h1 className={css.title}>{title}</h1>
        <MainColorPie title={ChartFilter.city} id={'color'} source={source} size={350} innerSize={200} />
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
)(ChartView)
