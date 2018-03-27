import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LiElement extends Component {

  render() {
    /* þegar það er ýtt á li elemnt þá er keyrt fall activeClick
       sem mun segja hvaða li element á að vera clicked
       svo er re-renderað og ef visible er satt þá þessi componenti
       fær clasan clicked */
    const isactive = this.props.visible ? 'clicked' : '';

    return (
      /* ClassName verður clicked eða  tómt 
         onClick kallar á fall i Navigation
         Link kemur i veg fyrir default hegðun á <a> elementum
         react þyðir Link i <a> og to i href */
      <li className={isactive} >
        <Link to={this.props.link}>
          {this.props.name}
        </Link>
      </li>
    )
  }
}