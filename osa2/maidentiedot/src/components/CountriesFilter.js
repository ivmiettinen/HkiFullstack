import React from 'react';
import CountryFilter from './CountryFilter';

const CountriesFilter = props => {
  // console.log('Kaikki propsit:', props);
  // console.log('buttoniko:', props.buttoni);
  //   console.log('propseja:', props);
  //   console.log('length:', props.countries.name.length);
  //   console.log('propseja:', props.countries);
  //   console.log('propseja2:', props.results);
  //   console.log('propseja3:', props.countries.results);

  //   console.log('asd:', props.countries.name.length);

  //Näin muuntuisi Array:

  //   const heihei = props.countries.name;

  //   console.log('heihei:', heihei);

  //   let asd = [];

  //   for (const property in heihei) {
  //     console.log('TÄSSÄ:', property, heihei);
  //     asd.push(heihei);
  //   }
  //   console.log('asdARRAY:', asd);

  return (
    <p>
      {props.countries.name}
      <button onClick={props.handleClick} value={props.countries.name}>
        Klikkaa
      </button>
    </p>
  );
};

export default CountriesFilter;

// {
//   results.map(countries => (
//     <CountryFilter countries={countries} key={countries.numericCode} />
//   ));
// }
