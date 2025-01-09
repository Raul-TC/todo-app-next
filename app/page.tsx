import { redirect } from 'next/navigation';
import { TodoList } from './components/TodoList';
import { Suspense } from 'react';
import { auth } from '@/auth';
import TaskSkeleton from './components/SkeletonTasks';
import { crudActions } from './hooks/crudActions';

export default async function Home() {

  const session = await auth()


  console.log({ sessionFromLogin: session })
  if (!session) redirect('/auth/login')
  const { getAllTasks } = crudActions()

  const tasks = await getAllTasks(session)

  console.log(typeof tasks)
  return (
    <Suspense key={crypto.randomUUID()} fallback={<TaskSkeleton />}>
      {
        !tasks.error?.isError ? <TodoList session={session} tasks={tasks} />
          : <div className='min-h-[calc(100vh-308px)] flex'>
            <h1 className='text-center m-auto text-3xl'>{tasks.error?.message.toString()}</h1>
          </div>
      }
    </Suspense>
  )
}
