import { Login } from "@/app/components/Login"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function LoginPage() {

    const session = await auth()
    if (session?.user.id) redirect('/')
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
