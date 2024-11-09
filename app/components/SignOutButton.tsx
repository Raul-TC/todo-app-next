'use client'
import { Session } from 'next-auth'
import React from 'react'
import { IoIosExit } from 'react-icons/io'
import { useLogout } from '../hooks/useLogout'

export const SignOutButton = ({ session }: { session: Session }) => {
    const { handleLogout } = useLogout()
    return (
        <div className='flex flex-col items-center border-l border-containerLight pl-2 cursor-pointer' onClick={() => handleLogout({ session })}>
            <IoIosExit className='dark:text-textDark text-containerLight text-2xl' />
            <button className="text-xl dark:text-textDark rounded-md text-containerLight" >Sign out</button>
        </div>)
}
