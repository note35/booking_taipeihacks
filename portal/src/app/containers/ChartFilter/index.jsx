import React, { Component } from 'react';
import Slider from 'react-toolbox/lib/slider';
import Dropdown from 'react-toolbox/lib/dropdown';

// redux
import { connect } from 'react-redux';
import { setChartFilter } from 'actions';

import css from './ChartFilter.css'

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

class ChartFilter extends Component {

  state = {
    value: 'wonderful',
    city: 'Taipei',
  };

  handleDropDownChange = (value) => {
    this.props.setChartFilter({ score: value, city: this.state.city });
    this.setState({value: value});
  };

  handleCityChange = (city) => {
    this.props.setChartFilter({ score: this.state.value, city: city });
    this.setState({city: city});
  };

  handleChange = (slider, value) => {
    const newState = {};
    newState[slider] = value;
    this.setState(newState);
  };

  renderImages = () => {
    const ChartFilter = this.props.ChartFilter;
    const images = this.props.ChartData[ChartFilter.city][ChartFilter.score]['img_urls'];

    const components = images.map((img) => {
      return (
        <img className={css.img} src={img.url} />
      )
    })

    return components;
  }

  render() {
    return (
      <div className={css.container}>
        <Dropdown
          className={css.dropdown}
          source={cities}
          onChange={this.handleCityChange}
          value={this.state.city}
        />
        <Dropdown
        className={css.dropdown}
        source={scores}
        onChange={this.handleDropDownChange}
        value={this.state.value}
        />
        <div>
          {this.renderImages()}
        </div>
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
