'use client'
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core'
import { FormInput } from './FormInput'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { useCallback, useEffect, useMemo } from 'react'
import { motion, Variants } from 'framer-motion'
import { Task } from '@prisma/client'

interface DraggableListProps {
    tasks: {
        allTasks: Task[] | null,
        pendingTasks?: Task[] | null,
        completedTasks?: Task[] | null,
    },
    current: string,
    setInitialTasks: React.Dispatch<React.SetStateAction<
        {
            allTasks: Task[] | null,
            pendingTasks?: Task[] | null,
            completedTasks?: Task[] | null,
        }>>
}

export const DraggableList = ({ tasks, current, setInitialTasks }: DraggableListProps) => {
    const hasTasks = tasks.allTasks && tasks.allTasks.length > 0;
    // const [initialTasks, setInitialTasks] = useState(tasks)
    // const [tasksDone, setTasksDone] = useState<Task[]>([]);
    // const [pendingTask, setPendingTask] = useState<Task[]>([]);

    // if (!tasks.allTasks) return

    useEffect(() => {
        if (!tasks.allTasks) return
        const done: Task[] = tasks.allTasks.filter(el => el.isDone)
        const pending: Task[] = tasks.allTasks.filter(el => !el.isDone)

        setInitialTasks(prevState => ({
            ...prevState,
            pendingTasks: pending,
            completedTasks: done
        }))
    }, [current])

    const handleUpdateDragAndDrop = (e: DragEndEvent) => {
        const { active, over } = e;
        if (over && active.id !== over.id) {
            setInitialTasks(prevTasks => {
                const tasksArray = prevTasks.allTasks ? [...prevTasks.allTasks] : [];

                console.log({ tasksArray })
                const oldIndex = tasksArray.findIndex((item) => item.id === active.id);
                const newIndex = tasksArray.findIndex((item) => item.id === over.id);
                // return arrayMove(items, oldIndex, newIndex);

                const reorderedTasks = arrayMove(tasksArray, oldIndex, newIndex);
                return {
                    ...prevTasks,
                    allTasks: reorderedTasks,
                    pendingTasks: reorderedTasks.filter((task) => !task.isDone),
                    completedTasks: reorderedTasks.filter((task) => task.isDone),
                };
            });
        }
    };
    const getFilter = useCallback(() => {
        if (current === 'all' || current === '') return tasks.allTasks

        return current === 'active' ? tasks.pendingTasks : tasks.completedTasks

    }, [current, tasks])

    const filteredData = useMemo(() => getFilter(), [current, tasks, getFilter]);
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
                filteredData &&
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
                        /* <.div */

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
