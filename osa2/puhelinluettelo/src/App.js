import React, { useState } from 'react';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setnewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [searchTerm, setsearchTerm] = useState('');
  // const [searchResults, setSearchResults] = useState([]);

  const addNewPerson = e => {
    e.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber
    };

    let copyOfPersons = [...persons];

    let mapPersons = copyOfPersons.map(param => {
      return param.name;
    });

    console.log('heihei2', mapPersons);

    if (mapPersons.includes(personObject.name)) {
      alert(`${newName} is already added to phonebook`);

      return;
    }

    // console.log('persoonia', persons);

    // console.log('katotaas', personObject.name);

    // if (personObject.find(persons) === true) {
    //   alert('NOU!!');
    // }

    setPersons(persons.concat(personObject));

    setNewName('');

    setnewNumber('');

    // console.log('eeee', e.target);
  };

  const handleNameChange = e => {
    // console.log('targetti:', e.target);

    setNewName(e.target.value);

    // console.log('e', e);
  };

  const handleNumberChange = e => {
    // console.log('handleNumber', e.target.value);
    setnewNumber(e.target.value);
  };

  const handleNameFilter = e => {
    console.log('eeebb', e);

    console.log('eeeeaa', e.target.value);

    // let copyOfNameFilter = [...nameFilter];

    // if (copyOfNameFilter !== '') {
    //   setShowAll(false);
    // } else {
    //   setShowAll(!false);
    // }

    setsearchTerm(e.target.value);
  };

  // React.useEffect(() => {
  //   const results = persons.filter(person =>
  //     person.toLowerCase().includes(searchTerm)
  //   );
  //   setSearchResults(results);
  // }, [searchTerm]);

  const results = !searchTerm
    ? persons
    : persons.filter(param =>
        param.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with
        <input
          value={searchTerm}
          onChange={handleNameFilter}
          placeholder='Search'
        />
      </div>

      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>

        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {/* <div>debug: {newName}</div> */}
      <div>
        persons:{' '}
        {results.map(person => (
          <Persons names={person} key={person.name} />
        ))}
      </div>
      {/* <div>namee: {handleNameFilter}</div> */}
    </div>
  );
};

export default App;
