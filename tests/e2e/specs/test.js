// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.get('#-e2e-sign-in-button').should('contain.text', 'Sign In')
    cy.get('#-e2e-sign-in-button').click()
  })
})
