"use client"
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

interface Task {
    id: string;
    content: string;
    isDone: boolean;
    isNew: boolean
}

interface DeleteTaskParams {
    id?: string;
    type: 'one' | 'all';
}

interface TaskContextType {
    dbTasks: Task[];
    tasksDone: Task[];
    pendingTask: Task[];
    current: string;
    classDrag: string;
    setclassDrag: React.Dispatch<React.SetStateAction<string>>;
    handleAddTask: ({ task }: { task: string }) => void;
    handleDeleteTask: ({ id, type }: DeleteTaskParams) => void;
    handleUpdateTask: ({ id, status, type, content, isNew }: { id: string, status: boolean, type: string, content: string, isNew: boolean }) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleUpdateDragAndDrop: ({ e }: { e: DragEndEvent }) => void;
    setCurrent: React.Dispatch<React.SetStateAction<string>>;
    filteredData: Task[];
    darkTheme: boolean;
    handleTheme: () => void;
    // animateTask: boolean
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // let localComments
    // if (typeof window !== "undefined") {
    //     localComments = JSON.parse(localStorage.getItem('dbTasks'))
    // }
    const [dbTasks, setDbTasks] = useState<Task[]>([])

    const [tasksDone, setTasksDone] = useState<Task[]>([]);
    const [pendingTask, setPendingTask] = useState<Task[]>([]);
    const [current, setCurrent] = useState<string>('all');
    const [classDrag, setclassDrag] = useState<string>('animate-tasksAnimate');
    const [darkTheme, setDarkTheme] = useState<boolean>(false)

    useEffect(() => {
        const storedTasks = localStorage.getItem('dbTasks');

        const localComments = storedTasks ? JSON.parse(storedTasks) : [];
        setDbTasks(localComments);
    }, []);

    useEffect(() => {
        // const done = []
        // const pending = []
        // dbTasks.map(el => el.isDone === true ? done.push(el) : pending.push(el))

        // setPendingTask(pending)
        // setTasksDone(done)
        // if (typeof window !== 'undefined') localStorage.setItem('dbTasks', JSON.stringify(dbTasks))

        const done: Task[] = dbTasks.filter(el => el.isDone)
        const pending: Task[] = dbTasks.filter(el => !el.isDone)

        setTasksDone(done)
        setPendingTask(pending)

        if (dbTasks.length > 0 && typeof window !== 'undefined') {
            localStorage.setItem('dbTasks', JSON.stringify(dbTasks));
        }
    }, [dbTasks])

    useEffect(() => {
        if (localStorage.getItem('theme') === 'true') {
            setDarkTheme(true)
            document.documentElement.classList.add('dark')
        } else {
            setDarkTheme(false)
            document.documentElement.classList.remove('dark')
        }
    }, [])

    const handleTheme = useCallback(() => {
        // if (darkTheme) {
        //   setDarkTheme(false)
        //   document.documentElement.classList.remove('dark')
        //   localStorage.setItem('theme', false)
        // } else {
        //   setDarkTheme(true)
        //   localStorage.setItem('theme', true)
        //   document.documentElement.classList.add('dark')
        // }
        setDarkTheme(prevTheme => {
            const newTheme = !prevTheme
            localStorage.setItem('theme', newTheme.toString())
            document.documentElement.classList.toggle('dark', newTheme)
            return newTheme
        })
    }, [])



    const handleDeleteTask = useCallback(({ id, type }: DeleteTaskParams) => {
        console.log({ id, type })
        setDbTasks(prevTasks => type === 'all'
            ? prevTasks.filter(el => !el.isDone)
            : prevTasks.filter(el => el.id !== id)
        )
        toast.success("🚮 Tarea eliminada con exito", {
            position: "top-center"
        })
    }, [])

    const handleUpdateTask = useCallback(({ id, status, type, content, isNew }: { id: string, status: boolean, type: string, content: string, isNew: boolean }) => {
        // if (type === 'done') {
        //   const update = dbTasks.map(el => el.id === id ? { ...el, isDone: status } : el)

        //   setDbTasks(update)
        // } else {
        //   const updateText = dbTasks.map(el => el.id === id ? { ...el, content, isDone: false } : el)

        //   setDbTasks(updateText)
        // }
        console.log({ id, status, type, content, isNew })
        setDbTasks(prevTasks =>
            prevTasks.map(el =>
                el.id === id
                    ? {
                        ...el,
                        isDone: type === 'done' ? status : false,
                        ...(type !== 'done' && { content }), // Solo actualiza `content` si no es 'done'
                        isNew: isNew
                    }
                    : el
            )
        )
    }, [])

    const handleAddTask = useCallback(({ task }: { task: string }) => {
        const newTask = {
            id: crypto.randomUUID(),
            content: task,
            isDone: false,
            isNew: true
        }
        setDbTasks(prevTasks => [newTask, ...prevTasks])

        // if (isNew) setAnimateTask(true); // Activa la animación
        setTimeout(() => handleUpdateTask({ id: newTask.id, content: newTask.content, status: newTask.isDone, type: 'asd', isNew: false }), 300); // D
    }, [])

    const getFilter = useCallback(() => {
        if (current === 'all' || current === '') return dbTasks

        return current === 'active' ? pendingTask : tasksDone

    }, [current, dbTasks, pendingTask, tasksDone])

    const filteredData = useMemo(() => getFilter(), [current, dbTasks, pendingTask, tasksDone]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const handleUpdateDragAndDrop = ({ result }: { result: any }) => {
    //     const { destination, source } = result

    //     if (!destination || (source.index === destination.index && source.droppableId === destination.droppableId)) return


    //     setDbTasks(prevTasks => {
    //         const updatedTasks = Array.from(prevTasks) // Clona la lista para no mutarla
    //         const [reorderedItem] = updatedTasks.splice(source.index, 1) // Extrae el elemento
    //         updatedTasks.splice(destination.index, 0, reorderedItem) // Inserta en la nueva posición

    //         return updatedTasks
    //     })
    // }

    const handleUpdateDragAndDrop = ({ e }: { e: DragEndEvent }) => {
        console.log({ e })
        const { active, over } = e;
        if (over && active.id !== over.id) {
            setDbTasks((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };
    const data = {
        dbTasks,
        darkTheme,
        // animateTask,
        handleTheme,
        classDrag,
        setclassDrag,
        handleUpdateDragAndDrop,
        handleAddTask,
        handleDeleteTask,
        handleUpdateTask,
        tasksDone,
        setTasksDone,
        pendingTask,
        setPendingTask,
        current,
        setCurrent,
        filteredData
    }


    return (
        <TaskContext.Provider value={data}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContext