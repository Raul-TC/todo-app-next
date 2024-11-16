'use client'
import { useTasksStore } from '../stores/tasksStore'

export const StatusCount = () => {
    // const { dbTasks, tasksDone, pendingTask, current } = useTaskProvider()
    const tasks = useTasksStore(state => state.dbTasks)
    const tasksDone = useTasksStore(state => state.pendingTask)
    const tasksPending = useTasksStore(state => state.tasksDone)
    const current = useTasksStore(state => state.current)

    if (!tasks || !tasksDone || !tasksPending) return

    const list = [{ current: 'all', type: tasks.length }, { current: 'active', type: tasksPending.length }, { current: 'completed', type: tasksDone.length }]

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
