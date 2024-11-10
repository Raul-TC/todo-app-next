import { Login } from "@/app/components/Login"
import { auth } from "@/auth"

export default async function LoginPage() {

    const session = await auth()
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
