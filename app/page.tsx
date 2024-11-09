import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/route';
import { TodoList } from './components/TodoList';
import { Suspense } from 'react';
import Loading from './loading';

export default async function Home() {

  const session = await getServerSession(authOptions)

  if (!session?.user.id) redirect('/auth/login')

  return (
    <Suspense key={crypto.randomUUID()} fallback={<Loading />}>
      <TodoList />
    </Suspense>
  );
}
