import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { signInSchema } from "@/libs/zod"
import { z } from 'zod'
import { useRouter } from "next/navigation"
import { Login } from "../actions/login"
interface LoginFormInputs {
    email: string,
    password: string
}

export const useLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>()
    const router = useRouter()
    const [loading, setLoading] = useState(false)


    const onSubmit = handleSubmit(async (data: z.infer<typeof signInSchema>) => {
        setLoading(true)

        try {
            const response = await toast.promise(Login(data), {
                pending: 'Iniciando Sesión'
            })

            if (!response?.success) {
                throw new Error(`${response?.error}`)
            }
            if (!response.error) {
                toast('Sesion Iniciada Correctamente')
                router.push('/');
                router.refresh()
            }

        } catch (error) {
            toast.error(`${error}`)
        } finally {
            setLoading(false)
        }

    })

    return { loading, register, onSubmit, errors }
}