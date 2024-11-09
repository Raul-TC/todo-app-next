'use client'
import Image from 'next/image'
import sun from '@/public/icon-sun.svg'
import moon from '@/public/icon-moon.svg'
import { useThemeProvider } from '../hooks/useThemeProvider'

export const DarkMode = () => {
    const { darkTheme, handleTheme } = useThemeProvider()

    return (
        <Image onClick={handleTheme} className='md:cursor-pointer' src={darkTheme ? sun : moon} width={30} height={20} alt='icon_moon_darkMode' />
    )
}
