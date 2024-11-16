import { Session } from "next-auth"
import { toast } from "react-toastify"

export const crudActions = ({ session }: { session?: Session | null }) => {

    const getAllTasks = async () => {
        try {
            const url = `${process.env.NEXTAUTH_URL}/api/tasks/${session?.user.id}`
            const dbRes = await fetch(url)

            if (!dbRes.ok) {
                throw new Error('Error al obtener las tareas')
            }
            const tasks = await dbRes.json()

            return tasks

        } catch (error) {
            console.log("Error fetching data", error)
        }
    }

    const createTask = async ({ content, userId }: { content: string, userId: string | undefined, exist: boolean }) => {
        try {

            const updateResponse = await toast.promise(fetch(`/api/tasks/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, userId })
            }), {
                pending: 'Creando nueva Tarea'
            })

            if (!updateResponse.ok) {
                toast.error('Error al agregar la nueva tarea')
                throw new Error('Error al agregar la tarea')
            }
            toast.success('Tarea agregada con exito')

            const res = await updateResponse.json()

            // setTimeout(async () => {
            //     await updateTask({ idTask: res.id, exist: true, isNew: false, userId: res.userId })
            // }, 300);
            console.log({ TaskUPDATED: res })
            return res
        } catch (error) {
            console.log("Error fetching data", error)
        }
    }


    const updateTask = async ({ idTask, status, type, content, isNew, userId }: { idTask: number, status?: boolean, type?: string, content?: string, isNew?: boolean, userId: string | undefined, exist: boolean }) => {
        try {

            const updateResponse = await fetch(`/api/tasks/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idTask, status, type, content, isNew })
            })

            if (!updateResponse.ok) {
                throw new Error('Error al actualizar la tarea')
            }

            const res = await updateResponse.json()

            console.log({ TaskUPDATED: res })
            return res
        } catch (error) {
            console.log("Error fetching data", error)
        }
    }

    const deleteTask = async ({ idTask, type, userId }: { idTask?: number, type?: string, userId: string | undefined }) => {

        try {
            const url = `/api/tasks/${userId}`;

            const response = await toast.promise(fetch(`${url}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idTask, type })
            })
                , {
                    pending: `Eliminando ${type === 'one' ? 'tarea' : 'tareas'}`,
                })

            if (!response.ok) {
                // error: `Error al eliminar ${type === 'one' ? 'la tarea' : 'las tareas'}`
                toast.error(`${response.status} - Error al eliminar ${type === 'one' ? 'la tarea' : 'las tareas'}`)
                throw new Error('Error al actualizar la tarea')
            }
            toast.success(`${type === 'one' ? 'Tarea eliminada con exito' : 'Tareas eliminadas con exito'}`)

            const res = await response.json()

            return res
        } catch (error) {
            console.log("Error fetching data", error)
        }
    }

    return { getAllTasks, createTask, updateTask, deleteTask }
}