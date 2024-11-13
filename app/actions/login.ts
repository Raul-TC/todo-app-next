"use server"

import { signIn } from "@/auth";
import { signInSchema } from "@/libs/zod";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const Login = async (data: z.infer<typeof signInSchema>) => {

    console.log('VERIFICANDO EN USE SERVER')
    const validateFields = signInSchema.safeParse(data)

    if (!validateFields.success) {
        // toast.error(`❌ Invalid Fields`);
        return ({ error: 'Invalid Fields' })
    }

    const { email, password } = validateFields.data
    try {
        await signIn('credentials', {
            email: email,
            password: password,
            redirect: false,
        })

        // toast.success('HOLII')
        revalidatePath('/')
        return { success: true }
    }

    catch (error) {
        if (error instanceof AuthError) {
            console.log({ error }, 'TYPEE')
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials", text: error.message }

                default:
                    return { error: 'Something went wrong' }
            }
        }
    }

}