"use server"
import prisma from "@/libs/db";
import { Task } from "@prisma/client";


export async function getTask({ userId }: { userId: string }) {
    try {
        const dbb = await prisma.task.findMany({
            where: {
                userId: userId
            }
        })

        console.log(dbb, 'IDDDDDDDDD')
        return dbb
    } catch (error) {
        console.error("Error al obtener las tareas:", error);

        return []
    }

}

export async function addTask({ task, userId }: { task: string, userId: string }): Promise<Task> {
    return await prisma.task.create({
        data:
        {
            content: task,
            isDone: false,
            isNew: true,
            userId
        }
    })
}


export async function updateTask({ id, status, type, content, isNew, userId }: { id: number, status: boolean, type: string, content: string, isNew: boolean, userId: string }) {
    return await prisma.task.update({
        where: {
            userId: userId,
            id: id
        },
        data: {
            isDone: type === 'done' ? status : false,
            ...(type !== 'done' && { content }),
            isNew
        }
    })
}