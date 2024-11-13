'use client'
import { DraggableList } from './DraggableList'
import { StatusCount } from './StatusCount'
import { StatusTask } from './StatusTask'
import { ClearCompleted } from './ClearCompleted'
import { Task } from '@prisma/client'
import { useState } from 'react'

interface TodoListState {
    allTasks: Task[] | null,
    pendingTasks?: Task[] | null,
    completedTasks?: Task[] | null,
}
export const TodoList = ({ tasks }: { tasks: Task[] | null }) => {
    // const session = await auth()
    const [current, setcurrent] = useState('all')
    const [initialTasks, setInitialTasks] = useState<TodoListState>({
        allTasks: tasks,
        pendingTasks: [],
        completedTasks: []
    })
    const [modal, setModal] = useState(false)
    // console.log({ session }, 'TOODO LIST')
    return (<section className={`dark:bg-darkBg dark:text-textDark bg-lightBg text-textLight transition-colors duration-300 ease-in min-h-[calc(100vh-228px)] w-[90%] md:w-full max-w-4xl h-full mx-auto pb-24`} >
        <div className='dark:bg-containerDark dark:text-textDark bg-bodyLight text-textLight w-full mx-auto flex items-center rounded-md justify-center flex-col transition-colors duration-300 ease-in max-w-2xl' >
            <DraggableList tasks={initialTasks} current={current} setInitialTasks={setInitialTasks} />
            <div className='dark:bg-containerDark dark:text-textOpacity bg-containerLight w-full h-full m-auto flex rounded-b-md items-center justify-between p-4 text-base transition-colors duration-300 ease-in overflow-hidden border-t-[.15px]'>
                <StatusCount tasks={initialTasks} current={current} />
                <div className='w-full mt-4 py-4 items-center justify-center m-auto rounded-md hidden lg:flex md:w-auto md:m-0 md:self-center text-textLight transition-colors duration-300 ease-in'>
                    <StatusTask current={current} setCurrent={setcurrent} />
                </div>
                <ClearCompleted tasksDone={initialTasks.completedTasks} modal={modal} setModal={setModal} />
            </div>
        </div>
        <div className='dark:bg-containerDark dark:text-textDark bg-containerLight text-textLight w-full flex mt-4 py-4 items-center justify-center m-auto rounded-md mb-8 md:py-5 lg:hidden transition-colors duration-300 ease-in max-w-2xl' >
            <StatusTask current={current} setCurrent={setcurrent} />
        </div >

        <p className='text-center md:mt-8'>Drag and drop to reorder list</p>
    </section >
    )
}
