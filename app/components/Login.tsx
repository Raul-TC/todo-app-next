'use client'
import Link from "next/link"
import { useLogin } from "../hooks/useLogin"
import { useTasksStore } from "../stores/tasksStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const Login = () => {
    const getUserId = useTasksStore(store => store.userId)
    const { loading, register, onSubmit, errors } = useLogin()
    const router = useRouter()

    useEffect(() => {
        if (getUserId?.id) {
            router.push('/');
        }
    }, [getUserId?.id, router]);

    return (
        <div className='w-[90%] md:w-1/2 max-w-md mx-auto min-h-[calc(100dvh-148px)] flex flex-col items-center justify-center'>
            <h1 className='text-center dark:text-textDark text-2xl md:text-4xl transition-colors ease-in duration-300'>Sign In</h1>
            <form onSubmit={onSubmit} className='flex flex-col gap-4 w-full mx-auto my-4'>

                <input type="email"
                    {...register("email", {
                        required:
                            'Email is required'
                        ,
                    })}
                    className='bg-containerLight dark:bg-containerDark py-3 px-2 outline-none dark:text-textDark rounded-md transition-colors duration-300 ease-in'
                    placeholder='Email'
                />
                {errors?.email && (
                    <span data-test='errorEmail' className='text-red-500'>{errors.email.message}</span>
                )}

                <input type="password"
                    {...register("password", { required: 'Password is required' })}
                    className='bg-containerLight dark:bg-containerDark py-3 px-2 outline-none dark:text-textDark rounded-md transition-colors duration-300 ease-in'
                    placeholder='Password'
                />
                {errors?.password && (
                    <span data-test='errorPassword' className='text-red-500'>{errors.password.message}</span>
                )}

                <button disabled={loading} type='submit' className='w-1/2 mx-auto font-bold dark:bg-containerDark py-3 rounded-md dark:text-textDark bg-containerLight border-darkBg text-textLight dark:hover:bg-darkBg hover:bg-textOpacity hover:text-textDark transition-colors duration-300 ease-in dark:hover:border-[0.5px] dark:hover:border-containerLight'>{loading ? 'Loading...' : 'Send'}</button>
            </form>

            {loading && (
                <div className="flex justify-center items-center mt-4">
                    <div className="w-8 h-8 border-4 border-t-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <div className="flex items-center justify-center w-[80%] mx-auto gap-4">
                <span className="h-[2px] dark:bg-containerLight bg-containerDark w-full transition-colors duration-300 ease-in"></span>
                <h2 className="text-center flex-none text-textLight hover:text-textOpacity dark:text-textDark transition-colors duration-300 ease-in my-2">New to my App?</h2>
                <span className="h-[2px] dark:bg-containerLight bg-containerDark w-full transition-colors duration-300 ease-in"></span>
            </div>
            <Link href='/register' className='block  text-center w-1/2 mx-auto font-bold dark:bg-containerDark dark:hover:bg-darkBg dark:hover:border-[0.5px] dark:hover:border-containerLight py-3 rounded-md dark:text-textDark bg-containerLight border-darkBg text-textLight hover:bg-textOpacity hover:text-textDark transition-colors duration-300 ease-in'>Create your Account</Link>
        </div>
    )
}
