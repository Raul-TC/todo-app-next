'use client'
import { Task } from '@prisma/client'

interface StatusCountProps {
    tasks: {
        allTasks: Task[] | null,
        pendingTasks?: Task[] | null,
        completedTasks?: Task[] | null,
    },
    current: string
}
export const StatusCount = ({ tasks, current }: StatusCountProps) => {
    // const { dbTasks, tasksDone, pendingTask, current } = useTaskProvider()
    if (!tasks.allTasks || !tasks.pendingTasks || !tasks.completedTasks) return

    const list = [{ current: 'all', type: tasks.allTasks.length }, { current: 'active', type: tasks.pendingTasks.length }, { current: 'completed', type: tasks.completedTasks.length }]

    return (
        <>
            {
                list.map(el =>
                    <p key={el.current}
                        className={`text-inherit ${current === el.current ? 'block' : 'hidden'} capitalize`}>
                        {el.current} ({el.type})
                    </p>
                )
            }
        </>
    )
}
