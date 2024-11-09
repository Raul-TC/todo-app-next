'use client'
import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export const useLogout = () => {
    const router = useRouter()
    const handleLogout = async ({ session }: { session: Session }) => {
        if (session.user.id) {
            localStorage.removeItem(`db_${session.user.id}`)
        }
        const logout = await signOut({
            redirect: false,
            callbackUrl: '/'
        })

        router.push('/')
        router.refresh()
        toast.success('Se ha cerrado la sesión')

    }

    return { handleLogout }
}