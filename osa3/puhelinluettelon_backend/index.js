
const express = require('express')

const app = express();


const cors = require('cors')

app.use(cors())


//App.use(express.json()) ja bodyParser.json ovat sama asia.

// const bodyParser = require('body-parser')

// app.use(bodyParser.json())

app.use(express.json());


const morgan = require('morgan');




// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));

// morgan.token('param', function (req,res,param) {
//     return req.params[param];
// });



morgan.token('post-testing', function(req, res) {return JSON.stringify(req.body)})



app.use(morgan(':method  :url :status :res[content-length] - :response-time ms :post-testing'))

// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
//   }



// app.use(requestLogger)




//



//Persons data:

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }]


    //GET PERSONS-ROUTE:

 

    app.get('/api/persons', (req, res) => {
      
        res.json(persons);
      });

      //GET INFO-ROUTE:

      app.get('/info', (req, res) => {

        
    // let sum = persons.reduce((a, b) => {
    //     return a + b;
    // })

    // console.log('sum:', sum)

    let peopleLenght = persons.length

    // console.log('lenght:', persons.length)

          res.send(`Phonebook has info for ${peopleLenght} people` +  `<br>`  + new Date())
      })


    //GET ONE PERSON-ROUTE

    app.get('/api/persons/:id', (req, res) => {
        const id = Number(req.params.id)
        console.log('Haettu id', id)

        // let findId = persons.find((param) => {
        //     return param.id === id;
        // })

        let findId = persons.find(person => person.id === id)

        console.log('findId', findId)

        if(findId){
        res.json(findId)}
        else{
            res.status(404).end();
        }
    })


    //DELETE PERSON-ROUTE:

    app.delete('/api/persons/:id', (req, res) => {
        const id = Number(req.params.id)
        console.log('deleteID:', id)

  persons = persons.filter((param) => {
            return param.id !== id
        })

        res.status(204).end();


    })

    //POST NEW PERSON-ROUTE:

    app.post('/api/persons', (req, res) => {
        const body = req.body;

        let findName = persons.find((param) => {
            return param.name === body.name
        })

        if(findName){
            return res.status(400).json({
                error: 'name must be unique'
            })
        }

        if(!body.name){
            return res.status(400).json({
                error: 'name missing'
            })
        }
        if(!body.number){
            return res.status(400).json({
                error: 'number missing'
            })
        }

        // console.log('MIAKMIA')
       

        const person = {
            name: body.name,
            number: body.number,
            id: Math.random()*1000
            
        }

        persons = persons.concat(person)

        res.json(persons);

    })


    const unknownEndpoint = (request, response) => {
        response.status(404).send({ error: 'unknown endpoint' })
      }
      
      app.use(unknownEndpoint)
    


    const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



 

// let urli = http://localhost:3001/api/persons