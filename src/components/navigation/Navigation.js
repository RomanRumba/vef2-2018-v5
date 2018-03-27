import React, { Component } from 'react';
import './Navigation.css';
import LiElement from './LiElement';

export default class Navigation extends Component {

  /* Getum ekki endurnýtt hluti her þannig það sem við notum
    verðum að setja það i state 
    Schools er result set úr Heroku
    loading gefur tilkynna ef gögnin eru hlöðuð eða ekki
    error gefur tilkynna ef það kom upp villa 
    activeLink gefur tilkynna á hvaða "undirsiðu" erum við á */
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
      const schools =  this.parseNav(unparsed);
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
  parseNav(data) {
    const schools = data.schools;
    const navElms = [];
    let i = 0;
    schools.forEach(school => {
       const schoolInfo = {
          schoolId: i++,
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
    const  url = process.env.REACT_APP_SERVICE_URL;
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
    /* Ef erum komin hér þá þyðir það eru engar villur þannig þá er hægt að 
       rendara NavBar svo það er hægt að setja focus á  */
    return (
      <nav>
          {schools.map((school) => (
            <LiElement
              key={school.schoolId} // unqic bendill á skólan
              name={school.schoolName} // nafn af skólanum
              link={school.schoolLink} // slóð á skólan
              // breytan sem segir hvort þessi componenti á að fá auka clasa clicked
              visible={this.props.location.pathname === school.schoolLink}
            />
          ))}
      </nav>);
  }
}

