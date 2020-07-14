const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../tests/test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')


//Alustus:

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')

    const blogObjects = helper.initialNotes.map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())

    await Promise.all(promiseArray)


})



test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialNotes.length)

})




afterAll(() => {
    mongoose.connection.close()
})





// test('all notes are returned', async () => {
//     const response = await api.get('/api/blogs')

//     expect(response.body).toHaveLength(helper.initialNotes.length)
// })