import { auth } from "@/auth";
import prisma from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id?: string, taskId: number } }) {



    try {
        const session = await auth()
        if (!params.id || !session || !session.user.id) {
            return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
        }

        if (params.id !== session?.user.id) {
            return NextResponse.json({ message: 'No tienes permiso para acceder a estas tareas' }, { status: 403 });
        }

        const tasks = await prisma.task.findMany({
            where: {
                userId: session?.user.id,
                id: params.taskId,
            },
            orderBy: {
                id: 'desc'
            }
        })

        if (tasks.length === 0) {
            return NextResponse.json({ message: "No tasks found for this user" }, { status: 404 });
        }
        return NextResponse.json(tasks)
    } catch (error) {
        return NextResponse.json({ message: 'Error al obtener la tarea', error }, { status: 500 })

    }
}