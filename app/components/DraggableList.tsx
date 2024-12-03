'use client'
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core'
import { FormInput } from './FormInput'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { useTasksStore } from '../stores/tasksStore'
import { Task } from '@prisma/client'



export const DraggableList = ({ tasksServer }: { tasksServer: Task[] }) => {
    const tasks = useTasksStore(state => state.dbTasks)
    const pendingTasks = useTasksStore(state => state.pendingTask)
    const doneTasks = useTasksStore(state => state.tasksDone)
    const setPending = useTasksStore(state => state.setTasksPending)
    const setDone = useTasksStore(state => state.setTasksDone)
    const setTasks = useTasksStore(state => state.setTasks)
    const current = useTasksStore(state => state.current)
    const [isStoreReady, setIsFromStoreReady] = useState(false)
    useEffect(() => {
        if (tasks.length > 0) {
            setIsFromStoreReady(true)
        }

    }, [tasks])

    const taskToRender = isStoreReady ? tasks : tasksServer
    const handleUpdateDragAndDrop = useCallback((e: DragEndEvent) => {
        const { active, over } = e;
        if (over && active.id !== over.id) {
            const oldIndex = tasks.findIndex((item) => item.id === active.id);
            const newIndex = tasks.findIndex((item) => item.id === over.id);

            const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);
            const pendingTasksDrag = reorderedTasks.filter((task) => !task.isDone)
            const completedTasks = reorderedTasks.filter((task) => task.isDone)

            setTasks(reorderedTasks)
            setPending(pendingTasksDrag)
            setDone(completedTasks)
        }
    }, [taskToRender, setTasks, setPending, setDone])

    const getFilter = useCallback(() => {
        if (current === 'all') return taskToRender

        return current === 'active' ? taskToRender.filter(task => !task.isDone) : taskToRender.filter(task => task.isDone)

    }, [current, doneTasks, pendingTasks, taskToRender])

    const filteredData = useMemo(() => getFilter(), [getFilter])


    useEffect(() => {
        const done = taskToRender.filter(el => el.isDone)
        const pending = taskToRender.filter(el => !el.isDone)

        setPending(pending)
        setDone(done)
    }, [taskToRender, setPending, setDone])

    const variantOnViewContainer: Variants = {
        offscreen: {
            y: -100,
            opacity: 0
        },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.3,
                staggerChildren: 0.5
            }
        }
    }

    return (

        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleUpdateDragAndDrop}
            modifiers={[restrictToVerticalAxis]}
        >
            {filteredData.length === 0 ? (
                <div className="dark:bg-containerDark bg-containerLight divide-y-[0.15px] dark:text-textDark -mt-[36px] rounded-t-md overflow-hidden text-textLight w-full max-w-4xl transition-colors duration-300 ease-in flex flex-col items-center justify-between">
                    <p className='py-4 text-center w-full h-full'>
                        {`${current === 'completed' ? 'No has completado ninguna tarea 🥹' : '✍🏻 Agrega una nueva tarea '}`}
                    </p>
                </div>
            ) : (
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={variantOnViewContainer}
                    className="dark:bg-containerDark bg-containerLight divide-y-[0.15px] dark:text-textDark -mt-[36px] rounded-t-md overflow-hidden text-textLight w-full max-w-4xl transition-colors duration-300 ease-in flex flex-col items-center justify-between">
                    <SortableContext
                        items={filteredData.map(item => item.id!)}
                        strategy={verticalListSortingStrategy}
                    >
                        {filteredData.map((tsk) => (
                            <FormInput
                                key={tsk.id}
                                isNewTask
                                id={tsk.id}
                                updatedAt={tsk.updatedAt}
                                isDone={tsk.isDone}
                                content={tsk.content}
                                isNew={tsk.isNew} />
                        ))}
                    </SortableContext>
                </motion.div>
            )}
        </DndContext>

    )
}
