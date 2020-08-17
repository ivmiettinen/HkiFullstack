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

notesRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

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

module.exports = notesRouter
