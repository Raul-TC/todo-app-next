'use client'
import { createContext, useState, useEffect } from "react"

const taskContext = createContext()
const TaskProvider = ({ children }) => {
    let localComments
    if (typeof window !== "undefined") {
        localComments = JSON.parse(localStorage.getItem('dbTasks'))
    }

    const [dbTasks, setDbTasks] = useState(localComments === null || localComments === undefined ? [] : localComments)
    const [tasksDone, setTasksDone] = useState([])
    const [pendingTask, setPendingTask] = useState([])
    const [current, setCurrent] = useState('all')
    const [classDrag, setclassDrag] = useState('animate-tasksAnimate')

    useEffect(() => {
        const done = []
        const pending = []
        dbTasks.map(el => el.isDone === true ? done.push(el) : pending.push(el))

        setPendingTask(pending)
        setTasksDone(done)
        if (typeof window !== "undefined") localStorage.setItem("dbTasks", JSON.stringify(dbTasks))

    }, [dbTasks])

    const handleAddTask = (task) => {
        const newTask = {
            id: crypto.randomUUID(),
            content: task,
            isDone: false
        }
        setDbTasks([newTask, ...dbTasks])
    }

    const handleDeleteTask = (id, type) => type === 'all' ? setDbTasks(dbTasks.filter(el => el.isDone !== true)) : setDbTasks(dbTasks.filter(el => el.id !== id))



    const handleUpdateTask = (id, status, type, content) => {

        if (type === 'done') {
            let update = dbTasks.map(el => el.id === id ? { ...el, isDone: status } : el)

            setDbTasks(update)
        } else {
            let updateText = dbTasks.map(el => el.id === id ? { ...el, content: content, isDone: false } : el)

            setDbTasks(updateText)
        }


    }
    const getFilter = () => {
        if (current === 'all' || current === '') return dbTasks

        if (current === 'active') return pendingTask

        if (current === 'completed') return tasksDone
    }

    const filteredData = getFilter()



    const reorderData = (list, startIndex, endIndex) => {
        const result = [...list]

        const [removed] = result.splice(startIndex, 1)

        result.splice(endIndex, 0, removed)

        return result
    }


    const handleUpdateDragAndDrop = result => {
        const { destination, source } = result

        if (!destination) return

        if (source.index === destination.index && source.droppableId === destination.droppableId) return

        current === 'all' && setDbTasks(prevTasks => reorderData(prevTasks, source.index, destination.index))
        current === 'active' && setPendingTask(prevTasks => reorderData(prevTasks, source.index, destination.index))
        current === 'completed' && setTasksDone(prevTasks => reorderData(prevTasks, source.index, destination.index))

        setclassDrag('animate-tasksAnimate')
    }

    // if (typeof window !== "undefined") localStorage.setItem("dbTasks", JSON.stringify(dbTasks))

    const data = { dbTasks, classDrag, setclassDrag, handleUpdateDragAndDrop, handleAddTask, handleDeleteTask, handleUpdateTask, tasksDone, setTasksDone, pendingTask, setPendingTask, current, setCurrent, filteredData }
    return (<taskContext.Provider value={data}>
        {children}
    </taskContext.Provider>)
}

export { TaskProvider }
export default taskContext