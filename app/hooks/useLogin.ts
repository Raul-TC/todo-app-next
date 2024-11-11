import { signIn } from "next-auth/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { signInSchema } from "@/libs/zod"
import { z } from 'zod'
import { AuthError } from "next-auth"
import { useRouter } from "next/navigation"
interface LoginFormInputs {
    email: string,
    password: string
}

export const useLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>()
    const router = useRouter()
    const [loading, setLoading] = useState(false)


    const onSubmit = handleSubmit(async (data: z.infer<typeof signInSchema>) => {

        const validateFields = signInSchema.safeParse(data)

        setLoading(true)
        if (!validateFields.success) {
            toast.error(`❌ Invalid Fields`);
            return ({ error: 'Invalid Fields' })
        }

        const { email, password } = validateFields.data

        try {
            const sign = await signIn('credentials', {
                email: email,
                password: password,
                redirect: false,
            })

            if (sign?.error) {

                // console.log('FALLLLLLLLA')
                toast.error('❌ Wrong credentials');

            } else {
                router.push('/');
                toast.success('Iniciando Sesión')
                router.refresh();
            }
            return { succes: true }
        } catch (error) {
            if (error instanceof AuthError) {
                switch (error.type) {
                    case "CredentialsSignin":
                        return { error: "Invalid Credentials", }

                    default:
                        return { error: 'Something went wrong' }
                }
            }
        } finally {
            setLoading(false)
        }



    })

    return { loading, register, onSubmit, errors }
}