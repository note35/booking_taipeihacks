import React, { Component } from 'react';

import css from './AppBar.css'

export default class AppBar extends Component {
  render() {
    return (
      <div>
        <img className={css.logo} src="http://s-ec.bstatic.com/static/img/b26logo/booking_logo_retina/22615963add19ac6b6d715a97c8d477e8b95b7ea.png" alt="Booking.com：線上訂房專家"/>
        <a href="/app/report">report</a><a href="/app/photo">photo</a>
      </div>
    );
  }
}
