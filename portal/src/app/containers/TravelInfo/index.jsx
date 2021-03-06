import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from 'components/Layout';

import ChartView from 'containers/ChartView';
import ChartFilter from 'containers/ChartFilter';

import css from './TravelInfo.css';

const { Content, Header, Row } = Layout;

class TravelInfo extends Component {

  render() {
    return (
      <Row>
        <div className={css.Map}>
          <ChartView />
        </div>
        <div className={css.Table}>
          <ChartFilter />
        </div>
      </Row>  
    );
  }
}

function mapStateToProps({ taggedPlaces }) {
  return {
    taggedPlaces,
  };
}

export default connect(
  mapStateToProps,
)(TravelInfo);