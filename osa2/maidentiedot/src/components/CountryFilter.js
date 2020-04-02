import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const CountryFilter = props => {
  console.log('propseja:', props);

  console.log('propseja3:', props.countries.capital);

  // console.log('CountryFilter:', props);
  // console.log(
  //   'languages:',
  //   props.countries.languages.map(param => {
  //     return param.name;
  //   })
  // );

  ///////////////////////////

  return (
    <div>
      <h3>{props.countries.name}</h3>
      <p>Capital: {props.countries.capital}</p>
      <p>Population: {props.countries.population}</p>

      <h4>Languages:</h4>

      {props.countries.languages.map(param => {
        return <li key={param.iso639_1}>{param.name}</li>;
      })}

      <img
        className='flagPicture'
        src={props.countries.flag}
        alt='Country flag'
      ></img>

      <h4>Weather in {props.countries.capital}</h4>
      <b>Temperature:</b>
      <p></p>
      <b>Wind:</b>
      <p></p>
      <br />
    </div>
  );
};

export default CountryFilter;

// {props.countries.languages.map(param => {
//   return <li >{param.name}</li>;
// })}
