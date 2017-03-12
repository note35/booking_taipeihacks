import React, { Component } from 'react';
import Link from 'react-router/lib/Link';

import css from './AppBar.css'

export default class AppBar extends Component {
  render() {
    return (
      <div className={css.AppBar}>
        <img className={css.logo} src="http://s-ec.bstatic.com/static/img/b26logo/booking_logo_retina/22615963add19ac6b6d715a97c8d477e8b95b7ea.png" alt="Booking.com：線上訂房專家"/>
        <div className={css.navi}>
          <Link to={'/app/report'}><span>Colors Report</span></Link>
          <Link to={'/app/photo'}><span>Photo Analytics</span></Link>
          <Link to={'/app/compare'}><span>Compare City</span></Link>
        </div>
      </div>
    );
  }
}
