import { NextRequest, NextResponse } from 'next/server';

export async function handler(req: NextRequest) {
    if (req.method === 'GET') {
        // Respuesta exitosa para GET
        return NextResponse.json(
            {
                success: true,
                message: 'CSRF token retrieved successfully.',
            },
            { status: 200 }
        );
    }

    // Manejo de error para POST u otros métodos
    return NextResponse.json(
        {
            error: 'Method not allowed',
            message: 'Only GET requests are allowed on this endpoint.',
        },
        { status: 405 }
    );
}

export const config = {
    runtime: 'edge', // Opcional si estás usando Edge Runtime
};
