'use client'
import { closestCenter, DndContext } from '@dnd-kit/core'
import { useTaskProvider } from '../hooks/useTaskProvider'
import { FormInput } from './FormInput'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { useEffect, useState } from 'react'
import TaskSkeleton from './SkeletonTasks'
import { motion, Variants } from 'framer-motion'
export const DraggableList = () => {
    const { filteredData, current, handleUpdateDragAndDrop } = useTaskProvider()
    const hasTasks = filteredData.length > 0;
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (filteredData.length > 0) {
            setIsLoading(false)
        }
    }, [filteredData])

    if (isLoading) {
        return <TaskSkeleton />
    }

    if (!hasTasks) {
        return (
            <div className="dark:bg-containerDark bg-containerLight divide-y-[0.15px] dark:text-textDark -mt-[36px] rounded-t-md overflow-hidden text-textLight w-full max-w-4xl transition-colors duration-300 ease-in flex flex-col items-center justify-between">
                <p className='py-4 text-center w-full h-full'>
                    {`${current === 'completed' ? 'No has completado ninguna tarea 🥹' : '✍🏻 Agrega una nueva tarea '}`}
                </p>
            </div>
        )
    }
    const variantOnViewContainer: Variants = {
        offscreen: {
            y: '-100',
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
        <>
            {
                // !hasTasks ?
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleUpdateDragAndDrop}
                    modifiers={[restrictToVerticalAxis]}
                >
                    <motion.div
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={variantOnViewContainer}
                        /* <motion.div */

                        className={`dark:bg-containerDark bg-containerLight divide-y-[0.15px] dark:text-textDark -mt-[36px] rounded-t-md overflow-hidden text-textLight w-full max-w-4xl transition-colors duration-300 ease-in flex flex-col items-center justify-between`}>
                        <SortableContext
                            items={filteredData.map(item => item.id!)}
                            strategy={verticalListSortingStrategy}
                        >
                            {filteredData.map((tsk) => (
                                <FormInput
                                    key={tsk.id}
                                    isNewTask id={tsk.id}
                                    updatedAt={tsk.updatedAt}
                                    isDone={tsk.isDone}
                                    content={tsk.content}
                                    isNew={tsk.isNew} />
                            )
                            )}
                        </SortableContext>
                    </motion.div>
                </DndContext>
                // :
                // <TaskSkeleton />
            }
        </>
    )
}
