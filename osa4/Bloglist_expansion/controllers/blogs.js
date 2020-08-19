const blogsRouter = require('express').Router()

const Blog = require('../models/blog')

const User = require('../models/user')

const jwt = require('jsonwebtoken')
const { usersInDb } = require('../tests/test_helper')

// const getTokenFrom = (request) => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//         return authorization.substring(7)
//     }
//     return null
// }

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

    console.log('request.body', body)

    // const decodedToken = jwt.verify(request.token, process.env.SECRET)

    ////////////////
    // const token = getTokenFrom(request)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    console.log('const user = await User.findById(decodedToken.id)', user)

    ///////////////////////

    // console.log('user:', body)

    // console.log('real user', user._id)

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
    // const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    // console.log('const user = await User.findById(decodedToken.id)', user)

    console.log('USERin ID ', user._id)

    //Tällä IDllä haluttaisiin poistaa:
    // console.log('request.params.id', request.params.id)

    // console.log('request.params', request.params)

    const blog = await Blog.findById(request.params.id)

    console.log('USERin ID TYPE OF:', typeof user._id.toString())

    console.log(
        'user, joka on lisännyt blogin TYPE OF:',
        typeof blog.user.toString()
    )

    //////////////////////////////////4.21 Jatka tästä ja try-kohdasta:
    console.log('ovatko samoja:', user._id.toString() === blog.user.toString())

    // console.log('blogi: ', blog)

    // console.log('blogiID: ', blog._id)

    //Vain tällä IDllä varustettu henkilö voi poistaa blogin
    console.log('user, joka on lisännyt blogin', blog.user)

    console.log('blog.user.toString', blog.user.toString())
    console.log('usersInDb.toString', usersInDb.toString)
    // // const decodedToken = jwt.verify(request.token, process.env.SECRET)

    // ////////////////
    // // const token = getTokenFrom(request)

    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // // const decodedToken = jwt.verify(token, process.env.SECRET)
    // if (!request.token || !decodedToken.id) {
    //     return response.status(401).json({ error: 'token missing or invalid' })
    // }
    // const user = await User.findById(decodedToken.id)

    //////////////////////////////

    try {
        // if (user._id.toString() === blog.user.toString()) {
        //     console.log('sama ID!')
        //     console.log('blog.user.toString', blog.user.toString())
        //     console.log('usersInDb.toString', usersInDb.toString)
        // }
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
