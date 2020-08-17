const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const { keyBy } = require('lodash')
const { initialNotes } = require('./test_helper')

//Alustus:

beforeEach(async () => {
    await Blog.deleteMany({})
    // console.log('cleared')

    const blogObjects = helper.initialNotes.map((blog) => new Blog(blog))

    const promiseArray = blogObjects.map((blog) => blog.save())

    await Promise.all(promiseArray)
})

//TAI:
// beforeEach(async () => {
//     await Blog.deleteMany({})
//     await Blog.insertMany(helper.initialNotes)
// })
//

//4.8:

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToCompare = blogsAtStart

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialNotes.length)
})

//4.9:

test('blogs identification field is id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    // const blogToCompare = blogsAtStart

    // console.log('blogToCompare', blogToCompare)

    const specificId = blogsAtStart[0]

    const getOneId = await api.get(`/api/blogs/${specificId.id}`)

    expect(getOneId.body.id).toBeDefined()

    // const getMany = await api.get('/api/blogs/')

    // const contents = getMany.body.map(r => r.author)

    // expect(contents).toContain(
    //     'Edsger W. Dijkstra')
})

//4.10

test('a valid blog post can be added', async () => {
    const newBlogPost = {
        id: 321,
        title: 'JS is very cool',
        author: 'Jim Halpert',
        url: 'www.google.fi',
        likes: 543,
    }

    await api
        .post('/api/blogs')
        .send(newBlogPost)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map((r) => r.title)

    expect(response.body).toHaveLength(initialNotes.length + 1)
    expect(contents).toContain('JS is very cool')
})

//4.11

test('if likes field is empty, value is 0', async () => {
    const newBlogPost2 = {
        title: 'JS is very cool',
        author: 'Jim Halpert',
        url: 'www.google.fi',
    }

    const newBlogPost3 = {
        title: 'JS is very cool',
        author: 'Jim Halpert',
        url: 'www.google.fi',
        likes: 0,
    }

    await api
        .post('/api/blogs')
        .send(newBlogPost2)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map((r) => r.likes)

    expect(contents).toContain(newBlogPost3.likes)
})

//4.12

test('400 bad request for blog posts without  title and url fields', async () => {
    const blogPostWithoutFields = {
        author: 'Jim Halpert',

        likes: 0,
    }

    // const response = await api.get('/api/blogs')

    // const contents = response.body.map((r) => r)

    // console.log('contentssssss', contents)

    await api.post('/api/blogs').send(blogPostWithoutFields).expect(400)
})

//

//My own test:

// test('match id fields', async () => {

//     const blogsAtStart = await helper.blogsInDb()

//     // console.log('blogsAtStart', blogsAtStart)

//     const noteToView = blogsAtStart[0]

//     // console.log('noteToView', noteToView)

//     // const allBlogs = await api.get('/api/blogs/')

//     // const TestiHenkilo = {
//     //     id: '5a422a851b54a676234d17f7',
//     //     title: 'React patterns',
//     //     author: 'Michael Chan',
//     //     url: 'https://reactpatterns.com/',
//     //     likes: 7,
//     //     blogs: 1,
//     //     __v: 0,
//     // }

//     expect(noteToView).toHaveProperty('id')

// })

afterAll(() => {
    mongoose.connection.close()
})

// test('all notes are returned', async () => {
//     const response = await api.get('/api/blogs')

//     expect(response.body).toHaveLength(helper.initialNotes.length)
// })
