'use client'
import { useTaskProvider } from '../hooks/useTaskProvider'

export const StatusCount = () => {
    const { dbTasks, tasksDone, pendingTask, current } = useTaskProvider()
    const list = [{ current: 'all', type: dbTasks.length }, { current: 'active', type: pendingTask.length }, { current: 'completed', type: tasksDone.length }]

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
