'use client'
import React, { useEffect, useState } from 'react'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { MdModeEditOutline } from 'react-icons/md'
import { useTaskProvider } from '../hooks/useTaskProvider'
import { toast } from 'react-toastify'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Modal } from './Modal'
interface FormInputProps {
    isNewTask?: boolean,
    id: string,
    isDone?: boolean,
    content?: string,
    isNew?: boolean,
}

export const FormInput = ({ isNewTask = true, id, isDone, content, isNew }: FormInputProps) => {
    const { handleAddTask, handleUpdateTask } = useTaskProvider()
    const [task, setTask] = useState<string | undefined>('');
    const [taskEdited, setTaskEdited] = useState<string | undefined>(content)
    const [isCheck, setIsCheck] = useState<boolean | undefined>(isDone)
    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [tries, setTries] = useState<number>(0)
    const [modalInTask, setModalInTask] = useState(false)

    const handleSubmit = ({ e }: { e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGElement> | React.KeyboardEvent<HTMLInputElement> }) => {
        e?.preventDefault()
        setTries(prevState => prevState + 1)

        if (task?.trim() === '' || task === '' || !task) {
            setTask('')
            toast.error("😡 No puedes agregar notas vacías", {
                position: "bottom-left"
            })
            return
        }

        if (isEditable) {
            console.log('me editoo')
            if (taskEdited !== content && taskEdited !== '') {
                setIsEditable(false)
                toast.success("Tarea Actualizada Correctamente", {
                    position: "bottom-left"
                })
                setIsCheck(false)
                handleUpdateTask({ id: id!, status: isCheck!, type: 'edit', content: taskEdited!, isNew: false })
            } else {
                setIsEditable(false)
            }
        }
        else {
            toast.success("Tarea agregada correctamente", {
                position: "bottom-left"
            })
            handleAddTask({ task })
            setTask('')
        }

    }

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        // transition,
        touchAction: 'none'
    };


    const handleChange = ({ e }: { e: React.ChangeEvent<HTMLInputElement> }) => {
        setTask(e.target.value)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTries(0)
        }, 10000);

        if (tries === 5) {
            toast.warning("No hagas spam!, espera 8 segundos para seguir agregando Tareas")
        }
        return () => clearTimeout(timer);

    }, [tries])

    // useEffect(() => , [isCheck])



    useEffect(() => {
        handleUpdateTask({ id: id!, status: isCheck!, type: 'done', content: content!, isNew: isNew! });
    }, [isCheck])


    return (
        <>
            {isNewTask
                ?
                <>
                    <div
                        ref={setNodeRef}
                        style={style}

                        className={`dark:bg-containerDark ${isNew ? 'animate-tasksAnimate' : ''}  dark:text-textDark bg-containerLight text-textLight w-full group flex items-center transition-colors duration-300 ease-in  justify-between gap-4 p-4`}>
                        <div className='flex items-center justify-center'>
                            <input
                                type='checkbox'
                                checked={isCheck}
                                id={id}
                                className={'hidden border-none outline-none'}
                                onChange={(e) => {
                                    e.stopPropagation()
                                    setIsCheck(!isCheck)
                                }}>
                            </input>

                            <label className={`${isCheck ? 'bg-bgCheck text-white' : 'border-[1px] border-gray-300'} w-6 h-6 rounded-full  flex items-center justify-center cursor-pointer`}
                                htmlFor={id}>
                                {
                                    <AiOutlineCheck className={` ${isCheck ? 'opacity-100' : ' opacity-0'} transition-all duration-300 ease-in text-sm border-[1px] w-full h-full border-lightBg rounded-full`} />
                                }
                            </label>
                        </div>

                        {isEditable
                            ?
                            <>
                                <form
                                    className=' dark:text-lightBg w-full text-textLight h-full text-sm outline-none break-all gap-2 overflow-hidden'
                                    onSubmit={(e) => handleSubmit({ e })}>
                                    <input
                                        type="text"
                                        className='dark:bg-[#2f3041] dark:text-lightBg bg-lightBg w-full text-textLight text-base py-2 outline-none break-all px-3 rounded-md'
                                        autoFocus
                                        defaultValue={taskEdited === '' ? content : taskEdited}
                                        placeholder={content}
                                        onChange={e => {
                                            if (e.target.value === taskEdited) {
                                                setIsEditable(false)
                                            }
                                            setTaskEdited(e.target.value)
                                        }} />
                                </form>
                                {/* <AiOutlineCheck onClick={(e) => handleSubmit({ e })} className='block text-xl md:group-hover:cursor-pointer transition-all duration-300 ease-in cursor-pointer' /> */}

                            </>
                            :
                            <>
                                <p
                                    {...attributes}
                                    {...listeners}
                                    className={`${isCheck ? 'text-gray-400 line-through' : ''} text-justify block break-all py-2 text-base w-full cursor-grab transition-colors duration-300 ease-in`}>
                                    {content}
                                </p>
                                {/* <MdModeEditOutline className='md:opacity-0 w-10 p-2 md:hover:text-blue-400 md:group-hover:opacity-100 h-full md:group-hover:cursor-pointer transition-colors duration-300 ease-in cursor-pointer'
                                    onClick={() => {
                                        setIsEditable(true)
                                        setTask(content)
                                    }} /> */}
                            </>
                        }

                        <div className='flex items-center justify-center h-full gap-2'>
                            {isEditable ?
                                <AiOutlineCheck onClick={(e) => handleSubmit({ e })} className='block text-xl md:group-hover:cursor-pointer transition-colors duration-300 ease-in cursor-pointer' />
                                :
                                <MdModeEditOutline className='md:opacity-0 w-10 p-2 md:hover:text-blue-400 md:group-hover:opacity-100 h-full md:group-hover:cursor-pointer transition-colors duration-300 ease-in cursor-pointer'
                                    onClick={() => {
                                        setIsEditable(true)
                                        setTask(content)
                                    }} />
                            }
                            <AiOutlineClose
                                onClick={() => {
                                    setModalInTask(true)
                                }
                                }
                                className='md:opacity-0 md:group-hover:opacity-100 h-full w-10 p-2 md:hover:text-red-400 md:group-hover:cursor-pointer transition-colors duration-300 ease-in text-xl'
                            />
                        </div>
                    </div >
                </>
                :
                <>
                    <form
                        onSubmit={(e) => handleSubmit({ e })}
                        className='dark:bg-containerDark dark:text-textDark bg-containerLight text-textLight w-full flex items-center justify-between rounded-md overflow-hidden transition-colors duration-300 ease-in mb-8'
                    >
                        <input
                            type="text"
                            className='dark:bg-containerDark dark:text-textDark bg-containerLight text-base text-textLight py-4 px-3 w-[75%] outline-none transition-colors duration-300 ease-in'
                            onChange={(e) => handleChange({ e })}
                            value={task}
                            placeholder='Create a new task...' />
                        <button disabled={tries === 5} className={`mr-4 ${tries < 5 ? 'active:translate-y-1' : 'text-red-400'}  transition-colors duration-300 ease-in`} >
                            Add Task
                        </button>
                    </form>

                </>
            }
            {modalInTask && <Modal setModalInTask={setModalInTask} type={'one'} id={id} />}

        </>
    )
}
