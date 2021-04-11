import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import LogoutForm from './components/Logout'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Username and Password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }


  //The following takes care of Adding new Blogs
  const blogForm = () => (
    <Togglable buttonLabel='new blog'>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  const addBlog = (blogObject) => {

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        setMessage(`Your New Blog: ${returnedBlog.title} by ${returnedBlog.author} has been added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const updateLikes = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const retrivedBlog = await blogService.update(blog.id, updatedBlog)

    setBlogs(blogs.map(old => old.id === blog.id ? retrivedBlog : old))
  }

  const deleteBlog = async (blogToDelete) => {
    if (window.confirm('Would you like to remove the blog?')) {
      try {
        const deleteStatus = await blogService.deleteBlog(blogToDelete.id)
        if (deleteStatus === 204){
          setMessage('The blog has been successfully deleted!')
          setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }

      } catch (err) {
        setErrorMessage(err.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  //The following takes care of Login
  const loginForm = () => {

    return (
      <Togglable id='loginform' buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  return (
    <div>
      <Notification message = {message}/>
      <ErrorMessage message = {errorMessage}/>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} has logged in</p>
          <LogoutForm logout={handleLogOut}/>
          <h2>Add a New Blog</h2>
          {blogForm()}
        </div>
      }

      <h2>blogs</h2>
      <div id='blogs'>
        {blogs.sort(((first, second) => second.likes - first.likes))
          .map(blog =>
            <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog}/>
        )}
      </div>
    </div>
  )
}

export default App