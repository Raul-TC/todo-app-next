"use client"
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

interface Task {
    id?: number;
    userId: string
    content: string;
    isDone: boolean;
    isNew?: boolean;
    createdAt?: Date,
    updatedAt?: Date
}

interface DeleteTaskParams {
    id?: number;
    type: 'one' | 'all';
}

interface TaskContextType {
    userId: string | undefined,
    dbTasks: Task[];
    tasksDone: Task[];
    pendingTask: Task[];
    current: string;
    localStorageKey: string | null,
    setLocalStorageKey: React.Dispatch<React.SetStateAction<string | null>>;
    handleAddTask: ({ task, userId }: { task: string, userId: string }) => void;
    handleDeleteTask: ({ id, type }: DeleteTaskParams) => void;
    handleUpdateTask: ({ idTask, status, type, content, isNew, userId, exist }: { idTask: number, status?: boolean, type?: string, content?: string, isNew?: boolean, userId: string, exist: boolean }) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleUpdateDragAndDrop: (e: DragEndEvent) => void;
    setCurrent: React.Dispatch<React.SetStateAction<string>>;
    filteredData: Task[];
    modal: boolean
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dbTasks, setDbTasks] = useState<Task[]>([])
    const [tasksDone, setTasksDone] = useState<Task[]>([]);
    const [pendingTask, setPendingTask] = useState<Task[]>([]);
    const [current, setCurrent] = useState<string>('all');
    const [modal, setModal] = useState<boolean>(false)
    const { data: session, status } = useSession()
    const [localStorageKey, setLocalStorageKey] = useState<string | null>(null);
    const userId = session?.user.id

    console.log('USERIDDDDD', userId)
    const fetchTask = useCallback(async () => {
        if (!localStorageKey) return;

        const lsData = localStorage.getItem(localStorageKey)

        try {
            if (lsData) {
                console.log(' de aqui agarro datos')
                setDbTasks(JSON.parse(lsData))
            } else {
                console.log(' ME CONECTO A LA DB ')

                const dbRes = await fetch('/api/tasks')

                if (!dbRes.ok) {
                    toast.error('Error al obtener las tareas')
                    throw new Error('Error al obtener las tareas')
                }
                const tasks = await dbRes.json()
                localStorage.setItem(localStorageKey, JSON.stringify(tasks))
                console.log({ tasks })
                setDbTasks(tasks)

                return tasks
                // }
            }

        } catch (error) {
            console.log("Error fetching data", error)
        }
    }, [localStorageKey])

    useEffect(() => {
        if (status === "authenticated" && userId) {
            setLocalStorageKey(`db_${userId}`)
            fetchTask();
        }
    }, [status, fetchTask, status, session]);



    const handleDeleteTask = useCallback(async ({ id, type }: DeleteTaskParams) => {
        console.log({ id, type })

        if (!localStorageKey) return
        try {
            const query = id ? `/api/tasks/${id}` : '/api/tasks'
            const resp = await fetch(`${query}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type })
            })

            if (!resp.ok) {
                throw new Error('Error al eliminar la task')
            }
            const taskDeleted: Task = await resp.json()

            setDbTasks(prevTasks => {
                const alltasks = type === 'all'
                    ? prevTasks?.filter(el => !el.isDone)
                    : prevTasks?.filter(el => el.id !== taskDeleted.id)

                localStorage.setItem(localStorageKey, JSON.stringify(alltasks))
                return alltasks
            })

            toast.success("🚮 Tarea eliminada con exito", {
                position: "top-center"
            })
        } catch (error) {
            console.log({ error })
            toast.error("Error al eliminar la tarea.");
        }

    }, [localStorageKey])

    const handleUpdateTask = useCallback(async ({ idTask, status, type, content, isNew, userId, exist = true }: { idTask: number, status?: boolean, type?: string, content?: string, isNew?: boolean, userId: string, exist: boolean }) => {

        if (!localStorageKey) return
        try {
            if (userId) {

                const updateResponse = await fetch(`/api/tasks/${userId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idTask, status, type, content, isNew })
                })

                if (!updateResponse.ok) {
                    throw new Error('Error al actualizar la tarea')
                }

                const res = await updateResponse.json()
                setDbTasks(prevTasks => {
                    const tasks = prevTasks?.map(el =>

                        el.id === res.id
                            ? {
                                ...el,
                                isDone: type === 'done' ? (status ?? false) : false,  // Asegúrate de que `status` sea siempre booleano
                                ...(type !== 'done' && { content }), // Solo actualiza `content` si no es 'done'
                                isNew: isNew,
                                updatedAt: res.updatedAt
                            }
                            : el) ?? []

                    localStorage.setItem(localStorageKey, JSON.stringify(tasks))
                    return tasks
                }


                )

                if (exist) toast.success("Tarea actualizada con éxito!");
            }
        } catch (error) {
            console.log({ error })
            toast.error("Error al agregar la tarea.");
        }
    }, [localStorageKey])


    const handleAddTask = useCallback(async ({ task, userId }: { task: string, userId: string }) => {

        if (!localStorageKey) return
        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task, userId })
            })

            if (!res.ok) {
                throw new Error('Error al agregar la tarea');
            }

            const result = await res.json();
            setDbTasks(prevTasks => {
                const data = [result, ...prevTasks]
                if (localStorageKey) localStorage.setItem(localStorageKey, JSON.stringify(data))
                return data

            }
            );

            setTimeout(() => {
                handleUpdateTask({
                    idTask: result.id,
                    userId: userId,
                    content: result.content,
                    status: result.isDone,
                    type: 'update',
                    isNew: false,
                    exist: false
                });
            }, 300);
            toast.success("Tarea agregada con éxito!");

        } catch (error) {
            console.error("Error al agregar tarea: ", error);
            toast.error("Error al agregar la tarea.");
        }
    }, [localStorageKey])

    const getFilter = useCallback(() => {
        if (current === 'all' || current === '') return dbTasks

        return current === 'active' ? pendingTask : tasksDone

    }, [current, dbTasks, pendingTask, tasksDone])

    useEffect(() => {
        const done: Task[] = dbTasks.filter(el => el.isDone)
        const pending: Task[] = dbTasks.filter(el => !el.isDone)

        setTasksDone(done)
        setPendingTask(pending)
    }, [dbTasks])


    const filteredData = useMemo(() => getFilter(), [current, dbTasks, pendingTask, getFilter]);

    const handleUpdateDragAndDrop = (e: DragEndEvent) => {
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
        userId,
        dbTasks,
        modal,
        setModal,
        localStorageKey,
        setLocalStorageKey,
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