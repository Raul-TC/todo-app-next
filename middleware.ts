export { auth as middleware } from '@/auth'
export const config = {
    matcher: ["/", "/api/tasks", "/api/tasks/:path*"],
};


