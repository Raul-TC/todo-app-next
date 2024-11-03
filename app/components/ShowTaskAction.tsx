import React from 'react'

interface SetStateActionProps {
    type: string,
    message: string
}
export const ShowTaskAction = ({ type, message }: SetStateActionProps) => {
    return (
        <div className={`text-bodyLight ${type === 'error' ? 'bg-red-500' : ''} ${type === 'add' ? 'bg-green-500' : ''} ${type === 'edit' ? 'bg-[#d3b530ea]' : ''} animate-tasksAnimate  transition-colors duration-300 ease-in px-4 py-2 rounded-md mb-0 w-full text-center`}>
            {message}
        </div>)
}
