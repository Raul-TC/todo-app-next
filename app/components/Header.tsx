'use client'
import Image from "next/image"
import { FormInput } from "./FormInput"
import { useTaskProvider } from "../hooks/useTaskProvider"
import sun from '@/public/icon-sun.svg'
import moon from '@/public/icon-moon.svg'
export const Header = () => {
    const { darkTheme, handleTheme } = useTaskProvider()
    return (
        <header className='dark:bg-mobileDark dark:md:bg-desktopDark bg-mobileLight md:bg-desktopLight transition-colors duration-300 ease-in bg-cover bg-no-repeat min-h-[20vh] w-full flex flex-col items-center' >
            <div className='flex flex-col justify-between items-center w-[90%] mt-12 md:max-w-2xl mb-12' >
                <div className='flex justify-between items-center w-full mb-4 '>
                    <h1 className='tracking-[.5rem] text-3xl md:text-4xl text-containerLight font-bold'>TODO APP TS</h1>
                    <Image onClick={handleTheme} className='md:cursor-pointer' src={darkTheme ? sun : moon} width={30} height={20} alt='icon_moon_darkMode' />
                </div >
                <FormInput isNewTask={false} id={""} />
            </div >
        </header >)
}
