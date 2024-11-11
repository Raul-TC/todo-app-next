import { object, string } from 'zod'


export const signInSchema = object({
    // username: string({ required_error: "username is required" }).min(2, "username is required"),
    email: string({ required_error: "email is required" }).min(2, "Email is required").email('Invalid email'),
    password: string({ required_error: 'Password is required' }).min(1, 'Password is required')
})