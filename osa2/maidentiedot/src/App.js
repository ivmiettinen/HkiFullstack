import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountriesFilter from './components/CountriesFilter';
import CountryFilter from './components/CountryFilter';

import './App.css';

function App() {
  const [countries, setCountires] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowall] = useState(true);
  const [oneButtonCountry, setoneButtonCountry] = useState(['']);
  const [onlyOneCountry, setOnlyOneCountry] = useState([]);

  //Fetch countries:
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      // console.log('data:', response.data);

      setCountires(response.data);
    });
  }, []);

  const handleCountryFilter = e => {
    setSearchTerm(e.target.value);
  };

  const handleCountryFilter2 = e => {
    setSearchTerm(e.target.value);
    setShowall(!showAll);
    setoneButtonCountry([]);
    setOnlyOneCountry([]);
  };

  // >=
  const oneCountry = e => {
    // console.log('value:', e.target.value);

    setShowall(!showAll);

    //Old style function:

    // function findNation(nation) {
    //   return nation.name === e.target.value;
    // }

    // const userPickNation = results.find(findNation);

    //

    const userPickNation = results.find(({ name }) => name === e.target.value);

    //

    setOnlyOneCountry(onlyOneCountry.concat(userPickNation));

    // console.log('capital:', onlyOneCountry.capital);

    //
    setoneButtonCountry(oneButtonCountry.concat(e.target.value));
  };

  const results = !searchTerm
    ? countries
    : countries.filter(param =>
        param.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );

  // console.log('results:', results.length);

  let buttoni = (
    <button value={countries.name} onClick={oneCountry}>
      Show
    </button>
  );

  if (results.length > 10) {
    return (
      <div>
        Find countries:
        <input
          value={searchTerm}
          onChange={handleCountryFilter}
          placeholder='search countries'
        ></input>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }

  if (results.length <= 10 && results.length > 1) {
    return (
      <>
        {showAll === true ? (
          <div>
            Find countries:{' '}
            <input
              value={searchTerm}
              onChange={handleCountryFilter}
              placeholder='search countries'
            ></input>
            <div>
              {results.map(countries => (
                <CountriesFilter
                  buttoni={buttoni}
                  handleClick={oneCountry}
                  countries={countries}
                  key={countries.numericCode}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            Find countries:{' '}
            <input
              value={searchTerm}
              onChange={handleCountryFilter}
              placeholder='search countries'
            ></input>
            <div>
              {onlyOneCountry.map(countries => (
                <CountryFilter
                  countries={countries}
                  key={countries.numericCode}
                />
              ))}
            </div>
            <button onClick={handleCountryFilter2}>Go back</button>
          </div>
        )}
      </>
    );
  }

  if (results.length === 1) {
    return (
      <div>
        Find countries:{' '}
        <input
          value={searchTerm}
          onChange={handleCountryFilter}
          placeholder='search countries'
        ></input>
        <div>
          {results.map(countries => (
            <CountryFilter countries={countries} key={countries.numericCode} />
          ))}
        </div>
        <button onClick={handleCountryFilter2}>Go back</button>
      </div>
    );
  }

  return (
    <div>
      Find countries:{' '}
      <input
        value={searchTerm}
        onChange={handleCountryFilter}
        placeholder='search countries'
      ></input>
      <h3>Countries</h3>
      <div>
        {results.map(countries => (
          <CountriesFilter
            countries={countries}
            languages={countries.languages}
            key={countries.numericCode}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
