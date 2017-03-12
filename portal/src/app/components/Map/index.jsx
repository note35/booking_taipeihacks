import React, { Component, PureComponent } from 'react';

import { 
  flow, 
  countBy as countBy_fp, 
  map as map_fp, 
  mapValues as mapValues_fp,
} from 'lodash/fp';

import countries from 'i18n-iso-countries';

import css from './Map'

console.log("Taiwan => " + countries.getAlpha3Code('United States of America', 'en'));

export default class Map extends PureComponent {

  componentDidMount() {
    this.map =  new Datamap({
      element: document.getElementById("map"),
      projection: 'mercator',
      fills: {
        defaultFill: "#CFD8DC",
        authorHasTraveledTo: "#8BC34A"
      },
      geographyConfig: {
        highlightOnHover: true,
        highlightFillColor: '#FFA726',
        highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
        highlightBorderWidth: 2,
        highlightBorderOpacity: 1
      },
      data: {
        // USA: { fillKey: "authorHasTraveledTo" },
        // JPN: { fillKey: "authorHasTraveledTo" },
        // ITA: { fillKey: "authorHasTraveledTo" },
        // CRI: { fillKey: "authorHasTraveledTo" },
        // KOR: { fillKey: "authorHasTraveledTo" },
        // DEU: { fillKey: "authorHasTraveledTo" },
      }
    });
  }

  updateMapColor = ( config ) => {

    if(!this.map) return;
    
    this.map.updateChoropleth(
      // {
      //   USA: colors(Math.random() * 10),
      //   RUS: colors(Math.random() * 100),
      //   AUS: { fillKey: 'authorHasTraveledTo' },
      //   BRA: colors(Math.random() * 50),
      //   CAN: colors(Math.random() * 50),
      //   ZAF: colors(Math.random() * 50),
      //   IND: colors(Math.random() * 50),
      // }

      config
    );
  }

  render() {
    const { source } = this.props;
  
    const places = flow(
      map_fp(
        (place) => {
          let Alpha3Code;

          // country name exception
          if(place.place.location.country === 'United States'){
            Alpha3Code = 'USA';
          }else{
            Alpha3Code = countries.getAlpha3Code(place.place.location.country, 'en');
          }
          return { country: Alpha3Code }; 
        }
      ),
      countBy_fp('country'),
      mapValues_fp(() => { return { fillKey: "authorHasTraveledTo" }}),
    )(source);

    this.updateMapColor( places );

    return (
      <div id={'map'} className={css.Map}></div>
    );
  }
}
