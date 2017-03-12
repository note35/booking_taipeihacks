import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from 'components/Layout';

import CompareFilter from 'containers/CompareFilter';
import CompareView from 'containers/CompareView';

import css from './CompareCity.css';

const { Content, Header, Row } = Layout;

class CompareCity extends Component {

  render() {
    return (
      <Row>
        <div className={css.Map}>
          <CompareView />
        </div>
        <div className={css.Table}>
          <CompareFilter />
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
)(CompareCity);