import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
// import db from "@/libs/db";
// import { User } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/libs/db";
import { User } from "@prisma/client";
// import authConfig from "./auth.config";
export const { handlers, signIn, signOut, auth } = NextAuth({
    // adapter: PrismaAdapter(db),
    providers: [
        // GithubProvider({
        //     clientId: process.env.GITHUB_CLIENT_ID as string,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        // }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials) {
                try {
                    console.log(credentials, 'CREDENTIALS')
                    if (!credentials || !credentials.email || !credentials.password) {
                        throw new Error('Por favor, ingresa el correo y la contraseña');
                    }
                    if (
                        !credentials ||
                        typeof credentials.email !== 'string' ||
                        typeof credentials.password !== 'string'
                    ) {
                        throw new Error('Invalid credentials');
                    }

                    const userFound = await db.user.findUnique({
                        where: {
                            email: credentials?.email
                        }
                    }) as User | null;

                    if (!userFound) {
                        throw new Error('User no found')
                    }
                    if (!userFound.password) {
                        throw new Error('Password incorrect')
                    }

                    const matchPassword = await bcrypt.compare(credentials?.password, userFound?.password)

                    if (!matchPassword) throw new Error('Wrong password')

                    return {
                        id: userFound.id.toString(),
                        name: userFound.username,
                        email: userFound.email
                    }
                } catch (error) {
                    console.log(error)
                    return null
                    // throw new Error(error instanceof Error ? error.message : 'Error en la autenticación');

                }

            }
        })
    ],
    session: {
        strategy: "jwt", // Usar JWT para la sesión
    },
    pages: {
        signIn: "/auth/login"
    },
    callbacks: {
        // async redirect({ url, baseUrl }) {
        //     return baseUrl
        // },
        // Modificar la sesión para incluir el ID del usuario
        async session({ session, token }) {
            if (token) {
                session.user.id = token.sub as string; // sub es el user ID en el token
                console.log('Session ID:', session.user.id);  // Verifica si ID está presente

            }
            return session;
        },
        // Agrega el ID del usuario en el token
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id; // sub es el campo que se usa para el ID en el token
            }
            return token;
        }
    },
})
