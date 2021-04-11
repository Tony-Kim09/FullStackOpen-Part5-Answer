import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [visibility, setVisibility] = useState(false)

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div className="titleAndAuthor"> 
        <b>
          {blog.title} <b>By: {blog.author}</b>
          <button className="toggleButton" onClick={toggleVisibility}>
            {visibility ? 'Hide' : 'View'}
          </button>
        </b>
      </div>
      {
        visibility &&
        <div className="urlAndLikes">
          <p>{blog.url}</p>
          <p id='currentLikes'>likes {blog.likes}
            <button className='likeButton' onClick={() => updateLikes(blog)}>Like</button>
          </p>
          <button className='deleteBlogButton' onClick={() => deleteBlog(blog)} >Delete</button> <br/>
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  updateLikes: PropTypes.func,
  deleteBlog: PropTypes.func
}

export default Blog