import React, { Dispatch, SetStateAction } from 'react'
import { useTaskProvider } from '../hooks/useTaskProvider'
interface ModalProps {
    id?: string,
    type: string,
    setModal?: Dispatch<SetStateAction<boolean>>,
    setModalInTask?: Dispatch<SetStateAction<boolean>>
}
export const Modal = ({ id, type, setModal, setModalInTask }: ModalProps) => {
    console.log({ id, type })
    const { dbTasks, handleDeleteTask } = useTaskProvider()

    const lengthCompleted = dbTasks.filter(el => el.isDone === true)

    return (
        <div className='bg-[#2c2c2c9f] fixed z-50 top-0 left-0 h-[100vh] w-full flex items-center justify-center'>
            <div className='dark:bg-containerDark dark:text-textDark bg-containerLight text-textLight absolute rounded-2xl flex flex-col items-center justify-center p-7 w-[95%] md:max-w-md'>
                <h1 className='text-3xl font-bold'>{type === 'one'
                    ? 'Delete Task'
                    : `Delete ${lengthCompleted.length} Tasks`}</h1>
                <p>
                    {type === 'one'
                        ? "Are you sure you want to delete this take? This will delete the task and cannot be undone."
                        : `Are you sure you want to delete ${lengthCompleted.length} completed tasks? This will delete the tasks and cannot be undone.`}
                </p>
                <div className='flex justify-between w-full gap-3 mt-3'>
                    <button className='text-base font-bold p-3 rounded-md cursor-pointer w-2/3 bg-gray-600 text-white'
                        onClick={() => {
                            if (id) {
                                if (setModalInTask) {
                                    setModalInTask(false);
                                }
                            } else {
                                if (setModal) {
                                    setModal(false)
                                }
                            }
                        }}>
                        NO, CANCEL
                    </button>
                    <button
                        className='text-base font-bold p-3 rounded-md cursor-pointer w-2/3 bg-red-600 text-white'
                        onClick={() => {
                            if (id) {
                                if (setModalInTask) {
                                    setModalInTask(false);
                                }
                            } else {
                                if (setModal) {
                                    setModal(false)
                                }
                            }
                            handleDeleteTask({ id, type: id ? 'one' : 'all' });
                        }
                        }
                    >
                        YES, DELETE
                    </button>
                </div>
            </div>

        </div>)
}
