import { authPage } from "../../support/pages/authPage"
import { homePage } from "../../support/pages/homePage"
import { utils } from "../../support/utils"

describe('Delete Task', () => {
    beforeEach(() => {
        cy.fixture('login.json').then(({ validLogin }) => {
            cy.session('userSession', () => {
                cy.loginUser({ email: validLogin.email, password: validLogin.password })
                authPage.validateToastLoginSuccess()
            })
        })
        utils.visitPage({ page: '/' })

    })

    it('delete one task', () => {
        homePage.sessionIntercept()

        cy.wait('@session').then(() => {
            homePage.deleteTask({ option: 'delete' })
        })
    })

    it('cancel delete task', () => {
        homePage.sessionIntercept()

        cy.wait('@session')
            .then(() => {
                homePage.deleteTask({ option: 'cancel' })
            })
    })
})