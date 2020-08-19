const blogsRouter = require('express').Router()

const Blog = require('../models/blog')

const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', {
            username: 1,
            name: 1,
        })
        if (blogs) {
            response.json(blogs.map((allBlogs) => allBlogs.toJSON()))
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.get('/:id', async (request, response, next) => {
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

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const user = await User.findById(body.userId)

    console.log('USHEEEER:', body)

    console.log('OIKEA USER', user._id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id,
    })
    try {
        if (body.title !== undefined && body.url !== undefined) {
            console.log('blogsRouter try onnistui, ', blog)
            const savedBlog = await blog.save()

            console.log('savedBlog', savedBlog)

            user.blogs = user.blogs.concat(savedBlog._id)
            await user.save()
            response.json(savedBlog.toJSON())
        } else {
            console.log('title ja/tai url puuttuvat ', blog)
            response.status(400).send('Bad request')
        }
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    try {
        const blogs = await Blog.findByIdAndUpdate(request.params.id, blog, {
            new: true,
        })

        response.json(blogs.toJSON())
    } catch (exception) {
        console.log('exception', exception)
        next(exception)
    }
})

module.exports = blogsRouter
