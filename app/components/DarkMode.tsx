'use client'
import Image from 'next/image'
import sun from '@/public/icon-sun.svg'
import moon from '@/public/icon-moon.svg'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const DarkMode = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false)

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }
    return (
        <Image onClick={toggleTheme} className='md:cursor-pointer' src={theme ? sun : moon} width={30} height={20} alt='icon_moon_darkMode' />
    )
}
