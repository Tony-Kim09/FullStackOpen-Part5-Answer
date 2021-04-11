Cypress.Commands.add('register', ({username, name, password}) => {
  cy.request('POST', 'http://localhost:3001/api/users', {
    username, name, password
  })
})

Cypress.Commands.add('login', ({username, password}) => {
  cy.request(
    'POST', 
    'http://localhost:3001/api/login', 
    {username, password}
    ).then((response)=> {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/blogs',
    headers: { Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}` },
    body: blog
  }).then((response) => {
    cy.visit('http://localhost:3000')
  })
})