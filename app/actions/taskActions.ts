"use server"
import { auth } from "@/auth";
import prisma from "@/libs/db";
import { revalidatePath } from "next/cache";

export async function getTask() {
    try {
        const userID = await auth()
        if (!userID?.user.id) return null

        const dbb = await prisma.task.findMany({
            where: {
                userId: userID?.user.id
            },
            orderBy: {
                id: 'desc'
            }
        })

        console.log(dbb, 'IDDDDDDDDD')
        return dbb
    } catch (error) {
        console.error("Error al obtener las tareas:", error);

        return []
    }

}

export async function addTask({ task }: { task: string }) {

    try {
        const userID = await auth()

        if (!userID?.user.id) return null

        const add = await prisma.task.create({
            data:
            {
                content: task,
                isDone: false,
                isNew: true,
                userId: userID?.user.id
            }
        })
        setTimeout(() => {
            updateTask({ id: add.id, isNew: false, type: 'done' })

        }, 300);

        revalidatePath('/')
        return true
    } catch (error) {
        console.log({ error })
    }
}


export async function updateTask({ id, status, type, content, isNew }: { id: number, status?: boolean, type: string, content?: string, isNew?: boolean }) {

    try {
        const userID = await auth()

        if (!userID?.user.id) return null

        const taskDone = type === 'done' ? status : false
        await prisma.task.update({
            where: {
                userId: userID.user.id,
                id: id
            },
            data: {
                isDone: taskDone,
                ...(type !== 'done' && { content }),
                isNew
            }
        })
        revalidatePath('/')

    } catch (error) {
        console.log({ error })
        return error
    }
}


export async function deleteTask({ idTask }: { idTask: number }) {

    try {
        const userID = await auth()

        if (!userID?.user.id) return null
        await prisma.task.delete({
            where: {
                userId: userID.user.id,
                id: idTask
            }
        })
        revalidatePath('/')

    } catch (error) {
        console.log({ error })
        return error
    }
}



export async function deleteAllDoneTasks() {

    try {
        const userID = await auth()

        if (!userID?.user.id) return null

        await prisma.task.deleteMany({
            where: {
                userId: userID.user.id,
                isDone: true
            }
        })
        revalidatePath('/')

    } catch (error) {
        console.log({ error })
        return error
    }
}