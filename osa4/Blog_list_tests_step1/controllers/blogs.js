const notesRouter = require('express').Router()

const Blog = require('../models/blog')

notesRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        if (blogs) {
            response.json(blogs.map((allBlogs) => allBlogs.toJSON()))
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        next(exception)
    }
})

// notesRouter.get('/', (request, response) => {
//     Blog
//         .find({})
//         .then(blogs => {
//             response.json(blogs.map(blog => blog.toJSON()))
//         })
// })

notesRouter.get('/:id', async (request, response, next) => {
    try {
        const blogs = await Blog.findById(request.params.id)

        if (blogs) {
            response.json(blogs.toJSON())
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        next(exception)
    }
})
// notesRouter.get('/:id', (request, response, next) => {
//     Blog.findById(request.params.id)
//         .then((note) => {
//             if (note) {
//                 response.json(note.toJSON())
//             } else {
//                 response.status(404).end()
//             }
//         })
//         .catch((error) => next(error))
// })

notesRouter.post('/', async (request, response, next) => {
    const body = request.body

    const note = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
    })
    try {
        if (body.title !== undefined && body.url !== undefined) {
            console.log('tältä näyttää onnistuminen, ', note)
            const savedNote = await note.save()
            response.json(savedNote.toJSON())
        } else {
            console.log('title ja/tai url puuttuvat ', note)
            response.status(400).send('Bad request')
        }
    } catch (exception) {
        next(exception)
    }
})
// notesRouter.post('/', (request, response, next) => {
//     const body = request.body

//     const note = new Blog({
//         title: body.title,
//         author: body.author,
//         url: body.url,
//         likes: body.likes
//     })

//     note.save()
//         .then(savedBlog => {
//             response.json(savedBlog.toJSON())
//         })
//         .catch(error => next(error))
// })

notesRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

// notesRouter.delete('/:id', (request, response, next) => {
//     Blog.findByIdAndRemove(request.params.id)
//         .then(() => {
//             response.status(204).end()
//         })
//         .catch((error) => next(error))
// })

notesRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const note = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    try {
        const blogs = await Blog.findByIdAndUpdate(request.params.id, note, {
            new: true,
        })

        response.json(blogs.toJSON())
    } catch (exception) {
        console.log('exception', exception)
        next(exception)
    }
})

//     Blog.findByIdAndUpdate(request.params.id, note, { new: true })
//         .then((updatedNote) => {
//             console.log('updatedNote', updatedNote)
//             response.json(updatedNote.toJSON())
//         })
//         .catch((error) => next(error))
// })
//
// notesRouter.get('/', async (request, response, next) => {
//     try {
//         const blogs = await Blog.find({})
//         if (blogs) {
//             response.json(blogs.map((allBlogs) => allBlogs.toJSON()))
//         } else {
//             response.status(404).end()
//         }
//     } catch (exception) {
//         next(exception)
//     }
// })
//////////////////////////////////////////////////////////////

// notesRouter.put('/:id', (request, response, next) => {
//     const body = request.body

//     const note = {
//         title: body.title,
//         author: body.author,
//         url: body.url,
//         likes: body.likes,
//     }

//     //
//     // id: Number,
//     // title: String,
//     // author: String,
//     // url: String,
//     // likes: Number

//     //

//     Blog.findByIdAndUpdate(request.params.id, note, { new: true })
//         .then((updatedNote) => {
//             console.log('updatedNote', updatedNote)
//             response.json(updatedNote.toJSON())
//         })
//         .catch((error) => next(error))
// })

module.exports = notesRouter
