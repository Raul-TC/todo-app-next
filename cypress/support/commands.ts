/// <reference types="cypress" />


import { authSelectors } from "../selectors"
import { authPage } from "./pages/authPage"
import { utils } from "./utils"

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
    utils.visitPage({ page: '/' })
    utils.textIsVisible({ text: authSelectors.titlePage({ type: 'login' }) })
    authPage.loginUser({ email, password })
})

Cypress.Commands.add('registerUser', ({ userName, email, password, confirmPassword }: { userName: string, email: string, password: string, confirmPassword: string }) => {
    utils.visitPage({ page: '/register' })
    utils.textIsVisible({ text: authSelectors.titlePage({ type: 'Register' }) })
    authPage.registerUser({ userName, email, password, confirmPassword })
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