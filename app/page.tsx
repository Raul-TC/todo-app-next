import { redirect } from 'next/navigation';
import { TodoList } from './components/TodoList';
import { Suspense } from 'react';
import { auth } from '@/auth';
import TaskSkeleton from './components/SkeletonTasks';
import { crudActions } from './hooks/crudActions';

export default async function Home() {

  const session = await auth()


  if (!session) redirect('/auth/login')
  const { getAllTasks } = crudActions()

  const tasks = await getAllTasks(session)

  console.log({ tasks })
  return (
    <Suspense key={crypto.randomUUID()} fallback={<TaskSkeleton />}>
      {
        <>
          <TodoList session={session} tasks={tasks} />
        </>
      }
    </Suspense>
  )
}
