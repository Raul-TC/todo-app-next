import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        // Devuelve un error si no es POST
        return res.status(405).json({
            error: 'Method not allowed',
            message: 'Only POST requests are allowed on this endpoint.',
        });
    }

    // Aquí puedes validar tu lógica (por ejemplo, token CSRF o datos en el body)
    const { csrfToken } = req.body;

    if (!csrfToken || csrfToken !== 'expected-token') {
        // Error personalizado para problemas de validación
        return res.status(403).json({
            error: 'Invalid CSRF token',
            message: 'The CSRF token provided is invalid or missing.',
        });
    }

    // Si todo está bien
    res.status(200).json({
        success: true,
        message: 'CSRF token is valid.',
    });
}
