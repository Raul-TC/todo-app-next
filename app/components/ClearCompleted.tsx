'use client'
import { SetStateAction } from 'react'
import { Modal } from './Modal'

interface ClearCompletedProps {
    modal: boolean,
    setModal: React.Dispatch<SetStateAction<boolean>>,
    tasksDone: {
        id: number,
        userId: string,
        content: string,
        isDone: boolean,
        isNew: boolean,
        createdAt: Date,
        updatedAt: Date
    }[] | null | undefined
}
export const ClearCompleted = ({ modal, setModal, tasksDone }: ClearCompletedProps) => {
    // const { modal, setModal, tasksDone } = useTaskProvider()

    if (!tasksDone) return
    return (
        <>
            {
                tasksDone.length > 0 && <p className={`dark:md:hover:text-gray-200 md:hover:text-gray-800 transition-colors duration-300 ease-in cursor-pointer text-base animate-tasksAnimate md:hover:font-bold`}
                    onClick={() => setModal(!modal)}>Clear Completed</p>

            }
            {modal && <Modal setModal={setModal} type='all' />}
        </>
    )
}
