'use client'
import { Modal } from './Modal'
import { useTasksStore } from '../stores/tasksStore'


export const ClearCompleted = () => {
    const tasksDone = useTasksStore((state) => state.tasksDone);
    const modal = useTasksStore((state) => state.modal);
    const setModal = useTasksStore((state) => state.setModal);

    if (!tasksDone) return
    return (
        <>
            {
                tasksDone.length > 0 && <p className={`dark:md:hover:text-gray-200 md:hover:text-gray-800 transition-colors duration-300 ease-in cursor-pointer text-base animate-tasksAnimate md:hover:font-bold`}
                    onClick={() => setModal(!modal)}>Clear Completed</p>
            }
            {modal && <Modal type='all' />}
        </>
    )
}
