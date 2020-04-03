import React from 'react';

const CountryFilterItem = ({ weather }) => {
  //   console.log('itemi:', weather.current);

  //   console.log('weather:', weather);

  return (
    <div>
      {weather.map(current => {
        return (
          <div key={current.weather_code}>
            <b>Temperature:</b>
            {current.temperature} celsius
            <br />
            <img src={current.weather_icons} alt='capital temperature'></img>
            <br />
            <b>Wind:</b> {current.wind_speed} mph direction {current.wind_dir}
          </div>
        );
      })}
    </div>
  );
};

export default CountryFilterItem;

// {props.weather.current.map(param => {
//     return <li>{param.wind}</li>;
//   })}
