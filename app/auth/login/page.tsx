import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Login } from "@/app/components/Login"
import { h1 } from "framer-motion/client"
import { Session } from "next-auth"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export default async function LoginPage() {

    const session = await getServerSession(authOptions)
    console.log({ session })
    // if (session) redirect('/')
    return (
        <>
            {session ?
                <h1>Bienvenidooooooo</h1>
                :
                <Login />
            }
        </>
    )
}
