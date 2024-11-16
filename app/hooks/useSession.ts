import { auth } from "@/auth";

export function useSharedSession() {
    const session = auth()
}