import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/libs/db";
import { User } from "@prisma/client";
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials) {
                try {
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
        async session({ session, token }) {
            if (token && token.sub) {
                session.user = { ...(session.user || {}), id: token.sub }; // Agregar el ID al usuario
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        }
    },
})
