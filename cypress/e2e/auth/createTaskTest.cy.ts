describe('Create a Task', () => {

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

    it.only('CREATE-1', () => {
        cy.visit('/')

        cy.get('[data-test^="taskContainer"]').its('length').then(task => {
            cy.log(`Before Added ${task}`)
            cy.intercept('POST', '/api/tasks').as('addTask');

            cy.get('[data-test="todoInput"]').type('Create new task')
            cy.get('button').contains('Add Task').click()
            cy.get('div[role="alert"] div').should('be.visible').contains('Creando nueva Tarea')
            cy.get('div[role="alert"] div').should('not.contain', 'Creando nueva Tarea')
            cy.get('div[role="alert"] div').should('be.visible').contains('Tarea agregada con exito')
            // cy.get('div[role="alert"] div').should('not.contain', 'Tarea agregada con exito')
            cy.wait('@addTask').then((interception) => {
                // Verificar la respuesta del servidor
                cy.log(`${interception}`)
                expect(interception.response.statusCode).to.eq(201);
                expect(interception.response.body).to.have.property('message', 'Task Created');
            });
            cy.get('[data-test^="taskContainer"').its('length').should('eq', task + 1)
        })
    })
    it('CREATE-2', () => {
        cy.visit('/')
        cy.get('[data-test^="taskContainer"]').should('be.visible')
        cy.get('button').contains('Add Task').should('be.visible').and('not.be.disabled').click()
        cy.get('div[role="alert"] div').should('be.visible').contains('😡 No puedes agregar notas vacías')

    })
})