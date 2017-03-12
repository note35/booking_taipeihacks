import React, { Component } from 'react';
import Slider from 'react-toolbox/lib/slider';
import Dropdown from 'react-toolbox/lib/dropdown';

// redux
import { connect } from 'react-redux';
import { setCompareFilter } from 'actions';

import css from './CompareFilter.css'

const scores = [
  { value: 'wonderful', label: 'Wonderful' },
  { value: 'very_good', label: 'Very Good'},
  { value: 'good', label: 'Good' },
  { value: 'pleasant', label: 'Pleasant'},
  { value: 'no_rating', label: 'No Rating'},
];

const cities = [
  { value: 'Taipei', label: 'Taipei' },
  { value: 'Amsterdam', label: 'Amsterdam'},
  { value: 'Wakayama', label: 'Wakayama'},
  { value: 'Tainan', label: 'Tainan'},
  { value: 'Hakodate', label: 'Hakodate'},
];

class CompareFilter extends Component {

  state = {
    cityA: 'Taipei',
    cityB: 'Amsterdam',
    valueA: 'wonderful',
    valueB: 'wonderful',
  };

  handleCityAChange = (value) => {
    this.props.setCompareFilter({ 
      cityA: value
    });
    this.setState({cityA: value});
  };

  handleCityBChange = (value) => {
    this.props.setCompareFilter({ cityB: value });
    this.setState({cityB: value});
  };

  handleValueAChange = (value) => {
    this.props.setCompareFilter({valueA: value});
    this.setState({valueA: value});
  };

  handleValueBChange = (value) => {
    this.props.setCompareFilter({valueB: value});
    this.setState({valueB: value});
  };

  render() {
    return (
      <div className={css.container}>
        <Dropdown
          className={css.dropdown}
          source={cities}
          onChange={this.handleCityAChange}
          value={this.state.cityA}
        />
        <Dropdown
        className={css.dropdown}
        source={scores}
        onChange={this.handleValueAChange}
        value={this.state.valueA}
        />
        <Dropdown
        className={css.dropdown}
        source={cities}
        onChange={this.handleCityBChange}
        value={this.state.cityB}
        />
        <Dropdown
        className={css.dropdown}
        source={scores}
        onChange={this.handleValueBChange}
        value={this.state.valueB}
        />
      </div>
    );
  }
}

function mapStateToProps( {CompareFilter} ) {
  return {
    CompareFilter,
  };
}

export default connect(
  mapStateToProps, {
    setCompareFilter,
  }
)(CompareFilter)
