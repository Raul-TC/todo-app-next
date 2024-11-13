// import type { NextAuthConfig } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import bcryptjs from 'bcryptjs'
// import { signInSchema } from "./libs/zod";
// import prisma from "./libs/db";


// export default {
//     providers: [
//         Credentials({
//             async authorize(credentials) {
//                 // try {
//                 const validateFields = signInSchema.safeParse(credentials)

//                 console.log(credentials, 'CREDENTIALS')
//                 if (!validateFields.success) {
//                     throw new Error('Por favor, ingresa el correo y la contraseña');
//                 }

//                 // if (
//                 //     !credentials ||
//                 //     typeof credentials.email !== 'string' ||
//                 //     typeof credentials.password !== 'string'
//                 // ) {
//                 //     throw new Error('Invalid credentials');
//                 // }
//                 const { email, password } = validateFields.data

//                 // if (validateFields.success) {

//                 const userFound = await prisma.user.findUnique({
//                     where: {
//                         email: email
//                     }
//                 })

//                 console.log({ userFound })
//                 if (!userFound?.email || !userFound?.password) {
//                     throw new Error('Correo o contraseña incorrectos');
//                 }

//                 const matchPassword = await bcryptjs.compare(password, userFound?.password)

//                 console.log({ matchPassword })
//                 if (!matchPassword) {
//                     throw new Error('Correo o contraseña incorrectos');

//                 }

//                 // }
//                 return {
//                     id: userFound.id.toString(),
//                     name: userFound.username,
//                     email: userFound.email

//                 }
//                 // } catch (error) {
//                 // console.log(error)
//                 // return null
//                 // throw new Error(error instanceof Error ? error.message : 'Error en la autenticación');

//                 // }

//             }
//         })
//     ]
// } satisfies NextAuthConfig