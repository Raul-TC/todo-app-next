import { PrismaClient } from '@prisma/client'

// Este codigo ayuda a desarrollar en modo dev sin interrupcion
const prismaClientSingleton = () => {
    return new PrismaClient({
        log: ['query', 'info', 'warn', 'error'], // Habilita los logs detallados
    })
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma