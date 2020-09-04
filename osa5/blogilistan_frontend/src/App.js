import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import SuccessMessage from './components/SuccessMessage'
import loginService from './services/login'
import './App.css'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [newTitle, setNewTitle] = useState('')

    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const [showAll, setShowAll] = useState(true)

    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const [successMessage, setSuccessMessage] = useState(null)

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            // content: newNote,
            // date: new Date().toISOString(),
            // important: Math.random() > 0.5,

            title: newTitle,
            author: newAuthor,
            url: newUrl,
            id: blogs.length + 1,
        }

        blogService.create(blogObject).then((returnedBlog) => {
            setBlogs(blogs.concat(returnedBlog))

            setSuccessMessage(`A new blog ${newTitle} by ${newAuthor} added`)
            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000)

            setNewTitle('')
            setNewAuthor('')
            setNewUrl('')
        })
    }
    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type='text'
                    value={username}
                    name='Username'
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type='password'
                    value={password}
                    name='Password'
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type='submit'>login</button>
        </form>
    )

    const noteForm = () => (
        <form onSubmit={addBlog}>
            title:{' '}
            <input
                value={newTitle}
                onChange={({ target }) => setNewTitle(target.value)}
            />
            <br />
            author:{' '}
            <input
                value={newAuthor}
                onChange={({ target }) => setNewAuthor(target.value)}
            />
            <br />
            url:{' '}
            <input
                value={newUrl}
                onChange={({ target }) => setNewUrl(target.value)}
            />
            <br />
            <button type='submit'>create</button>
        </form>
    )

    const logOut = (e) => {
        window.localStorage.clear()
        setUser(null)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
          console.log('error on put:', exception);
            setErrorMessage(`Wrong username or password`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            <h1>blogs</h1>

            <Notification errorMessage={errorMessage} />

            {user === null ? (
                loginForm()
            ) : (
                <div>
                    
                    <SuccessMessage successMessage={successMessage} />

                    <p>{user.name} logged in</p>
                    {noteForm()}

                    <div>
                        <button onClick={logOut}>Log out</button>
                    </div>
                    {/* <div>
                        <button onClick={() => setShowAll(!showAll)}>
                            show {showAll ? 'important' : 'all'}
                        </button>
                    </div> */}

                    <ul>
                        {blogs.map((blog) => (
                            <Blog key={blog.id} blog={blog} />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default App
