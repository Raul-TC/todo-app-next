/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('loginUser', ({ email, password }: { email: string, password: string }) => {
    // cy.visit('/auth/signin')
    cy.contains('Sign In').should('be.visible')
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('button[type="submit"]').click()

})
Cypress.Commands.add('registerUser', ({ userName, email, password, confirmPassword }: { userName: string, email: string, password: string, confirmPassword: string }) => {
    // cy.visit('/auth/signin')
    cy.contains('Register').should('be.visible')
    cy.get('input[name="username"]').type(userName)
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('input[name="confirmPassword"]').type(confirmPassword)
    cy.get('button[type="submit"]').click()

})

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            /**
             * Comando personalizado para iniciar sesión
             * @param email - Correo electrónico del usuario
             * @param password - Contraseña del usuario
             */
            loginUser({ email, password }: { email: string, password: string }): Chainable<void>


            /**
                   * Actualiza el perfil del usuario
                   * @param userName - Objeto con los datos del perfil a actualizar
                   * @param userName - Objeto con los datos del perfil a actualizar
                   * @param userName - Objeto con los datos del perfil a actualizar
                   * @param confirmPassword - Objeto con los datos del perfil a actualizar
                   */
            registerUser({ userName, email, password, confirmPassword }: { userName: string, email: string, password: string, confirmPassword: string }): Chainable<void>
        }
    }
}

export { };