import { authPage } from "../../support/pages/authPage"
import { utils } from "../../support/utils"

describe('Register', () => {

    it('CREATE-1', () => {
        cy.fixture("register.json").then(({ validRegister: { userName, email, password, confirmPassword } }) => {
            cy.registerUser({ userName, email, password, confirmPassword })
        })
        authPage.validateRegister()
    })

    it('CREATE-2', () => {
        cy.fixture("register.json").then(({ invalidEmailRegister: { userName, email, password, confirmPassword } }) => {
            cy.registerUser({ userName, email, password, confirmPassword })
        })
        authPage.validateToastRegisterInvalidEmail()
    })

    it('CREATE-3', () => {
        cy.fixture("register.json").then(({ differentPasswordRegister: { userName, email, password, confirmPassword } }) => {
            cy.registerUser({ userName, email, password, confirmPassword })
        })
        authPage.validateToastRegisterInvalidPassword()
    })
    it('CREATE-4', () => {
        cy.fixture("register.json").then(({ existUserNameRegister: { userName, email, password, confirmPassword } }) => {
            cy.registerUser({ userName, email, password, confirmPassword })
        })
        authPage.validateToastRegisterInvalidUserName()
    })
    it('CREATE-5', () => {
        cy.fixture("register.json").then(({ existEmailRegister: { userName, email, password, confirmPassword } }) => {
            cy.registerUser({ userName, email, password, confirmPassword })
        })
        authPage.validateToastRegisterEmailExists()
    })
    it('CREATE-6', () => {
        utils.visitPage({ page: '/register' })
        authPage.sessionIntercept()
        cy.wait('@session').then(() => authPage.validateToastEmptyLoginFields({ type: 'register' }))
    })
})