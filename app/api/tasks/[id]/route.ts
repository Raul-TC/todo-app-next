import prisma from "@/libs/db";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";



export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const session: Session | null = await getServerSession(authOptions)


    if (!session || !session.user) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    try {
        const { idTask, status, type, content, isNew }: { idTask: number, status?: boolean, type?: string, content: string, isNew: boolean } = await req.json()

        const taskDone = type === 'done' ? status : false
        const updatedTask = await prisma.task.update({
            where: {
                userId: Number(params.id),
                id: idTask
            },
            data: {

                isDone: taskDone,
                ...(type !== 'done' && { content }), // Solo actualiza `content` si no es 'done'
                isNew
            }
        })

        console.log('UPDATE RESPONSE', updatedTask)
        return NextResponse.json(updatedTask)
    } catch (error) {
        console.log({ paramsss: params.id })
        return NextResponse.json({ message: 'Error al actualizar la tarea', error }, { status: 500 });
    }
}


export async function DELETE(req: Request, { params }: { params: { id?: string } }) {

    const session: Session | null = await getServerSession(authOptions)


    if (!session || !session.user) {
        return NextResponse.json({ message: 'User no authenticated' }, { status: 401 })
    }

    try {
        const { type } = await req.json()

        console.log('TYPEEE', type)
        if (params?.id) {
            // Elimina una sola tarea específica usando el ID proporcionado en params
            const deleteTask = await prisma.task.delete({
                where: {
                    userId: session.user.id,
                    id: Number(params.id),
                }
            });
            console.log('TASK ELIMINADA', deleteTask);
            return NextResponse.json(deleteTask);
        } else if (type === 'all') {
            // Elimina todas las tareas completadas (`isDone: true`) del usuario actual
            const deleteAllCompletedTasks = await prisma.task.deleteMany({
                where: {
                    userId: session.user.id,
                    isDone: true
                }
            });
            console.log('TAREAS COMPLETADAS ELIMINADAS', deleteAllCompletedTasks);
            return NextResponse.json(deleteAllCompletedTasks);
        }

    } catch (error) {
        console.log({ paramsss: params.id })
        return NextResponse.json({ message: 'Error al actualizar la tarea', error }, { status: 500 });

    }
}

