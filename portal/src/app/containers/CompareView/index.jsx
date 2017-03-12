import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { setCompareFilter } from 'actions';

import MainColorPie from 'components/Chart/MainColorPie';
import SubColorBar from 'components/Chart/SubColorBar';

import css from './CompareView.css'

class CompareView extends Component {

  state = {};
  
  render() {
    // const { CompareFilter, ChartData } = this.props; 
    // let source = [];
    // if(ChartData[CompareFilter.city])
    //   source = ChartData[CompareFilter.city][CompareFilter.score]

    const { CompareFilter, ChartData } = this.props; 
    let sourceA = [];
    let sourceB = [];
    
    sourceA = ChartData[CompareFilter.cityA][CompareFilter.valueA];
    sourceB = ChartData[CompareFilter.cityB][CompareFilter.valueB];

    const title = `${CompareFilter.cityA} And ${CompareFilter.cityB}`

    return (
      <div className={css.container}>
        <h1 className={css.title}>{title}</h1>
        <div className={css.chartContainer}>
          <MainColorPie source={sourceA} width={400} id={'compareA'} size={200} innerSize={100} />
          <MainColorPie source={sourceB} width={400} id={'compareB'} size={200} innerSize={100} />
        </div>
      </div>
    );
  }
}

function mapStateToProps( {CompareFilter, ChartData} ) {
  return {
    CompareFilter,
    ChartData,
  };
}

export default connect(
  mapStateToProps, {
    setCompareFilter,
  }
)(CompareView)
