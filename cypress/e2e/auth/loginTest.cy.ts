import { authPage } from "../../support/pages/authPage"
import { sharedSelectors } from "../../selectors"
import { utils } from "../../support/utils"

describe('Login', () => {
  it('LOGIN-1', () => {
    cy.fixture('login.json').then(({ validLogin }) => {
      cy.loginUser({ email: validLogin.email, password: validLogin.password })
    })
    authPage.validateToastLoginSuccess()
  })

  it('LOGIN-2', () => {
    cy.fixture('login.json').then(({ invalidLogin }) => {
      cy.loginUser({ email: invalidLogin.email, password: invalidLogin.password })
    })
    authPage.validateToastInvalidLogin()
  })
  it('LOGIN-3', () => {
    utils.visitPage({ page: '/' })
    utils.click({ selector: sharedSelectors.submitButton })
    authPage.validateToastEmptyLoginFields({ type: 'login' })
  })
})