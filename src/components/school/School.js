import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './School.css';

/**
 * Í þessum component ætti að vera mest um að vera og séð um að:
 * - Sækja gögn fyrir svið og birta
 * - Opna/loka deildum
 */

export default class School extends Component {

  //
  state = {
    school:null,
    loading: true,
    error: false,
  };

  // fáum route props frá <Route>
  const { match } = this.props;
  const school = match.params.school;
}