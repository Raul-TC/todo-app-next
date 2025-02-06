import { homeSelectors, sharedSelectors } from "../../selectors"
import { utils } from "../utils"

class HomePage {
    sessionIntercept() {
        utils.setupIntercepts({ method: 'GET', url: '/api/auth/session', alias: 'session' })
    }

    postTaskIntercept() {
        utils.setupIntercepts({ method: 'POST', url: homeSelectors.POSTApiTasks, alias: 'addTask' })
    }

    deleteTaskIntercept() {
        utils.setupIntercepts({ method: 'DELETE', url: /\/api\/tasks\/\d+/, alias: 'deleteUser' })
    }

    validateToastEmptyNewTask() {
        utils.elementContains({ selector: sharedSelectors.toastContainer, text: homeSelectors.toastEmptyNewTaskText })
    }

    addTask() {
        utils.click({ selector: homeSelectors.addTaskButton })
    }

    hasTask({ container, selector }: { container: JQuery<HTMLBodyElement>, selector: string }) {
        return utils.containterHasElement({ container, selector })
    }

    createNewTask() {
        cy.get('body')
            .then(body => {
                const hasTasks = this.hasTask({ container: body, selector: homeSelectors.tasks })
                const initialTaskCount = hasTasks ? utils.getTotalElements({ selector: body.find(homeSelectors.tasks) }) : 0; // Manejar cuando no hay tareas
                this.postTaskIntercept()
                utils.typeText({ selector: homeSelectors.inputCreateTask, text: 'Create new task at ' + new Date().toLocaleTimeString() })
                this.addTask()
                this.validateToastNewTask({ selector: homeSelectors.tasks, toCompareTotalElement: initialTaskCount + 1 })
            })

    }

    deleteTask({ option }: { option: string }) {
        cy.get('body')
            .then(body => {
                const hasTasks = this.hasTask({ container: body, selector: homeSelectors.tasks })
                cy.log('all: ', hasTasks)
                const initialTaskCount = hasTasks ? utils.getTotalElements({ selector: body.find(homeSelectors.tasks) }) : 0; // Manejar cuando no hay tareas

                if (hasTasks) {

                    cy.log(`Before deleted ${initialTaskCount}`)

                    this.deleteTaskIntercept()

                    utils.getElement({ selector: homeSelectors.tasks })
                        .first()
                        .within(($container) => {
                            cy.log(`${$container}`)
                            utils.getElement({ selector: homeSelectors.deleteTaskIcon }).invoke('css', 'opacity', '1').should('be.visible').click()

                        })

                    utils.elementIsVisible({ selector: homeSelectors.modalDelete })

                    if (option === 'delete') {
                        utils.click({ selector: homeSelectors.modalYesDeleteOption })

                        cy.wait('@deleteUser')
                            .then((interception) => {
                                expect(interception.response?.statusCode).to.eq(200); // Verificar respuesta del servidor
                                cy.log('Delete request intercepted successfully.');
                            });
                        this.validateToastDeleteTask({ selector: homeSelectors.tasks, toCompareTotalElement: initialTaskCount - 1 })
                    } else {
                        utils.click({ selector: homeSelectors.modalCancelOption })
                        utils.compareTotalElements({ selector: homeSelectors.tasks, toCompareTotalElement: initialTaskCount })
                        utils.getElement({ selector: sharedSelectors.toastContainer }).should('not.exist')
                    }
                } else {
                    cy.log('No tasks to delete.');
                }
            })
    }

    editTask({ isNegativeTest, nameTc }: { isNegativeTest: boolean, nameTc: string }) {
        cy.get('body').then(body => {
            const hasTasks = this.hasTask({ container: body, selector: homeSelectors.tasks })

            if (hasTasks) {
                utils.getElement({ selector: homeSelectors.tasks })
                    .first()
                    .should('be.visible')
                    .within((el) => {
                        cy.log(`TEXT: ${el.text()}`)
                        if (isNegativeTest) {
                            utils.getElement({ selector: homeSelectors.textTaxt })
                                .should('be.visible')
                                .then(el => {
                                    const beforeUpdate = el.text()
                                    cy.log(`before: ${beforeUpdate}`)
                                    utils.getElement({ selector: homeSelectors.editTaskIcon }).invoke('css', 'opacity', '1').should('be.visible').click()
                                    if (nameTc !== 'TC3') {
                                        utils.typeText({ selector: homeSelectors.inputEditTask, text: beforeUpdate })
                                    }
                                    utils.click({ selector: homeSelectors.confirmTaskIcon })
                                    utils.getElement({ selector: homeSelectors.textTaxt })
                                        .should('be.visible')
                                        .then(beforeEl => {

                                            const newText = beforeEl.text()
                                            cy.log(`after: ${newText}`)
                                            expect(newText).to.equal(beforeUpdate); // Asegurar que el texto no cambió
                                        })
                                })
                            utils.getElement({ selector: sharedSelectors.toastContainer }).should('not.exist')

                        } else {
                            utils.getElement({ selector: homeSelectors.editTaskIcon }).invoke('css', 'opacity', '1').should('be.visible').click()
                            utils.typeText({ selector: homeSelectors.inputEditTask, text: homeSelectors.taskContent })
                            utils.click({ selector: homeSelectors.confirmTaskIcon })

                            utils.getElement({ selector: homeSelectors.textTaxt })
                                .should('be.visible')
                                .then(beforeEl => {

                                    const newText = beforeEl.text()
                                    cy.log(`after: ${newText}`)
                                    expect(newText).not.equal(el.text()); // Asegurar que el texto no cambió
                                })
                        }

                    })

                if (!isNegativeTest) {
                    utils.elementContains({ selector: sharedSelectors.toastContainer, text: homeSelectors.toastEditTaskSuccess })
                }
            }
            else {
                cy.log('No tasks to edit.');
            }
        })
    }

    validateToastNewTask({ selector, toCompareTotalElement }: { selector: string, toCompareTotalElement: number }) {
        utils.elementContains({ selector: sharedSelectors.toastContainer, text: homeSelectors.toastNewTaskPendingText })
        utils.elementNotContains({ selector: sharedSelectors.toastContainer, text: homeSelectors.toastNewTaskPendingText })
        utils.elementContains({ selector: sharedSelectors.toastContainer, text: homeSelectors.toastNewTaskSuccessText })
        utils.compareTotalElements({ selector, toCompareTotalElement })
    }

    validateToastDeleteTask({ selector, toCompareTotalElement }: { selector: string, toCompareTotalElement: number }) {
        utils.elementContains({ selector: sharedSelectors.toastContainer, text: homeSelectors.toastPendingDeleteTask })
        utils.elementNotContains({ selector: sharedSelectors.toastContainer, text: homeSelectors.toastPendingDeleteTask })
        utils.elementContains({ selector: sharedSelectors.toastContainer, text: homeSelectors.toastSuccessDelete })
        utils.compareTotalElements({ selector, toCompareTotalElement })
    }

}

export const homePage = new HomePage()