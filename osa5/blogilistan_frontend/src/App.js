import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import SuccessMessage from './components/SuccessMessage'
import loginService from './services/login'
import './App.css'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    

    const [showAll, setShowAll] = useState(true)

    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const [successMessage, setSuccessMessage] = useState(null)
    const [loginVisible, setLoginVisible] = useState(false)

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

    const blogFormRef = useRef()

    const addBlog = (blogObject) => {

        // blogObject.preventDefault()


        blogFormRef.current.toggleVisibility()

      
        

        blogService.create(blogObject).then((returnedBlog) => {
            setBlogs(blogs.concat(returnedBlog))

             setSuccessMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000)
 
            
        })
    }

   

    // const handleBlogChange = (event) => {
    //     setNewTitle(event.target.value)
    // }

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
            console.log('error on put:', exception)
            setErrorMessage(`Wrong username or password`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const loginForm = () => (
        <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
        />
    )

    // handleUsernameChange,
    // handlePasswordChange,

    return (
        <div>
            <h1>blogs</h1>

            <Notification errorMessage={errorMessage} />

            {user === null ? (
                loginForm()
            ) : (
                <div>
                    <SuccessMessage successMessage={successMessage} />

                    <div>
                        <p>
                            {user.name} logged in
                            <button onClick={logOut}>Log out</button>
                        </p>
                    </div>
                    <Togglable buttonLabel='new blog' ref={blogFormRef}>
                        <BlogForm
                            addBlog={addBlog}
                        />
                    </Togglable>

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
