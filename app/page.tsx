import { redirect } from 'next/navigation';
import { TodoList } from './components/TodoList';
import { Suspense } from 'react';
import { auth } from '@/auth';
import TaskSkeleton from './components/SkeletonTasks';
import { crudActions } from './hooks/crudActions';

export default async function Home() {

  const session = await auth()
  const { getAllTasks } = crudActions({ session })
  if (!session?.user.id) redirect('/auth/login')

  const tasks = await getAllTasks()

  return (
    <Suspense key={crypto.randomUUID()} fallback={<TaskSkeleton />}>
      <TodoList session={session} tasks={tasks} />
    </Suspense>
  )
}
