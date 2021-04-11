import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent  } from '@testing-library/react'
import Blog from './Blog'

describe('blog component', () => {

  let component;
  const mockUpdate = jest.fn();
  const mockDelete = jest.fn();

  beforeEach(() => {
    const blog = {
      title: "this is a test",
      author: "author",
      url: "url",
      likes: 0
    }
    
    component = render(
      <Blog blog={blog} updateLikes={mockUpdate} deleteBlog={mockDelete}/>
    )
  })

  test('properly renders title and author but not url and likes', () => {
    expect(component.container.querySelector('.titleAndAuthor')).toBeDefined();
    expect(component.container.querySelector('.urlAndLikes')).toBeNull();
  })

  test('show url and likes when toggle button is pressed', () => {
    fireEvent.click(component.container.querySelector('.toggleButton'))
    expect(component.container.querySelector('.urlAndLikes')).toBeDefined();
  })

  test('if like button is clicked twice, event is fired twice', ()=> {
    fireEvent.click(component.container.querySelector('.toggleButton'))
    const like = component.container.querySelector('.likeButton')
    fireEvent.click(like)
    fireEvent.click(like)
    expect(mockUpdate.mock.calls.length).toBe(2);
  })
})