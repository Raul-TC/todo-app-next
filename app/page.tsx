import { redirect } from 'next/navigation';
import { TodoList } from './components/TodoList';
import { Suspense } from 'react';
import Loading from './loading';
import { auth } from '@/auth';

export default async function Home() {

  const session = await auth()

  if (!session?.user.id) redirect('/auth/login')

  return (
    <Suspense key={crypto.randomUUID()} fallback={<Loading />}>
      <TodoList />
    </Suspense>
  );
}
