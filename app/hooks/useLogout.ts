'use client'
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useTasksStore } from "../stores/tasksStore"

export const useLogout = () => {
    const setUserId = useTasksStore(state => state.setUserId)
    const router = useRouter()
    const handleLogout = async () => {
        await toast.promise(signOut({
            redirect: false,
            callbackUrl: '/'
        }), { pending: 'Cerrando sesión' })
        setUserId(undefined)
        router.push('/')
        router.refresh()
    }

    return { handleLogout }
}