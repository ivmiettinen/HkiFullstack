const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)



// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

const password = process.argv[2]

// const namee = process.argv[3]

// const phoneNumber = process.argv[4]

const url = `mongodb+srv://ilkka123:${password}@contactkeeper-2yisg.mongodb.net/note-app?retryWrites=true&w=majority`

console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


//Esimerkki:

  // const noteSchema = new mongoose.Schema({
  //   content: {
  //     type: String,
  //     minlength: 5,
  //     required: true
  //   },
  //   date: { 
  //     type: Date,
  //     required: true
  //   },
  //   important: Boolean
  // })
  

const noteSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true
  },
  number: { 
    type: String,
    required: true
  }
  // ,
  // important: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', noteSchema)