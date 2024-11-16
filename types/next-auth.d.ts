import NextAuth, { DefaultSession } from "next-auth";
import { User as UserModel } from '@prisma/client'
declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            name?: string;
            email?: string;
        } & DefaultSession["user"];
    }

    interface User {
        id: number,
        name: string,
        email: string
    }
}
