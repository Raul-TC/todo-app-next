import { auth } from '@/auth';
import { NextResponse } from 'next/server';

//export { auth } from '@/auth'

export async function middleware(req: Request) {
    const session = await auth();

    // Definir las rutas protegidas
    const protectedRoutes = ["/api/task", "/api/other-protected-route"];

    // Si el usuario no está autenticado y accede a una ruta protegida
    if (
        protectedRoutes.some((route) => req.url.includes(route)) &&
        !session?.user
    ) {
        return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    return NextResponse.next(); // Permitir el acceso si está autenticado
}

// Configurar el matcher para proteger las rutas necesarias
export const config = {
    matcher: ["/api/:path*"], // Proteger todas las rutas de la API
};

