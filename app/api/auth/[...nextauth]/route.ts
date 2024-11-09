
// @ts-nocheck
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import db from '@/libs/db'
import bcrypt from 'bcrypt'
import { User } from "next-auth";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { NextAuthOptions } from "next-auth";

interface CustomUser extends User {
    id: number;  // O el tipo adecuado para tu 'id'
}

interface CustomSession extends Session {
    user: CustomUser;
}

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined) {
                console.log(credentials, 'CREDENTIALS')
                if (!credentials) throw new Error('No credentials provided');

                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })

                if (!userFound) throw new Error('User no found')

                const matchPassword = await bcrypt.compare(credentials?.password, userFound?.password)

                if (!matchPassword) throw new Error('Wrong password')

                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email
                } as CustomUser
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
        async session({ session, token }: { session: Session, token: JWT }) {
            if (token) {
                (session.user as CustomUser).id = token.sub; // sub es el user ID en el token
                console.log('Session ID:', session.user.id);  // Verifica si ID está presente

            }
            return session;
        },
        // Agrega el ID del usuario en el token
        async jwt({ token, user }: { token: JWT, user?: User }) {
            if (user) {
                token.sub = user.id; // sub es el campo que se usa para el ID en el token
            }
            return token;
        }
    }
}

const handler = NextAuth(authOptions)


export { handler as GET, handler as POST }