import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

import serviceClient from './services/noteServiceClient';
import noteServiceClient from './services/noteServiceClient';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setnewNumber] = useState('');
  const [searchTerm, setsearchTerm] = useState('');

  //Get data:

  useEffect(() => {
    serviceClient
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  const addNewPerson = (e) => {
    e.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    let copyOfPersons = [...persons];

    let mapPersons = copyOfPersons.map((param) => {
      return param.name;
    });

    if (
      mapPersons.includes(personObject.name) &&
      personObject.number.length === 0
    ) {
      alert(`${newName} is already added to phonebook`);

      return;
    }

    //Modify phone number of person in a list:

    if (
      mapPersons.includes(personObject.name) &&
      personObject.number.length > 0
    ) {
      if (
        window.confirm(`${newName} is already added to phonebook, replace the
    old number with a new one?`)
      ) {
        const mappia = persons.find(({ name }) => name === `${newName}`);

        const id = mappia.id;
        const update = persons.find((n) => n.id === id);
        const changedNum = { ...update, number: personObject.number };

        noteServiceClient
          .update(id, changedNum)
          .then((returnedPerson) => {
            setPersons(
              persons.map((per) => (per.id !== id ? per : returnedPerson))
            );
          })

          .catch((error) => {
            console.log('error on put:', error);
            setPersons(persons.filter((n) => n.id !== id));
          });
      }
    }

    //create person:
    else {
      noteServiceClient
        .create(personObject)
        .then((newObject) => {
          console.log('newObject post response:', newObject);
          setPersons(persons.concat(newObject));
        })
        .catch((error) => {
          console.log('post response error:', error);
        });
    }

    setNewName('');

    setnewNumber('');
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setnewNumber(e.target.value);
  };

  const handleNameFilter = (e) => {
    setsearchTerm(e.target.value);
  };

  const results = !searchTerm
    ? persons
    : persons.filter((param) =>
        param.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );

  const handleDelete = (e) => {
    const id = Number(e.target.value);

    let copyOfPersons = [...persons];

    let findId = { ...persons.find((param) => param.id === id) };

    if (window.confirm(`Delete ${findId.name} ?`)) {
      noteServiceClient
        .remove(id)
        .then(() => {
          const filterById = copyOfPersons.filter((param) => param.id !== id);

          setPersons(filterById);
        })
        .catch((error) => {
          console.log('delete error:', error);
        });
    }
  };

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

      <Persons results={results} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
