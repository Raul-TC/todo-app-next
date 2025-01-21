import React, { Dispatch, SetStateAction } from 'react'
import { useTasksStore } from '../stores/tasksStore'
import { crudActions } from '../hooks/crudActions'
interface ModalProps {
    id?: number,
    type: string,
    // setModal?: Dispatch<SetStateAction<boolean>>,
    setModal?: Dispatch<SetStateAction<{
        task: string,
        taskEdited: string,
        isCheck: boolean,
        isEditable: boolean,
        tries: number,
        modalInTask: boolean,
        timePassed: { text: string, time: number }
    }>>
}
export const Modal = ({ id, type, setModal }: ModalProps) => {
    const deleteTasks = useTasksStore(state => state.deleteTask)
    // const userId = useTasksStore((state) => state.userId);
    const tasksCompleted = useTasksStore((state) => state.tasksDone);
    const { deleteTask } = crudActions()
    const setDeleteAllModal = useTasksStore((state) => state.setModal);

    return (
        <div className='bg-[#2c2c2c9f] fixed z-50 top-0 left-0 h-[100vh] w-full flex items-center justify-center'>
            <div
                data-test='modalDelete'
                className='dark:bg-containerDark dark:text-textDark bg-containerLight text-textLight absolute rounded-2xl flex flex-col items-center justify-center p-7 w-[90%] md:w-1/2 md:max-w-md'>
                <h1 className='text-3xl font-bold'>{type === 'one'
                    ? 'Delete Task'
                    : `Delete  Tasks`}</h1>
                <p className='text-center'>
                    {type === 'one'
                        ? "Are you sure you want to delete this take? This will delete the task and cannot be undone."
                        : `Are you sure you want to delete ${tasksCompleted.length}  completed tasks? This will delete the tasks and cannot be undone.`
                    }
                </p>
                <div className='flex justify-between w-full gap-3 mt-3'>
                    <button
                        data-test='noCancel'
                        className='text-base font-bold p-3 rounded-md cursor-pointer w-2/3 bg-gray-600 hover:bg-opacity-75 text-white'
                        onClick={() => {
                            if (type === 'one') {
                                if (setModal) {
                                    setModal(prevState => ({ ...prevState, modalInTask: !prevState.modalInTask }));
                                }
                            } else {
                                setDeleteAllModal(false)
                            }
                        }}>
                        NO, CANCEL
                    </button>
                    <button
                        data-test='yesDelete'
                        className='text-base font-bold p-3 rounded-md cursor-pointer w-2/3 bg-red-600 hover:bg-opacity-75 text-white'
                        onClick={async () => {
                            if (type === 'one') {
                                if (setModal) {
                                    setModal(prevState => ({ ...prevState, modalInTask: !prevState.modalInTask }));
                                    const itemDelete = await deleteTask({ idTask: id, type })
                                    deleteTasks(itemDelete.id)
                                }
                            } else {
                                setDeleteAllModal(false)
                                const itemsDeleted = await deleteTask({ type: 'all' })
                                console.log({ itemsDeleted })
                                deleteTasks()
                                // }
                            }
                        }
                        }
                    >
                        YES, DELETE
                    </button>
                </div>
            </div>

        </div >)
}
