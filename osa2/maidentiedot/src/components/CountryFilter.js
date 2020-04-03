import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryFilterItem from './CountryFilterItem';
import '../App.css';

const CountryFilter = props => {
  const [weather, setWeather] = useState([]);

  console.log('propseja:', props);

  console.log('propseja3:', props.countries.capital);

  // console.log('CountryFilter:', props);
  // console.log(
  //   'languages:',
  //   props.countries.languages.map(param => {
  //     return param.name;
  //   })
  // );

  ///////////////////////////////////////////////

  // Fetch weather:

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;

    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${props.countries.capital}`
      )
      .then(response => {
        setWeather([response.data.current]);
        console.log('response.data.current', response.data.current);
      })
      .catch(error => {
        console.log(error);
      });
  }, [props.countries.capital]);

  console.log('SÄÄ', weather);

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

      {/* {weather.map(weather => (
        <CountryFilterItem weather={weather} key={weather.location} />
      ))} */}

      <h4>Weather in {props.countries.capital}</h4>
      <CountryFilterItem weather={weather} />
      <br />
    </div>
  );
};

export default CountryFilter;

// {props.countries.languages.map(param => {
//   return <li >{param.name}</li>;
// })}
