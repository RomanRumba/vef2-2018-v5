import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Route, Link, Switch } from 'react-router-dom';

import './App.css';

import Home from './components/home';
import School from './components/school';
import Navigation from './components/navigation';
import NotFound from './components/not-found';

class App extends Component {
  render() {

    return (
      <main className="app">
         {/* Sækjum alltaf nav hvar sem við erum url er sloð á heroku hans óla til að sækja gögn*/}
         <Navigation url="https://vefforritun2-2018-v4-synilausn.herokuapp.com/" />
          {/* Ekki eins og url það þarf að ákveða út frá slóðini hvað á að rendera */}
         <Switch>
           {/* Ef stödd á rótini nota Home Component */}
           <Route exact path="/" component={Home}/>
           <Route path="/:school" component={School}/>
           {/* Default hegðun ef eitthvað gerist ef það er óskilgreind */}
           <Route component={NotFound}/>
         </Switch>
      </main>
    );
  }
}

export default App;
