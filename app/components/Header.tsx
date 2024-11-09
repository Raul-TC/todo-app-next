import { FormInput } from "./FormInput"
import { DarkMode } from "./DarkMode"
import { getServerSession } from "next-auth/next"
import { SignOut } from "./SignOut"
import { Session } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import Link from "next/link"
export const Header = async () => {
    const session: Session | null = await getServerSession(authOptions)
    return (
        <header className='dark:bg-mobileDark dark:md:bg-desktopDark bg-mobileLight md:bg-desktopLight transition-colors duration-300 ease-in bg-cover bg-no-repeat min-h-[20vh] w-full flex flex-col items-center' >
            <div className='flex flex-col justify-between items-center w-[90%] md:w-full mt-12 max-w-2xl mb-12' >
                <div className='flex justify-between items-center w-full mb-4 '>
                    <Link href='/'>
                        <h1 className='tracking-[.5rem] text-3xl md:text-4xl text-containerLight font-bold'>TODO APP</h1>
                    </Link>
                    <DarkMode />
                </div >
                <div className="flex items-center justify-center w-full my-2">
                    {session?.user.id && <SignOut session={session} />}
                </div>
                {session?.user.id && <FormInput isNewTask={false} id={undefined} />}
            </div >
        </header >)
}
