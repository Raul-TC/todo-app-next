import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

interface LoginFormInputs {
    email: string,
    password: string
}

export const useLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const onSubmit = handleSubmit(async data => {
        setLoading(true)
        const resSignin = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })

        if (resSignin?.ok) {
            router.push('/')
            router.refresh()
            toast('Has iniciado sesión exitosamente')
        } else {
            toast.error(`❌ Hubo un problema al iniciar sesión`)
        }

        setLoading(false)

    })

    return { loading, register, onSubmit, errors }
}