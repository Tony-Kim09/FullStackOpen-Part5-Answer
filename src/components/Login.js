import React from 'react'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id='usernameInput'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id='passwordInput'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id='loginButton' type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm