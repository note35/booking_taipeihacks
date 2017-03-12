import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from 'components/Layout';

import css from './PhotoAnalytics.css';

const { Content, Header, Row } = Layout;

import PhotoView from 'containers/PhotoView';
import PhotoFilter from 'containers/PhotoFilter';

export default class PhotoAnalytics extends Component {

  render() {
    return (
      <Row>
        <div className={css.Map}>
          <PhotoView />
        </div>
        <div className={css.Table}>
          <PhotoFilter />
        </div>
      </Row>  
    );
  }
}