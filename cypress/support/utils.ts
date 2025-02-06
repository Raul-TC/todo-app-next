
class Utils {

    visitPage({ page }: { page: string }) {
        cy.visit(page)
    }
    getElement({ selector }: { selector: string }) {
        return cy.get(selector)
    }

    elementIsVisible({ selector }: { selector: string }) {
        cy.get(selector).should('be.visible')
    }
    textIsVisible({ text }: { text: string }) {
        cy.contains(text).should('be.visible')
    }

    elementContains({ selector, text }: { selector: string, text: string }) {
        cy.get(selector).should('be.visible').contains(text)
    }
    elementNotContains({ selector, text }: { selector: string, text: string }) {
        cy.get(selector).should('not.contain', text)
    }

    typeText({ selector, text }: { selector: string, text: string }) {
        cy.get(selector).clear().type(text)
    }

    click({ selector }: { selector: string }) {
        cy.get(selector).should('be.visible').click()
    }

    clickButtonWithText({ selector, text }: { selector: string, text: string }) {
        cy.get(selector).contains(text).should('be.visible').and('not.be.disabled').click()
    }

    urlContains({ url }: { url: string }) {
        cy.url().should('eq', url)
    }

    setupIntercepts({ method, url, alias }: { method: string, url: string | RegExp, alias: string }) {
        cy.intercept(method, url).as(alias);
    }

    containterHasElement({ container, selector }: { container: JQuery<HTMLBodyElement>, selector: string }) {
        return container.find(selector).length > 0
    }

    getTotalElements({ selector }: { selector: JQuery<HTMLBodyElement> }) {
        return selector.length
    }

    compareTotalElements({ selector, toCompareTotalElement }: { selector: string, toCompareTotalElement: number }) {
        cy.get(selector).its('length').should('eq', toCompareTotalElement)
    }
}

export const utils = new Utils()