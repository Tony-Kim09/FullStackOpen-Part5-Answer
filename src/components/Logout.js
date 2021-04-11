import React from 'react'

const logoutForm = ({ logout }) => (
  <form onSubmit={logout}>
    <button id='logoutButton' type="submit">logout</button>
  </form>
)

export default logoutForm