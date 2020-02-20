const { Given, When, Then, And } = require('cypress-cucumber-preprocessor/steps');

Given('an user is on app landing page', () => {
  cy.visit('/');
});

const selectors = {
  signInButton: '#-e2e-sign-in-button',
  signin: { submitButton: 'button:first' },
  email: { label: '[for=-e2e-email]', input: 'input:first' },
  password: { input: 'input:last', error: '#-e2e-error-messages p' }
};

const assertions = {
  shouldIncludeText: (selector, text) => cy.get(selector).should('include.text', text),
  shouldHaveError: (selector, className) => cy.get(selector).should('have.class', className),
  shouldHaveNotHaveError: (selector, className) => cy.get(selector).should('not.have.class', className)
};

const actions = {
  type: (selector, text) => cy.get(selector).type(text),
  click: (selector) => cy.get(selector).click()
};

When(`user clicks on signin button`, () => {
  assertions.shouldIncludeText(selectors.signInButton, 'Sign In');
  actions.click(selectors.signInButton);
  assertions.shouldIncludeText(selectors.signin.submitButton, 'Submit');
  actions.click(selectors.signin.submitButton);
});

Then(`user is redirected to signin page`, () => cy.url().should('include', '/login'));

Then(`email error should {word}`, (errorState) => {
  if (errorState === 'appear') {
    assertions.shouldHaveError(selectors.email.label, 'error--text');
  } else {
    assertions.shouldHaveNotHaveError(selectors.email.label, 'error--text');
  }
});

When(`user type {string} into {word} input`, (text, field) => {
  const input = field === 'email' ? selectors.email.input : selectors.password.input;
  actions.type(input, text);
});

And(`submit the form`, () => cy.get('button:first').click());
When(`user submits signin form`, () => cy.get('button:first').click());

Then(`a password error should be shown telling {string}`, (error) => {
  assertions.shouldIncludeText(selectors.password.error, error);
});
