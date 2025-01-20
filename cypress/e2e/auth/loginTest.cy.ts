describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('LOGIN-1', () => {
    cy.fixture('example.json').then(({ validLogin }) => {
      cy.loginUser({ email: validLogin.email, password: validLogin.password })
    })
    cy.get('div[role="alert"] div').should('be.visible').contains('Iniciando Sesión')
    cy.get('div[role="alert"] div').should('not.contain', 'Iniciando Sesión')
    cy.get('div[role="alert"] div').should('be.visible').contains('Sesion Iniciada Correctamente')
    cy.url().should('eq', 'http://localhost:3000/')
    cy.get('[data-test="welcome-text"]').should('be.visible')
  })

  it('LOGIN-2', () => {
    cy.fixture('example.json').then(({ invalidLogin }) => {
      cy.loginUser({ email: invalidLogin.email, password: invalidLogin.password })
    })
    cy.get('div[role="alert"] div').should('be.visible').contains('Iniciando Sesión')
    cy.get('div[role="alert"] div').should('not.contain', 'Iniciando Sesión')
    cy.get('div[role="alert"] div').should('be.visible').contains('Error: Invalid Credentials')
    // cy.get('div[role="alert"] div', { timeout: 10000 }).should('not.contain', 'Error: Invalid Credentials')

  })
  it('LOGIN-3', () => {
    cy.get('button[type="submit"]').click()

    cy.get('[data-test="error-email"]').should('be.visible').contains('Email is required')
    cy.get('[data-test="error-password"]').should('be.visible').contains('Password is required')

    // cy.get('div[role="alert"] div', { timeout: 10000 }).should('not.contain', 'Error: Invalid Credentials')

  })
})