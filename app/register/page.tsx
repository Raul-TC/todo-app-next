'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface RegisterInputs {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}
export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputs>()
    const router = useRouter()
    const onSubmit = handleSubmit(async data => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(data.email)) {
            return toast.error("Invalid Email", { position: "bottom-left" })
        }
        if (data.password !== data.confirmPassword) {
            return toast.error("Passwords do not match", { position: "bottom-left" })
        }
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password
            })
        })

        const resp = await res.json()

        if (res.status === 400) {
            return toast.warning(`${resp.message}`, { position: "bottom-left" })
        }

        if (res.ok) {
            toast.success("Usuario registrado correctamente", {
                position: "bottom-left"
            })
            router.push('/auth/login')
        }
    })

    return (
        <div className='w-[90%] md:w-1/2 max-w-md mx-auto min-h-[calc(100vh-183px)] flex flex-col items-center justify-center'>
            <h1 className='text-center dark:text-textDark text-2xl md:text-4xl transition-colors ease-in duration-300'>Register</h1>
            <form onSubmit={onSubmit} className='flex flex-col gap-4 w-full my-4' noValidate>

                <input type="text"
                    {...register("username", {
                        required:
                            'Username is required'
                        ,
                    })}
                    className='bg-containerLight dark:bg-containerDark py-3 px-2 outline-none dark:text-textDark rounded-md transition-colors ease-in duration-300'
                    placeholder='Username'
                />
                {errors?.username && (
                    <span data-test='usernameError' className='text-red-500'>{errors.username.message}</span>
                )}
                <input type="email"
                    {...register("email", {
                        required:
                            // value: true,
                            'Email is required'

                    })}

                    className='bg-containerLight dark:bg-containerDark py-3 px-2 outline-none dark:text-textDark rounded-md transition-colors ease-in duration-300'
                    placeholder='Email'
                />
                {errors?.email && (
                    <span data-test='emailError' className='text-red-500'>{errors.email.message}</span>
                )}

                <input type="password"
                    {...register("password", { required: 'Password is required' })}
                    className='bg-containerLight dark:bg-containerDark py-3 px-2 outline-none dark:text-textDark rounded-md transition-colors ease-in duration-300'
                    placeholder='Password'
                />
                {errors?.password && (
                    <span data-test='passwordError' className='text-red-500'>{errors.password.message}</span>
                )}
                <input type="password"
                    {...register("confirmPassword", { required: 'Confirm password is required' })}
                    className='bg-containerLight dark:bg-containerDark py-3 px-2 outline-none dark:text-textDark rounded-md transition-colors ease-in duration-300'
                    placeholder='Confirm password'
                />
                {errors?.confirmPassword && (
                    <span data-test='confirmPasswordError' className='text-red-500'>{errors.confirmPassword.message}</span>
                )}

                <button type='submit' className='w-1/2 mx-auto font-bold dark:bg-containerDark py-3 rounded-md dark:text-textDark bg-containerLight border-darkBg text-textLight dark:hover:bg-darkBg hover:bg-textOpacity hover:text-textDark transition-colors duration-300 ease-in dark:hover:border-[0.5px] dark:hover:border-containerLight'>Send</button>
            </form>
        </div>
    )
}
