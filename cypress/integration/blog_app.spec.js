describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.register({ username: 'bob', name: 'bob', password: 'tob'})
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#usernameInput')
    cy.get('#passwordInput')
    cy.get('#loginButton')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#usernameInput').type('bob')
      cy.get('#passwordInput').type('tob')
      cy.get('#loginButton').click()
    })

    it('fails with wrong credentials', function() {
      cy.get('#logoutButton').click()
      cy.get('#usernameInput').type('wrong')
      cy.get('#passwordInput').type('vv')
      cy.get('#loginButton').click()

      cy.get('.error')
        .should('contain', 'Wrong Username and Password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'bob has logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: 'bob', password:'tob'})
    })
    it('A blog can be created', function() {
      //Number of Blogs in the beginning should be 0
      cy.get('#blogs > *').should('have.length', 0)

      cy.login({username: 'bob', password:'tob'})

      cy.get('#title').type('my first blog')
      cy.get('#author').type('bobby')
      cy.get('#urlInput').type('blog@bobby.bob')
      cy.get('#createBlogButton').click()

      cy.get('#blogs > *').should('have.length', 1)
      cy.contains('my first blog')
    })
  })
  describe('User can use app features', function() {
    beforeEach(function() {
      cy.login({username: 'bob', password: 'tob'})
      const blog = {
        title: 'this is my blog', 
        url: 'url@url.com', 
        author: 'tester'
      };
      cy.createBlog(blog)
    })
    it('A blog can be liked', function() {
      cy.get('.toggleButton').click()
      cy.get('.likeButton').click()
      cy.contains('likes 1')
    })
    it('A blog can be deleted', function() {
      cy.get('#blogs > *').should('have.length', 1)
      cy.get('.toggleButton').click()
      cy.get('.deleteBlogButton').click()
      cy.contains('The blog has been successfully deleted!')
      cy.get('#blogs > *').should('have.length', 0)
    })
  })

  describe('Testing Blogs', function() {
    beforeEach(function() {
      cy.login({username: 'bob', password: 'tob'})
      const lowestBlog = {
        title: 'this is my worst blog', 
        url: 'url@url.com', 
        author: 'tester',
        likes: 1
      };      
      const middleBlog = {
        title: 'this is my ok blog', 
        url: 'url@url.com', 
        author: 'tester',
        likes: 2
      };
      const highestBlog = {
        title: 'this is my best blog', 
        url: 'url@url.com', 
        author: 'tester',
        likes: 3
      };
      cy.createBlog(lowestBlog)
      cy.createBlog(middleBlog)
      cy.createBlog(highestBlog)
      cy.visit('http://localhost:3000')
    })
    it('Blogs are ordered by likes from highest to lowest', function() {
      cy.get('#blogs > *').then(blogs => {
        let likes = 3;
        for (const blog of blogs) {
            cy.wrap(blog).find('.toggleButton').click();
            cy.wrap(blog).contains(`likes ${likes}`);
            likes--;
        }
    });
    })
  })
})
