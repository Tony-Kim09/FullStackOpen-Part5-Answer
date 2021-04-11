import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent  } from '@testing-library/react'
import BlogForm from './BlogForm'

test('BlogForm properly sends blog details for each input', () => {
  const component = render(<BlogForm/>)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#urlInput')

  fireEvent.change(title, {
    target: { value: 'new title' }
  })

  fireEvent.change(author, {
    target: { value: 'new author' }
  })

  fireEvent.change(url, {
    target: { value: 'new url' }
  })

  expect(title.value).toBe('new title')
  expect(author.value).toBe('new author')
  expect(url.value).toBe('new url')

})