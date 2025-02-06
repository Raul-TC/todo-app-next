import { utils } from "../../support/utils"
import { authPage } from "../../support/pages/authPage"
import { homePage } from "../../support/pages/homePage"

describe('Edit a Task', () => {

    beforeEach(() => {
        cy.fixture('login.json').then(({ validLogin }) => {
            cy.session('userSession', () => {
                cy.loginUser({ email: validLogin.email, password: validLogin.password })
                authPage.validateToastLoginSuccess()
            })
        })
        utils.visitPage({ page: '/' })
    })


    it('EDIT-1', () => {
        homePage.sessionIntercept()
        cy.wait('@session').then(() => {
            homePage.editTask({ isNegativeTest: false, nameTc: 'TC1' })
        })
    })

    it('EDIT-2', () => {
        homePage.sessionIntercept()
        cy.wait('@session')
            .then(() => {
                homePage.editTask({ isNegativeTest: true, nameTc: 'TC2' })
            })
    })

    it('EDIT-3', () => {
        homePage.sessionIntercept()
        cy.wait('@session')
            .then(() => {
                homePage.editTask({ isNegativeTest: true, nameTc: 'TC3' })
            })
    })


})