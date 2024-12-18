import { auth } from "@/auth";
import prisma from "@/libs/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {

    try {

        // if (!params.id) {
        //     return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
        // }
        const session = await auth()
        if (!params.id || !session || !session.user.id) {
            return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
        }

        if (params.id !== session?.user.id) {
            return NextResponse.json({ message: 'No tienes permiso para acceder a estas tareas' }, { status: 403 });
        }
        const { status, type, content, isNew }: { status?: boolean, type?: string, content: string, isNew: boolean } = await req.json()
        console.log({ status, type, content, isNew })

        // const task = await prisma.task.findUnique({
        //     where: {
        //         id: idTask,
        //     }
        // });

        // if (!task) {
        //     return NextResponse.json({ message: 'Tarea no encontrada' }, { status: 404 });
        // }

        // // Verificar que el `userId` de la tarea coincida con el de la sesión
        // if (task.userId !== params.id) {
        //     return NextResponse.json({ message: 'No tienes permiso para modificar esta tarea' }, { status: 403 });
        // }

        const taskDone = type === 'done' ? status : false
        const updatedTask = await prisma.task.update({
            where: {
                id: Number(params.id),
                userId: session.user.id
            },
            data: {

                isDone: taskDone,
                ...(type !== 'done' && { content }),
                isNew
            }
        })

        return NextResponse.json(updatedTask)
    } catch (error) {
        console.log({ error })
        return NextResponse.json({ message: 'Error al actualizar la tarea', error }, { status: 500 });
    }
}


export async function DELETE(req: Request, { params }: { params: { id?: string } }) {



    try {
        const session = await auth()
        if (!params.id || !session || !session.user.id) {
            return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
        }

        if (params.id !== session?.user.id) {
            return NextResponse.json({ message: 'No tienes permiso para acceder a estas tareas' }, { status: 403 });
        }
        const { type } = await req.json()
        if (type === 'one') {
            const deleteTask = await prisma.task.delete({
                where: {
                    userId: session.user.id,
                    id: Number(params.id)
                    ,
                }
            });
            return NextResponse.json(deleteTask);
        } else {
            const deleteAllCompletedTasks = await prisma.task.deleteMany({
                where: {
                    userId: session.user.id,
                    isDone: true
                }
            });
            return NextResponse.json(deleteAllCompletedTasks);
        }

    } catch (error) {
        return NextResponse.json({ message: 'Error al actualizar la tarea', error }, { status: 500 });

    }
}

export async function GET({ params }: { params: { id?: string } }) {



    try {
        const session = await auth()
        if (!params.id || !session || !session.user.id) {
            return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
        }

        const tasks = await prisma.task.findFirst({
            where: {
                userId: session?.user.id,
                id: Number(params.id)
            },
            orderBy: {
                id: 'desc'
            }
        })

        if (!tasks) {
            return NextResponse.json({ message: "No tasks found for this user" }, { status: 404 });
        }

        return NextResponse.json(tasks)
    } catch (error) {
        return NextResponse.json({ message: 'Error al obtener las tareas', error }, { status: 500 })

    }
}

export async function POST(req: Request) {


    try {
        const session = await auth()
        if (!session || !session.user.id) {
            return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
        }

        // if (params.id !== session?.user.id) {
        //     return NextResponse.json({ message: 'No tienes permiso para acceder a estas tareas' }, { status: 403 });
        // }
        const { content }: { content: string } = await req.json()
        const newTask = await prisma.task.create({
            data: {
                content,
                isDone: false,
                isNew: true,
                userId: session.user.id
            }
        })
        return NextResponse.json(newTask)
    } catch (error) {
        return NextResponse.json({ message: 'Error al crear la tarea', error }, { status: 500 });
    }
}