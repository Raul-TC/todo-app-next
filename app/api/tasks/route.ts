import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { Session } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function POST(req: Request) {
    const session: Session | null = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    try {
        const { task, userId }: { task: string, userId: number } = await req.json()
        const newTask = await prisma.task.create({
            data: {
                content: task,
                isDone: false,
                isNew: true,
                userId
            }
        })

        console.log('NUEVA TAREA', newTask)
        return NextResponse.json(newTask, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: 'Error al crear la tarea', error }, { status: 500 });
    }
}

export async function GET() {

    const session: Session | null = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    console.log(session)
    try {
        const tasks = await prisma.task.findMany({
            where: {
                userId: session.user.id
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



export async function DELETE(req: Request) {

    const session: Session | null = await getServerSession(authOptions)


    if (!session || !session.user) {
        return NextResponse.json({ message: 'User no authenticated' }, { status: 401 })
    }

    try {
        const { type } = await req.json()

        console.log('TYPEEE', type)


        const deleteAllCompletedTasks = await prisma.task.deleteMany({
            where: {
                userId: session.user.id,
                isDone: true
            }
        });
        console.log('TAREAS COMPLETADAS ELIMINADAS', deleteAllCompletedTasks);
        return NextResponse.json(deleteAllCompletedTasks);

    } catch (error) {
        return NextResponse.json({ message: 'Error al actualizar la tarea', error }, { status: 500 });

    }
}

