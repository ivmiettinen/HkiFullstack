// const mongoose = require('mongoose')

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

// const namee = process.argv[3]

// const phoneNumber = process.argv[4]


// // console.log('namee', namee)

// // console.log('process.ARGVJDLJ', process.argv)

// // console.log('process.ARGVJDLJLENGTHHHHH', process.argv.length)



// // console.log('ONKOKOKO', process.argv[2] === password)




// // // print process.argv
// // process.argv.forEach((val, index) => {
// //   console.log(`AAAAAAAAAAAAAAAAA, ${index}: ${val}`);
// // });



// const url =
// `mongodb+srv://ilkka123:${password}@contactkeeper-2yisg.mongodb.net/note-app?retryWrites=true&w=majority`



// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


// //1
// const noteSchema = new mongoose.Schema({
//   name: String,
//   number: Number,

// })

// //2

// const Note = mongoose.model('Note', noteSchema)

// //3
// const note = new Note({
//   name: namee,
//   number: phoneNumber

// })

// // const note = new Note({
// //   content: 'HTML is Easy!',
// //   date: new Date(),
// //   important: true,
// // })


// if (process.argv[2] === password && process.argv.length === 3){

//   note.save().then(response => {
  
//   Note.find({}).then(result => {
//       result.forEach(note => {
//           console.log('Phonebook:', note.name, note.number)
//       })
  
//     mongoose.connection.close()
//   })
//   })
//   }

// else if(process.argv[3] === namee && process.argv[4] === phoneNumber && process.argv.length === 5){
// note.save().then(response => {
    
//     console.log(`added ${namee} number ${phoneNumber} to phonebook`  )
//     mongoose.connection.close()
//   })
// }

// //HOIDELLAAN: 
// else{
//   process.exit(1)
//   mongoose.connection.close()
// }

// //

// // Note.find({name: "ivm" }).then(result => {
// //     result.forEach(note => {
// //         console.log('Phonebook:', note)
// //     })

// //   mongoose.connection.close()
// // })
// // })


// // note.save().then(response => {
    
// //     console.log('note saved!')
// //     mongoose.connection.close()
// //   })