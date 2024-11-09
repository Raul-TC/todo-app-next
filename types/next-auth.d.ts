import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id?: number;  // O string, según tu modelo de datos
            name?: string;
            email?: string;
            // otras propiedades de usuario que tengas
        } & DefaultSession["user"];
    }
}
