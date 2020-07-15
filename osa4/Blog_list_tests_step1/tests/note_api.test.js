const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../tests/test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const { keyBy } = require('lodash')


//Alustus:

beforeEach(async () => {
    await Blog.deleteMany({})
    // console.log('cleared')

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