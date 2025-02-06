export const authSelectors = {

    //Login
    titlePage: ({ type }: { type: string }) => type === 'login' ? 'Sign In' : 'Register',
    emailInput: 'input[name="email"]',
    passwordInput: 'input[name="password"]',
    toastPendingLogin: 'Iniciando Sesión',
    toastSuccessLogin: 'Sesion Iniciada Correctamente',
    toastInvalidLogin: 'Error: Invalid Credentials',
    //Register
    userNameInput: 'input[name="username"]',
    confirmPasswordInput: 'input[name="confirmPassword"]',
    errorEmailText: '[data-test="errorEmail"]',
    errorUserNameText: '[data-test="usernameError"]',
    errorPasswordText: '[data-test="errorPassword"]',
    errorConfirmPasswordText: '[data-test="confirmPasswordError"]',
    toastRegisterSuccess: 'Usuario registrado correctamente',
    toastRegisterInvalidEmail: 'Invalid Email',
    toastRegisterPasswordsDoNotMatch: 'Passwords do not match',
    toastRegisterUserNameAlreadyExists: 'Username already exists',
    toastRegisterEmailAlreadyExists: 'Email already exists',
}