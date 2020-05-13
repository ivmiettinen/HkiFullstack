import React from 'react';

const CountriesFilter = props => {
  // console.log('Kaikki propsit:', props);
  // console.log('buttoniko:', props.buttoni);

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