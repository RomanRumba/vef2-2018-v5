import React, { Component } from 'react';
import Helmet from 'react-helmet';

import './Home.css';


export default class Home extends Component {
  /* Getum ekki endurnýtt hluti her þannig það sem við notum
     verðum að setja það i state.
     stats  : mun innihalda json obj
     loadig : gefur tilkynna ef gögnin er sótt
     error  : gefur tilkynna ef villa hefur komið upp   */
  state = {
    stats:null,
    loading: true,
    error: false,
  };

  /* þetta keyrir þegar búið er að setja component upp í DOM
     reynum að sækja stats úr heroku hans óla */
  async componentDidMount() {
    try {
      const stats = await this.fetchData(); // sækir json obj frá heroku
      this.setState({ stats, loading: false });
    } catch (e) {
      console.error('Error fetching data', e);
      this.setState({ error: true, loading: false });
    }
  }

  /* Notkun : this.fetchData()
     Fyrir  : ekkert
     Eftir  : sótt json obj sem á að innihalda stats sem er annar json obj
              og það er skilar stats json obj */
  async fetchData() {
    const url = 'https://vefforritun2-2018-v4-synilausn.herokuapp.com/stats';
    const response = await fetch(url);
    const data = await response.json();
    return data.stats;
  }

  /* Notað til að rendara hluta af siðuni */
  render() {
    // sótt gögn úr statr
    const {
      stats,
      loading,
      error,
    } = this.state;
    // ef gögnin eru að hlaðast þá birtum skilaboð
    if (loading) {
      return (<div><span>hleð inn gögnum...</span><Helmet title='hleð inn gögnum...'></Helmet></div>);
    }
    // ef það kom villa þá skilum villu
    if (error) {
      return (<div><span>Villa við að sækja gögn</span><Helmet title='Villa við að sækja gögn'></Helmet></div>);
    }
    // ef gögnin eru hlöðuð og það er eingin villa þá er hægt að byrta gögnin
    
    const statsRes =  (
      <div className='home_container__stats'>
        <div className='home_container__stats__el'><h3>Fjöldi prófa</h3>{stats.numTests}</div>
        <div className='home_container__stats__el'><h3>Fjöldi nemandi i öllum prófum</h3>{stats.numStudents}</div>
        <div className='home_container__stats__el'><h3>Meðalfjöldi nemanda i prófi</h3> {stats.averageStudents}</div>
        <div className='home_container__stats__el'><h3>Minnsti fjöldi nemanda i prófi</h3> {stats.min}</div>
        <div className='home_container__stats__el'><h3>Mesti fjöldi nemandi i prófi</h3> {stats.max}</div>
      </div>
    );
    // skilun þá navbar
    return (<div className='home_container'><h1>Tölfræði</h1>{statsRes}<Helmet title='Próftöflur'></Helmet></div>);
  }

}
