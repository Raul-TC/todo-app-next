import { auth } from "@/auth";
import prisma from "@/libs/db";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    try {
        const session = await auth()
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        console.log('OBTENIENDNO TASKS ')
        console.log({ token })
        if (!session || !session.user.id) {
            return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
        }

        // if (params.id !== session?.user.id) {
        //     return NextResponse.json({ message: 'No tienes permiso para acceder a estas tareas' }, { status: 403 });
        // }

        const tasks = await prisma.task.findMany({
            where: {
                userId: '2',
            },
            orderBy: {
                id: 'desc'
            }
        })

        // console.log({ tasks })
        // if (tasks.length === 0) {
        //     return NextResponse.json({ message: "No tasks found for this user" }, { status: 404 });
        // }
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
        return NextResponse.json({ message: 'Task Created', newTask }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: 'Error al crear la tarea', error }, { status: 500 });
    }
}