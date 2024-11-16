'use client'
import { DraggableList } from './DraggableList'
import { StatusCount } from './StatusCount'
import { StatusTask } from './StatusTask'
import { ClearCompleted } from './ClearCompleted'
import { Task } from '@prisma/client'
import { useEffect, useState } from 'react'
import { Session } from 'next-auth'
import { useTasksStore } from '../stores/tasksStore'
import TaskSkeleton from './SkeletonTasks'


export const TodoList = ({ session, tasks }: { session: Session, tasks: Task[] }) => {
    const setUser = useTasksStore((state) => state.setUserId);
    const setTasks = useTasksStore((state) => state.setTasks);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setUser(session.user);
        setTasks(tasks);
        setIsLoading(false);
    }, [session, tasks]);

    return (
        <section className={`dark:bg-darkBg dark:text-textDark bg-lightBg text-textLight transition-colors duration-300 ease-in min-h-[calc(100vh-304px)] w-[90%] md:w-full max-w-4xl h-full mx-auto pb-24`} >
            <div className='dark:bg-containerDark dark:text-textDark bg-bodyLight text-textLight w-full mx-auto flex items-center rounded-md justify-center flex-col h-full transition-colors duration-300 ease-in max-w-2xl' >
                {isLoading ? (
                    <TaskSkeleton />
                ) : (
                    <DraggableList tasksServer={tasks} />
                )}
                <div className='dark:bg-containerDark dark:text-textOpacity bg-containerLight w-full h-full m-auto flex rounded-b-md items-center justify-between p-4 text-base transition-colors duration-300 ease-in overflow-hidden border-t-[.15px]'>
                    <StatusCount />
                    <div className='w-full mt-4 py-4 items-center justify-center m-auto rounded-md hidden lg:flex md:w-auto md:m-0 md:self-center text-textLight transition-colors duration-300 ease-in'>
                        <StatusTask />
                    </div>
                    <ClearCompleted />
                </div>
            </div>
            <div className='dark:bg-containerDark dark:text-textDark bg-containerLight text-textLight w-full flex mt-4 py-4 items-center justify-center m-auto rounded-md mb-8 md:py-5 lg:hidden transition-colors duration-300 ease-in max-w-2xl' >
                <StatusTask />
            </div >

            <p className='text-center md:mt-8'>Drag and drop to reorder list</p>
        </section >
    )
}
