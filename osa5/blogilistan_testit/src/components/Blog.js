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

const Blog = ({ addNewLike, blog, deleteBlog }) => {
    // console.log('all blogs:', blog)

    return (
        <div style={blogStyle}>
            <p style={titleAndAuthor}>
                {blog.title} by {blog.author}
            </p>

            <p>url: {blog.url} </p>
            <p>likes: {blog.likes} </p>

            <p>
                <button
                    type='newLike'
                    value={blog.title}
                    name='newLike'
                    onClick={() => addNewLike(blog.id)}
                >
                    like
                </button>
            </p>
            <p>
                <button
                    type='deleteBlog'
                    value={blog.id}
                    name='deleteBlog'
                    onClick={() => deleteBlog(blog.id)}
                >
                    delete
                </button>
            </p>
        </div>
    )
}

export default Blog
