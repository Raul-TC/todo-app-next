describe('Register', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('CREATE-1', () => {
        cy.fixture("register.json").then(({ validRegister: { userName, email, password, confirmPassword } }) => {
            cy.registerUser({ userName, email, password, confirmPassword })
        })
        cy.get('div[role="alert"] div').should('be.visible').contains('Usuario registrado correctamente')
        cy.url().should('eq', 'http://localhost:3000/auth/login')
    })

    it('CREATE-2', () => {
        cy.fixture("register.json").then(({ invalidEmailRegister: { userName, email, password, confirmPassword } }) => {
            cy.registerUser({ userName, email, password, confirmPassword })
        })
        cy.get('div[role="alert"] div').should('be.visible').contains('Invalid Email')
        // cy.url().should('eq', 'http://localhost:3000/auth/login')
    })

    it('CREATE-3', () => {
        cy.fixture("register.json").then(({ differentPasswordRegister: { userName, email, password, confirmPassword } }) => {
            cy.registerUser({ userName, email, password, confirmPassword })
        })
        cy.get('div[role="alert"] div').should('be.visible').contains('Passwords do not match')
        // cy.url().should('eq', 'http://localhost:3000/auth/login')
    })
    it('CREATE-4', () => {
        cy.fixture("register.json").then(({ existUserNameRegister: { userName, email, password, confirmPassword } }) => {
            cy.registerUser({ userName, email, password, confirmPassword })
        })
        cy.get('div[role="alert"] div').should('be.visible').contains('Username already exists')
        // cy.url().should('eq', 'http://localhost:3000/auth/login')
    })
    it('CREATE-5', () => {
        cy.fixture("register.json").then(({ existEmailRegister: { userName, email, password, confirmPassword } }) => {
            cy.registerUser({ userName, email, password, confirmPassword })
        })
        cy.get('div[role="alert"] div').should('be.visible').contains('Email already exists')
        // cy.url().should('eq', 'http://localhost:3000/auth/login')
    })
    it.only('CREATE-6', () => {
        cy.get('button[type="submit"]').click()
        cy.get('[data-test="usernameError"]').should('be.visible').contains('Username is required')
        cy.get('[data-test="emailError"]').should('be.visible').contains('Email is required')
        cy.get('[data-test="passwordError"]').should('be.visible').contains('Password is required')
        cy.get('[data-test="confirmPasswordError"]').should('be.visible').contains('Confirm password is required')
    })
})