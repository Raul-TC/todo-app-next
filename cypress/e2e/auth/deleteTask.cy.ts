describe('Delete Task', () => {
    beforeEach(() => {
        cy.fixture('example.json').then(({ validLogin }) => {
            cy.session('userSession', () => {
                cy.visit('/')
                cy.loginUser({ email: validLogin.email, password: validLogin.password })
                cy.get('div[role="alert"] div').should('be.visible').contains('Iniciando Sesión')
                cy.get('div[role="alert"] div').should('not.contain', 'Iniciando Sesión')
                cy.get('div[role="alert"] div').should('be.visible').contains('Sesion Iniciada Correctamente')
                cy.url().should('eq', 'http://localhost:3000/')
                cy.get('[data-test="welcome-text"]').should('be.visible')
            })
        })
    })

    it('delete one task', () => {
        cy.visit('/')
        cy.get('[data-test^="taskContainer"]').its('length').then(element => {
            cy.log(`Before Added ${element}`)


            cy.get('[data-test^="taskContainer"] > div').first().within(($container) => {
                cy.log(`${$container}`)
                cy.get('[data-test="deleteTask"]').invoke('css', 'opacity', '1').should('be.visible').click({ force: true })
            })
            cy.get('[data-test="modalDelete"]').should('be.visible')
            cy.get('[data-test="yesDelete"]').click()

            // cy.get('div.Toastify__toast-body')
            //     .should('be.visible')
            //     .and('contain', 'Eliminando tarea');

            cy.get('div.Toastify__toast-body').should('be.visible').and('contain', 'Eliminando Tarea')
            // cy.get('div.Toastify__toast-body div').should('not.exist')
            cy.get('div.Toastify__toast-body').should('be.visible').and('contain', 'Tarea eliminada con exito')
            cy.get('[data-test^="taskContainer"').its('length').should('eq', element)

        })
    })
})