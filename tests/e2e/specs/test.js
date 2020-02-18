// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.get('#-e2e-sign-in-button').should('contain.text', 'Sign In')
    cy.get('#-e2e-sign-in-button').click()

    cy.url().should('include', '/login')
    cy.get('button:first').should('include.text', 'Submit').click()
    cy.url().should('include', '/login')

    cy.get('input:first').type('qwe') // type
    cy.get('button:first').click()    // and submit

    // email check
    cy.get('[for=-e2e-email]').should('have.class', 'error--text')
    cy.get('input:first').type('@qwe.com')
    cy.get('[for=-e2e-email]').should('not.have.class', 'error--text')

    // password checks
    cy.get('button:first').click()
    cy.get('#-e2e-error-messages p').should('contain.text', 'Must not be empty')
    //
    cy.get('input:last').type('qwe')
    cy.get('button:first').click()
    cy.get('#-e2e-error-messages p').should('contain.text', 'Wrong credentials, please try again')
  })
})
