import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setnewNumber] = useState('');
  const [searchTerm, setsearchTerm] = useState('');

  //Get data:

  useEffect(() => {
    console.log('effect');
    axios.get('http://localhost:3001/persons').then(response => {
      console.log('promise fulfilled');
      setPersons(response.data);
    });
  }, []);

  console.log('render', persons.length, 'persons');

  //Toinen tapa kirjoittaa:
  // const hook = () => {
  //   console.log('effect');
  //   axios.get('http://localhost:3001/notes').then(response => {
  //     console.log('promise fulfilled');
  //     setNotes(response.data);
  //   });
  // };

  // useEffect(hook, []);

  //

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

    if (mapPersons.includes(personObject.name)) {
      alert(`${newName} is already added to phonebook`);

      return;
    }

    setPersons(persons.concat(personObject));

    setNewName('');

    setnewNumber('');
  };

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumberChange = e => {
    setnewNumber(e.target.value);
  };

  const handleNameFilter = e => {
    setsearchTerm(e.target.value);
  };

  const results = !searchTerm
    ? persons
    : persons.filter(param =>
        param.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchTerm={searchTerm} handleNameFilter={handleNameFilter} />

      <h3>Add a new</h3>

      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons results={results} />
    </div>
  );
};

export default App;
