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

    const source = ChartData[ChartFilter.score]

    return (
      <div className={css.container}>
        <MainColorPie source={source}/>
        <SubColorBar />
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
