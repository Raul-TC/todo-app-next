'use client'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { MdModeEditOutline } from 'react-icons/md'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Modal } from './Modal'
import { useTask } from '../hooks/useTask'
import { animate, AnimatePresence, motion, Variants } from 'framer-motion'
interface FormInputProps {
    isNewTask?: boolean,
    id: number | undefined,
    isDone?: boolean,
    content?: string,
    isNew?: boolean,
    updatedAt?: Date
}

export const FormInput = ({ isNewTask = true, id, isDone, content, isNew, updatedAt }: FormInputProps) => {
    const { task, setTaskState, taskEdited, isCheck, isEditable, tries, modalInTask, timePassed, handleChange, handleSubmit, handleChangeCheckbox } = useTask({ id, content, isDone, updatedAt })
    const { attributes, listeners, setNodeRef, transform } = useSortable({ id: id! });

    const style = {
        transform: CSS.Transform.toString(transform),
        touchAction: 'none'
    };
    const itemVariants: Variants = {
        offscreen: {
            y: -40,
            opacity: 0
        },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.3
            }
        }
    }
    return (
        <>
            {isNewTask
                ?
                <>
                    <AnimatePresence>
                        <div style={style} className='w-full'>

                            <motion.div
                                initial='initial'
                                animate='animate'
                                variants={itemVariants}
                                viewport={{ once: true, amount: 0.1 }}
                                ref={setNodeRef}
                                className={`dark:bg-containerDark ${isNew ? 'animate-tasksAnimate' : ''}  dark:text-textDark bg-containerLight text-textLight w-full group flex items-center transition-colors duration-300 ease-in  justify-between gap-4 p-4`}>
                                <div className='flex items-center justify-center'>
                                    <input
                                        type='checkbox'
                                        checked={isCheck}
                                        id={id?.toString()}
                                        className={'hidden border-none outline-none'}
                                        onChange={handleChangeCheckbox}>
                                    </input>

                                    <label className={`${isCheck ? 'bg-bgCheck text-white' : 'border-[1px] border-gray-300'} w-6 h-6 rounded-full  flex items-center justify-center cursor-pointer`}
                                        htmlFor={id?.toString()}>
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
                                            onSubmit={handleSubmit}>
                                            <input
                                                type="text"
                                                className='dark:bg-[#2f3041] dark:text-lightBg bg-lightBg w-full text-textLight text-base py-2 outline-none break-all px-3 rounded-md'
                                                autoFocus
                                                defaultValue={taskEdited === '' ? content : taskEdited}
                                                placeholder={content}
                                                onChange={e => {
                                                    if (e.target.value === taskEdited) {
                                                        setTaskState(prevState => ({ ...prevState, isEditable: false }))
                                                    }
                                                    setTaskState(prevState => ({ ...prevState, taskEdited: e.target.value }))
                                                }} />
                                        </form>

                                    </>
                                    :
                                    <>
                                        <div
                                            {...attributes}
                                            {...listeners}
                                            className='flex flex-col w-full break-all cursor-grab '>

                                            <p className={`${isCheck ? 'text-gray-400 line-through' : ''} text-start block text-base transition-colors duration-300 ease-in w-full`}>{content}</p>
                                            <span className='text-xs text-textOpacity'>{timePassed.text !== '' ? timePassed.text : '⏱️'}</span>
                                        </div>

                                    </>
                                }
                                <div className='flex items-center justify-center h-full gap-2 flex-none'>
                                    {isEditable ?
                                        <AiOutlineCheck onClick={handleSubmit} className='block text-xl md:group-hover:cursor-pointer transition-colors duration-300 ease-in cursor-pointer' />
                                        :
                                        <MdModeEditOutline className='md:opacity-0 w-10 p-2 md:hover:text-blue-400 md:group-hover:opacity-100 h-full md:group-hover:cursor-pointer transition-colors duration-300 ease-in cursor-pointer'
                                            onClick={() => {
                                                setTaskState(prevState => ({ ...prevState, isEditable: true, task: content! }))
                                            }} />
                                    }
                                    <AiOutlineClose
                                        onClick={() => setTaskState(prevState => ({ ...prevState, modalInTask: true }))
                                        }
                                        className='md:opacity-0 md:group-hover:opacity-100 h-full w-10 p-2 md:hover:text-red-400 md:group-hover:cursor-pointer transition-colors duration-300 ease-in text-xl cursor-pointer'
                                    />
                                </div>
                            </motion.div >
                        </div>
                    </AnimatePresence>
                </>
                :
                <>
                    <form
                        onSubmit={handleSubmit}
                        className='dark:bg-containerDark dark:text-textDark bg-containerLight text-textLight w-full flex items-center justify-between rounded-md overflow-hidden transition-colors duration-300 ease-in mb-8'
                    >
                        <input
                            type="text"
                            className='dark:bg-containerDark dark:text-textDark bg-containerLight text-base text-textLight py-4 px-3 w-[75%] outline-none transition-colors duration-300 ease-in'
                            onChange={handleChange}
                            value={task}
                            placeholder='Create a new task...' />
                        <button disabled={tries === 5} className={`mr-4 ${tries < 5 ? 'active:translate-y-1' : 'text-red-400'}  transition-colors duration-300 ease-in`} >
                            Add Task
                        </button>
                    </form>
                </>
            }
            {modalInTask && <Modal setModalInTask={setTaskState} type={'one'} id={id!} />}
        </>
    )
}
