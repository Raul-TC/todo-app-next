import { redirect } from 'next/navigation';
import { TodoList } from './components/TodoList';
import { Suspense } from 'react';
import Loading from './loading';
import { auth } from '@/auth';
import { getTask } from './actions/taskActions';

export default async function Home() {

  const session = await auth()

  console.log({ session }, 'EN EL HOME')
  if (!session?.user.id) redirect('/auth/login')
  const tasks = await getTask()

  console.log({ tasks })
  return (
    <Suspense key={crypto.randomUUID()} fallback={<Loading />}>
      <TodoList tasks={tasks} />
    </Suspense>
  )
}
