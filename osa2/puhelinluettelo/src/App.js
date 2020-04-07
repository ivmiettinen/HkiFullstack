import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import axios from 'axios';
import serviceClient from './services/noteServiceClient';
import noteServiceClient from './services/noteServiceClient';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setnewNumber] = useState('');
  const [searchTerm, setsearchTerm] = useState('');

  //Get data:

  // useEffect(() => {
  //   noteService.getAll().then((initialNotes) => {
  //     setNotes(initialNotes);
  //   });
  // }, []);

  //
  // useEffect(() => {
  //   console.log('effect');
  //   axios.get('http://localhost:3001/persons').then((response) => {
  //     console.log('promise fulfilled');
  //     setPersons(response.data);
  //   });
  // }, []);

  useEffect(() => {
    serviceClient
      .getAll()
      .then((initialPersons) => {
        console.log('initialPersons:', initialPersons);
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  //   axios.get('http://localhost:3001/persons').then((response) => {
  //     console.log('promise fulfilled');
  //     setPersons(response.data);
  //   });
  // }, []);

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

  const addNewPerson = (e) => {
    e.preventDefault();

    console.log('eeeee', e);

    const personObject = {
      name: newName,
      number: newNumber,
    };

    let copyOfPersons = [...persons];

    let mapPersons = copyOfPersons.map((param) => {
      return param.name;
    });

    // let mapNumber = copyOfPersons.map((param) => {
    //   console.log('numberi:', param.number);
    //   return Number(param.number);
    // });

    if (
      mapPersons.includes(personObject.name) &&
      personObject.number.length === 0
    ) {
      alert(`${newName} is already added to phonebook`);

      return;
    }

    console.log('typeOf:', typeof personObject.number);

    if (
      mapPersons.includes(personObject.name) &&
      personObject.number.length > 0
    ) {
      if (
        window.confirm(`${newName} is already added to phonebook, replace the
    old number with a new one?`)
      ) {
        const mappia = persons.find(({ name }) => name === `${newName}`);

        console.log('ASD:', mappia.id);

        const id = mappia.id;
        const update = persons.find((n) => n.id === id);
        const changedNum = { ...persons, number: personObject.number };

        console.log('update:', update);

        noteServiceClient
          .update(id, changedNum)
          .then((returnedPerson) => {
            setPersons(
              persons.map((per) => (per.id !== id ? persons : returnedPerson))
            );
          })

          .catch((error) => {
            console.log('error on put:', error);
            setPersons(persons.filter((n) => n.id !== id));
          });
      }
    }

    // if (window.confirm(`Delete ${findId.name} ?`)) {
    // if (window.confirm(`Delete ${findId.name} ?`))

    //create:
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
      //posti:
      // axios
      //   .post('http://localhost:3001/persons', personObject)
      //   .then((response) => {
      //     console.log('post response:', response.data);
      //     setPersons(persons.concat(personObject));
      //   })
      //   .catch((error) => {
      //     console.log('error:', error);
      //   });
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

    console.log('id:', id);

    // const poisto = persons.filter((param) => {
    //   return param.id !== id;
    // });

    let copyOfPersons = [...persons];

    console.log('taulukko', copyOfPersons);

    let findId = { ...persons.find((param) => param.id === id) };

    console.log('findi:', findId);

    if (window.confirm(`Delete ${findId.name} ?`)) {
      noteServiceClient
        .remove(id)
        .then(() => {
          const filterById = copyOfPersons.filter((param) => param.id !== id);

          console.log('Poisto', filterById);

          setPersons(filterById);
        })
        .catch((error) => {
          console.log('delete error:', error);
        });
    }
  };

  const buttoni = <button onClick={handleDelete}>Delete</button>;

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

      <Persons
        results={results}
        buttoni={buttoni}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
