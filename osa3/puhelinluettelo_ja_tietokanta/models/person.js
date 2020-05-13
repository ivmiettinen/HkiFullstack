const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)


const password = process.argv[2]



const url = `mongodb+srv://ilkka123:${password}@contactkeeper-2yisg.mongodb.net/note-app?retryWrites=true&w=majority`

console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })



  

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
 
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', noteSchema)