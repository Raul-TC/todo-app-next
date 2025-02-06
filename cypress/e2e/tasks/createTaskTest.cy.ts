import { authPage } from "../../support/pages/authPage"
import { homePage } from "../../support/pages/homePage"
import { utils } from "../../support/utils"

describe('Create a Task', () => {

    beforeEach(() => {
        cy.fixture('login.json').then(({ validLogin }) => {
            cy.session('userSession', () => {
                cy.loginUser({ email: validLogin.email, password: validLogin.password })
                authPage.validateToastLoginSuccess()
            })
        })
        utils.visitPage({ page: '/' })
    })

    it('CREATE-1', () => {
        homePage.sessionIntercept()
        cy.wait('@session')
            .then(() => homePage.createNewTask())
    })

    it('CREATE-2', () => {
        homePage.sessionIntercept()
        cy.wait('@session')
            .then(() => {
                homePage.addTask()
                homePage.validateToastEmptyNewTask()
            })

    })
})