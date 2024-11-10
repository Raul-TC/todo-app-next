import NextAuth, { DefaultSession } from "next-auth";
import { User as UserModel } from '@prisma/client'
declare module "next-auth" {
    interface Session {
        user: {
            id?: string;  // O string, según tu modelo de datos
            name?: string | null;
            email?: string | null;
            // otras propiedades de usuario que tengas
        } & DefaultSession["user"];
    }

    interface User {
        id: number,
        name: string,
        email: string
    }
}
