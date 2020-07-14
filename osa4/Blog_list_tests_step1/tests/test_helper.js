const Blog = require('../models/blog')


const initialNotes = [
    {
        content: 'HTML is easy',
        date: new Date(),
        important: false
    },
    {
        content: 'Browser can execute only Javascript',
        date: new Date(),
        important: true
    },
    {
        content: 'Hacker daily basics',
        date: new Date(),
        important: true
    }
]


const nonExistingId = async () => {
    const note = new Blog({ content: 'willremovethissoon' })
    await note.save()
    await note.remove()

    return note._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialNotes, nonExistingId, blogsInDb
}