import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Navigation.css';


export default class Navigation extends Component {

  /* Getum ekki endurnýtt hluti her þannig það sem við notum
     verðum að setja það i state 
     Schools er result set úr Heroku
     loading gefur tilkynna ef gögnin eru hlöðuð eða ekki
     error gefur tilkynna ef það kom upp villa */
  state = {
    schools:null,
    loading: true,
    error: false,
  };

  /* þetta keyrir þegar búið er að setja component upp í DOM
     reynum að sækja gögn úr heroku hans óla */
  async componentDidMount() {
    try {
      /* reynt að sækja gögn úr heroku hans óla ef það tekst
          þá vistum það og setjum loading á false */
      const unparsed = await this.fetchData();
      const schools =  await this.parseNav(unparsed);
      this.setState({ schools, loading: false });
    } catch (e) {
      /* ef það voru villur sem komu upp við gripum þær
         setjum error sem satt til að byrta þær og loading false */
      console.error('Error fetching data', e);
      this.setState({ error: true, loading: false });
    }
  }
  /* Notkun : parseNav(data)
     Fyrir  : data er jsbon obj sem hefur schools af tagi fylki sem stack
     Eftir  : byr til fylki af json obj þar sem hvert json obj er með schoolName og schoolLink */
  // ég veit ekki afhverju þetta er async ef ég hef prófað allt en react kvartar nema ef þetta er async
  async parseNav(data) {
    const schools = data.schools;
    const navElms = [];
    schools.forEach(school => {
       const schoolInfo = {
          schoolName: school.name,
          schoolLink: school.link,
       };
       navElms.push(schoolInfo);
    });
    return navElms;
  }
  
  /* Notkun : this.fetchData()
     Fyrir  : ekkert
     Eftir  : fer á Url sem er beðið og skilað gögnum
              frá Urli i json formmati */
  async fetchData() {
    const { url } = this.props; // sótt Url sem er gefið á App.js
    const response = await fetch(url); // beðið eftir gögnum
    const data = await response.json(); // ná i gögn
    return data; // skilað gögn
  }

  /* Notað til að rendara hluta af siðuni */
  render() {
    // sótt gögn úr statr
    const {
      schools,
      loading,
      error,
    } = this.state;
    // ef gögnin eru að hlaðast þá birtum skilaboð
    if (loading) {
      return (<div>Hleð inn sviðum...</div>);
    }
    // ef það kom villa þá skilum villu
    if (error) {
      return (<div>Villa við að sækja svið</div>);
    }
    // ef gögnin eru hlöðuð og það er eingin villa þá er hægt að byrta gögnin
    // Búum til alla Elementa fyrir Navigation
    const schoolsRes = schools.map((school) => 
      <li><Link to={school.schoolLink}>{school.schoolName}</Link></li>
    )
    // skilun þá navbar
    return (<nav>{schoolsRes}</nav>);
  }
}

