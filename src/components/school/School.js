import React, { Component } from 'react';
import NotFound from '../not-found';
import Department from '../department';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import './School.css';

export default class School extends Component {
  /* School er result úr Heroku
     loading gefur tilkynna ef það er að sækja gögn á neti
     error gefur tilkynna ef það voru villur AÐ SÆKJA GÖGN
     notFound  gefur tilkynna ef Heroku skilar villu */
  state = {
    school: null,
    loading: true,
    error: false,
    notFound: false,
    activeDeparment: null,
  };

  /* þetta keyrir þegar búið er að setja component upp í DOM
    reynum að sækja gögn úr heroku hans óla */
  async componentDidMount() {
    return await this.getNewState();
  }

  /* is invoked immediately after updating occurs
    here we get the opportunity to operate on the DOM when the component has been updated.
    This is also a good place to do network requests as long as you compare the current props to previous props */
  async componentDidUpdate(NextProps){
    if(this.props.location.pathname !== NextProps.location.pathname) {
      await this.getNewState();
    }
    return false;
  }

   /* Notkun : this.getNewState()
     Fyrir  : ekkert 
     Eftir  : sækir gögn af heroku hans óla og uppfærir state
              Eftir þvi sem heroku skilaði */
  async getNewState() {
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
    console.log("heroku props"+this.props);
    const school = match.params.school; // sæki link sem var slegið
    const url = `${process.env.REACT_APP_SERVICE_URL}${school}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  /* Notkun : this.activeClick(department)
     Fyrir  : linkId er heiltölu bendill >= 0
     Eftir  : uppfærir activeDeparment breytuna i state 
              með department og ef þetta er núþegar sama department
              þá er nullstilt activeDeparment */
  activeClick = (department) => {
    return (e) => {
      if(department === this.state.activeDeparment ){
        this.setState({ activeDeparment: null });
      } else {
        this.setState({ activeDeparment: department });
      }
    }
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

  return (<div className='department__wrapper'>
            <h2>{school.school.heading}</h2>
              {departments.map((department, index) => (
                <Department
                  key={index}
                  heading={department.heading}
                  tests={department.tests}
                  visible={this.state.activeDeparment === index}
                  activeClick={this.activeClick(index)}
                />
            ))}
            {/* Mjög stupid <Link> má ekki hafa einhverskonar padding og læti
              þannig það þarf að wrappa það i div og gefa þvi clasa */}
            <div className='department__wrapper_home'><Link to='/'>Heim</Link></div>
            <Helmet title={heading}></Helmet>
          </div>);
  }
  
}