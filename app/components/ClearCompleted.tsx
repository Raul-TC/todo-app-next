'use client'
import { useTaskProvider } from '../hooks/useTaskProvider'
import { Modal } from './Modal'

export const ClearCompleted = () => {
    const { modal, setModal, tasksDone } = useTaskProvider()
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
