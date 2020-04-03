import React from 'react';

const CountryFilterItem = props => {
  console.log('props:', props);
  console.log('itemi:', props.weather.current);

  console.log('weather:', props.weather);

  return (
    <div>
      {props.weather.map(param => {
        return (
          <div key={param.weather_code}>
            <b>Temperature:</b>
            {param.temperature} celsius
            <br />
            <img src={param.weather_icons} alt='capital temperature'></img>
            <br />
            <b>Wind:</b> {param.wind_speed} mph direction {param.wind_dir}
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
