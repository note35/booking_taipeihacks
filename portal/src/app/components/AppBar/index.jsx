import React, { Component } from 'react';

import css from './AppBar.css'

export default class AppBar extends Component {
  render() {
    return (
      <div><a href="/app/report">report</a><a href="/app/photo">photo</a></div>
    );
  }
}
