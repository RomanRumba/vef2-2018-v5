import React, { Component } from 'react';
import Helmet from 'react-helmet';
import './NotFound.css';
import { Link } from 'react-router-dom';

export default class Home extends Component {

  render() {
    return (
      <div className='notFounc_wrapper'>
        <Helmet title="Síða fannst ekki" />
        <h1>Ops ! siða fannst ekki </h1>
        <div>
          <Link to='/'>Heim</Link>
        </div>
      </div>
    );
  }
}
