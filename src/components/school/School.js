import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotFound from '../not-found';
import Department from '../department';
import Helmet from 'react-helmet';
import './School.css';

export default class School extends Component {
  /* School er result úr Heroku
     loading gefur tilkynna ef það er að sækja gögn á neti
     error gefur tilkynna ef það voru villur AÐ SÆKJA GÖGN
     notFound  gefur tilkynna ef Heroku skilar villu */
  state = {
    school:null,
    loading: true,
    error: false,
    notFound: false,
  };

  /* þetta keyrir þegar búið er að setja component upp í DOM
    reynum að sækja gögn úr heroku hans óla */
  async componentDidMount() {
    try {
      const unparsed = await this.fetchData(); // sækja gögn frá Heroku
      const legallink = await this.checkIfGoodData(unparsed);// ath ef gögnin voru fundin
      this.setState({ school:unparsed, loading: false, notFound:legallink });
    } catch (e) {
      /* ef það voru villur sem komu upp við gripum þær
         setjum error sem satt til að byrta þær og loading false */
      console.error('Error fetching data', e);
      this.setState({ error: true, loading: false });
    }
  }

  /* Notkun : checkIfGoodData(data)
     Fyrir  : data er json obj sem 'getur' haft Property error
     Eftir  : skilar satt ef data á Property error 
              annars ósatt */
  async checkIfGoodData(data) {
    if(data.hasOwnProperty('error')) {
      return true;
    }
    return false;
  }

  /* Notkun : fetchData()
     Fyrir  : ekkert
     Efitir : fer á Heroku slóðina hans óla og skilar 
              json obj sem Heroku skilar */
  async fetchData() {
    const { match } = this.props;
    const school = match.params.school; // sæki link sem var slegið
    const url = 'https://vefforritun2-2018-v4-synilausn.herokuapp.com/'+school;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  
  render() {
  // sækji state til að vinna með
  const {
    school,
    loading,
    error,
    notFound,
  } = this.state;
  // ef gögnin eru i hleðslu
  if (loading) {
    return (<div><span>hleð inn skólan...</span><Helmet title='hleð inn skólan...'></Helmet></div>);
  }
  // ef villa kom upp við að sækja gögn úr heroku   
  if (error){
    return (<div><span>villa við að hlaða skólan...</span><Helmet title='villa við að hlaða skólan'></Helmet></div>);
  }
  // ef gögnum var skilað en það var skilað notfound þá látum NotFound component sjá um þetta
  if (notFound){
      return (<NotFound />);
  }
  // gögnin eru hlöðuð og það eru eingar villur
  const heading = school.school.heading + '-Próftöflur'; // by til Title
  const departments = school.school.departments;

  return (<div>{JSON.stringify(school)}<Helmet title={heading}></Helmet></div>);
  }
  
}