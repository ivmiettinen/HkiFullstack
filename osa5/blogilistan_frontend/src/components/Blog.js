import React from 'react'

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
}

const titleAndAuthor = {
    color: '#3CB371',
    fontWeight: 'bold',
}

const Blog = ({ blog, Togglable }) => {
    // console.log('all blogs:', blog)

    return (
        <div style={blogStyle}>
            <p style={titleAndAuthor}>
                {blog.title} by {blog.author}
            </p>
            <Togglable buttonLabel='view'>
                <p>url: {blog.url} </p>
                <p>likes: {blog.likes} </p>
            </Togglable>
        </div>
    )
}

export default Blog
