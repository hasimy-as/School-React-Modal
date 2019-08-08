import Moment from 'moment';
import React, { Component } from 'react';

class Header extends Component {
  render() {
    let indo = require('moment/locale/en-SG');

    Moment.updateLocale('id, indonesia');
    return (
      <div>
        <h3>Daily Activity Application</h3>
        <br />
        <p>
          {Moment().format('dddd, ')}
          {Moment().format('LL ')}
        </p>
      </div>
    );
  }
}

export default Header;
