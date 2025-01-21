describe('Edit a Task', () => {

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


    it('EDIT-1', () => {
        cy.visit('/')
        cy.get('[data-test="taskContainer-82"]').should('be.visible')
        cy.get('[data-test="taskContainer-82"] > div').should('be.visible').within(($container) => {
            cy.log(`${$container}`)
            cy.get('[data-test="edit-task"]').invoke('css', 'opacity', '1').should('be.visible').click({ force: true })
            cy.get('[data-test="form-edit"]').clear().type(`Editando task new hora ${new Date().toLocaleTimeString()}`)
            cy.get('[data-test="confirm-edit-task"]').click()
        })
        cy.get('div[role="alert"] div').should('be.visible').contains('Tarea actualizada con éxito!')
    })

    it('EDIT-2', () => {
        cy.visit('/')
        cy.get('[data-test="taskContainer-82"]').should('be.visible')
        cy.get('[data-test="taskContainer-82"] > div').should('be.visible').within(() => {
            cy.get('[data-test="taskText"]').should('be.visible').then(el => {

                const beforeUpdate = el.text()
                cy.log('Task: ', el.text())
                cy.get('[data-test="edit-task"]').invoke('css', 'opacity', '1').should('be.visible').click({ force: true })
                cy.get('[data-test="form-edit"]').clear().type(beforeUpdate)

                cy.get('[data-test="confirm-edit-task"]').click()


                cy.get('[data-test="taskText"]').should('be.visible').then(beforeEl => {
                    const newText = beforeEl.text()
                    cy.log('Texto después de la edición:', newText);

                    expect(newText).to.equal(beforeUpdate); // Asegurar que el texto cambió

                })

            })
        })
        cy.get('div[role="alert"] div').should('not.exist')
    })

    it.only('EDIT-3', () => {
        cy.visit('/')
        cy.get('[data-test="taskContainer-82"]').should('be.visible')
        cy.get('[data-test="taskContainer-82"] > div').should('be.visible').within(() => {

            // cy.get('[data-test="edit-task"]').invoke('css', 'opacity', '1').should('be.visible').click({ force: true })
            // cy.get('[data-test="form-edit"]').clear()
            // cy.get('[data-test="confirm-edit-task"]').click()

            cy.get('[data-test="taskText"]').should('be.visible').then(el => {

                const beforeUpdate = el.text()
                cy.log('Task: ', el.text())
                cy.get('[data-test="edit-task"]').invoke('css', 'opacity', '1').should('be.visible').click({ force: true })
                cy.get('[data-test="form-edit"]').clear()

                cy.get('[data-test="confirm-edit-task"]').click()


                cy.get('[data-test="taskText"]').should('be.visible').then(beforeEl => {
                    const newText = beforeEl.text()
                    cy.log('Texto después de la edición:', newText);

                    expect(newText).to.equal(beforeUpdate); // Asegurar que el texto cambió

                })
            })

        })


        cy.get('div[role="alert"] div').should('not.exist')
    })


})