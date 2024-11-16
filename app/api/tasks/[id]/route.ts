import prisma from "@/libs/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    if (!params.id) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    try {
        const { idTask, status, type, content, isNew }: { idTask: number, status?: boolean, type?: string, content: string, isNew: boolean } = await req.json()

        const taskDone = type === 'done' ? status : false
        const updatedTask = await prisma.task.update({
            where: {
                userId: params.id,
                id: idTask
            },
            data: {

                isDone: taskDone,
                ...(type !== 'done' && { content }),
                isNew
            }
        })

        return NextResponse.json(updatedTask)
    } catch (error) {
        return NextResponse.json({ message: 'Error al actualizar la tarea', error }, { status: 500 });
    }
}


export async function DELETE(req: Request, { params }: { params: { id?: string } }) {


    if (!params.id) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    try {
        const { idTask, type } = await req.json()
        if (idTask && type === 'one') {
            const deleteTask = await prisma.task.delete({
                where: {
                    userId: params.id,
                    id: idTask,
                }
            });
            return NextResponse.json(deleteTask);
        } else {
            const deleteAllCompletedTasks = await prisma.task.deleteMany({
                where: {
                    userId: params.id,
                    isDone: true
                }
            });
            return NextResponse.json(deleteAllCompletedTasks);
        }

    } catch (error) {
        return NextResponse.json({ message: 'Error al actualizar la tarea', error }, { status: 500 });

    }
}

export async function GET(req: Request, { params }: { params: { id?: string } }) {

    if (!params.id) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    try {
        const tasks = await prisma.task.findMany({
            where: {
                userId: params.id
            },
            orderBy: {
                id: 'desc'
            }
        })

        return NextResponse.json(tasks)
    } catch (error) {
        return NextResponse.json({ message: 'Error al obtener las tareas', error }, { status: 500 })

    }
}

export async function POST(req: Request, { params }: { params: { id?: string } }) {

    if (!params.id) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    try {
        const { content, userId }: { content: string, userId: string } = await req.json()
        const newTask = await prisma.task.create({
            data: {
                content,
                isDone: false,
                isNew: true,
                userId,

            }
        })
        return NextResponse.json(newTask)
    } catch (error) {
        return NextResponse.json({ message: 'Error al crear la tarea', error }, { status: 500 });
    }
}