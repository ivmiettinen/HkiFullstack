import React, { useState } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setnewNumber] = useState('');
  const [searchTerm, setsearchTerm] = useState('');

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
