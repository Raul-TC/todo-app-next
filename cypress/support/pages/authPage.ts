import { authSelectors, homeSelectors, sharedSelectors } from "../../selectors"
import { utils } from "../utils"

class AuthPage {

    loginUser({ email, password }: { email: string, password: string }) {
        utils.typeText({ selector: authSelectors.emailInput, text: email })
        utils.typeText({ selector: authSelectors.passwordInput, text: password })
        utils.click({ selector: sharedSelectors.submitButton })

    }

    registerUser({ userName, email, password, confirmPassword }: { userName: string, email: string, password: string, confirmPassword: string }) {
        utils.typeText({ selector: authSelectors.userNameInput, text: userName })
        utils.typeText({ selector: authSelectors.emailInput, text: email })
        utils.typeText({ selector: authSelectors.passwordInput, text: password })
        utils.typeText({ selector: authSelectors.confirmPasswordInput, text: confirmPassword })
        utils.click({ selector: sharedSelectors.submitButton })
    }

    validateToastLoginSuccess() {
        utils.elementContains({ selector: sharedSelectors.toastContainer, text: authSelectors.toastPendingLogin })
        utils.elementNotContains({ selector: sharedSelectors.toastContainer, text: authSelectors.toastPendingLogin })
        utils.elementContains({ selector: sharedSelectors.toastContainer, text: authSelectors.toastSuccessLogin })
        utils.urlContains({ url: sharedSelectors.homePageUrl })
        utils.elementIsVisible({ selector: homeSelectors.homePageText })
    }

    validateToastInvalidLogin() {
        utils.elementContains({ selector: sharedSelectors.toastContainer, text: authSelectors.toastPendingLogin })
        utils.elementNotContains({ selector: sharedSelectors.toastContainer, text: authSelectors.toastPendingLogin })
        utils.elementContains({ selector: sharedSelectors.toastContainer, text: authSelectors.toastInvalidLogin })
    }

    validateToastEmptyLoginFields({ type }: { type: string }) {
        if (type === 'login') {
            utils.elementContains({ selector: authSelectors.errorEmailText, text: 'Email is required' })
            utils.elementContains({ selector: authSelectors.errorPasswordText, text: 'Password is required' })
        } else {
            utils.click({ selector: sharedSelectors.submitButton })
            utils.elementContains({ selector: authSelectors.errorUserNameText, text: 'Username is required' })
            utils.elementContains({ selector: authSelectors.errorEmailText, text: 'Email is required' })
            utils.elementContains({ selector: authSelectors.errorPasswordText, text: 'Password is required' })
            utils.elementContains({ selector: authSelectors.errorConfirmPasswordText, text: 'Confirm password is required' })
        }
    }

    sessionIntercept() {
        utils.setupIntercepts({ method: 'GET', url: '/api/auth/session', alias: 'session' })
    }

    validateRegister() {
        utils.elementContains({ selector: sharedSelectors.toastContainer, text: authSelectors.toastRegisterSuccess })
        utils.urlContains({ url: 'http://localhost:3000/auth/login' })
    }
    validateToastRegisterInvalidEmail() {
        utils.elementContains({ selector: sharedSelectors.toastContainer, text: authSelectors.toastRegisterInvalidEmail })
    }

    validateToastRegisterInvalidPassword() {
        utils.elementContains({ selector: sharedSelectors.toastContainer, text: authSelectors.toastRegisterPasswordsDoNotMatch })
    }
    validateToastRegisterInvalidUserName() {
        utils.elementContains({ selector: sharedSelectors.toastContainer, text: authSelectors.toastRegisterUserNameAlreadyExists })
    }
    validateToastRegisterEmailExists() {
        utils.elementContains({ selector: sharedSelectors.toastContainer, text: authSelectors.toastRegisterEmailAlreadyExists })
    }

}

export const authPage = new AuthPage()