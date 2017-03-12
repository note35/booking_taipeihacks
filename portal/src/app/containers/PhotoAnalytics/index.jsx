import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from 'components/Layout';

import css from './PhotoAnalytics.css';

const { Content, Header, Row } = Layout;

export default class PhotoAnalytics extends Component {

  render() {
    return (
      <Row>
        <div className={css.Map}>
          photoview
        </div>
        <div className={css.Table}>
          photofilter
        </div>
      </Row>  
    );
  }
}