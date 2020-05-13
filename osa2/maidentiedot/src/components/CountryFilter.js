import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryFilterItem from './CountryFilterItem';
import '../App.css';

const CountryFilter = ({ countries }) => {
  const [weather, setWeather] = useState([]);

  console.log('propseja:', countries);

  console.log('propseja3:', countries.capital);

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

    http://192.168.2.2/



    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${countries.capital}`
      )
      .then(response => {
        setWeather([response.data.current]);
        console.log('response.data.current', response.data.current);
      })
      .catch(error => {
        console.log(error);
      });
  }, [countries.capital]);

  console.log('SÄÄ', weather);

  ///////////////////////////

  return (
    <div>
      <h3>{countries.name}</h3>
      <p>Capital: {countries.capital}</p>
      <p>Population: {countries.population}</p>

      <h4>Languages:</h4>

      {countries.languages.map(param => {
        return <li key={param.iso639_1}>{param.name}</li>;
      })}

      <img
        className='flagPicture'
        src={countries.flag}
        alt='Country flag'
      ></img>

      {/* {weather.map(weather => (
        <CountryFilterItem weather={weather} key={weather.location} />
      ))} */}

      <h4>Weather in {countries.capital}</h4>
      <CountryFilterItem weather={weather} />
      <br />
    </div>
  );
};

export default CountryFilter;

// {props.countries.languages.map(param => {
//   return <li >{param.name}</li>;
// })}