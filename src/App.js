import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Home from './components/home';
import School from './components/school';
import Navigation from './components/navigation';
import NotFound from './components/not-found';

class App extends Component {
  render() {
    return (
      <main className='app'>
        <h1 className='heading_center'> Próftöflur </h1>
        {/* Sækjum alltaf nav hvar sem við erum url er sloð á heroku hans óla til að sækja gögn*/}
        <Route component={Navigation} />
        {/* Ekki eins og url það þarf að ákveða út frá slóðini hvað á að rendera */}
        <Switch>
          {/* Ef stödd á rótini nota Home Component */}
          <Route exact path='/' component={Home}  />
          <Route path='/:school' component={School} />
          {/* Default hegðun ef eitthvað gerist ef það er óskilgreind */}
          <Route component={NotFound}/>
        </Switch>
      </main>
    );
  }
}

export default App;
