import { Task } from "@prisma/client";
import { User } from "next-auth";
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface TasksState {
    dbTasks: Task[];
    userId: User | undefined
    tasksDone: Task[];
    pendingTask: Task[];
    current: "all" | "active" | "completed";
    modal: boolean;
    setModal: (modal: boolean) => void;
    setTasks: (tasks: Task[]) => void;
    setTasksPending: (task: Task[]) => void,
    setTasksDone: (task: Task[]) => void,
    setCurrent: (current: "all" | "active" | "completed") => void,
    addTask: (task: Task) => void;
    updateTask: (updatedTask: Task) => void;
    deleteTask: (taskId?: number) => void;
    filterTasks: (status: "all" | "active" | "completed") => void;
    setUserId: (session: User | undefined) => void

}

export const useTasksStore = create<TasksState>()(
    devtools(
        persist(
            (set) => ({
                dbTasks: [],
                userId: undefined,
                tasksDone: [],
                pendingTask: [],
                current: 'all',
                modal: false,
                setModal: (modal) => set({ modal }),
                setTasks: (tasks) => set({ dbTasks: tasks }),
                addTask: (task) => set((state) => ({ dbTasks: [task, ...state.dbTasks] })),
                setTasksPending: (task) => set({ pendingTask: task }),
                setTasksDone: (task) => set({ tasksDone: task }),
                setCurrent: (currentTasks) => set({ current: currentTasks }),
                updateTask: (updateTask) =>
                    set((state) => ({
                        dbTasks: state.dbTasks
                            ? state.dbTasks.map((task) =>
                                task.id === updateTask.id ? updateTask : task
                            )
                            : [updateTask], // Si tasks es null, convertimos a un arreglo
                    })),
                deleteTask: (taskId) =>
                    set((state) => ({
                        dbTasks: state.dbTasks && taskId
                            ? state.dbTasks.filter((task) => task.id !== taskId)
                            : state.dbTasks.filter((task) => !task.isDone), // Si tasks es null, inicializamos un arreglo vacío
                    })),
                setUserId: (user) => set({
                    userId: user
                        ? { name: user.name, email: user.email, id: user.id }
                        : undefined,
                }),
                filterTasks: (status) => set({ current: status })
            }
            ),
            {
                "name": "bear-storage"
            }
        )
    ))


