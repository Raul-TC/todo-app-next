'use client'
import { useState } from 'react';
import { DraggableList } from './components/DraggableList';
import { StatusTask } from './components/StatusTask';
import { useTaskProvider } from './hooks/useTaskProvider';
import { Modal } from './components/Modal';

export default function Home() {
  const { dbTasks, pendingTask, tasksDone, current } = useTaskProvider()
  const list = [{ current: 'all', type: dbTasks.length }, { current: 'active', type: pendingTask.length }, { current: 'completed', type: tasksDone.length }]
  const [modal, setModal] = useState(false)

  return (
    <section className={`dark:bg-darkBg dark:text-textDark bg-lightBg text-textLight transition-colors duration-300 ease-in  min-h-[calc(100vh-228px)] w-full h-full pb-24`}>
      <div className='dark:bg-containerDark dark:text-textDark bg-bodyLight text-textLight w-[90%] mx-auto flex items-center rounded-md justify-center divide-[#d1cece] flex-col transition-colors duration-300 ease-in md:max-w-2xl' >
        <DraggableList />
        <div className='dark:bg-containerDark dark:text-textOpacity bg-containerLight w-full h-full m-auto flex rounded-b-md items-center justify-between p-4 text-base transition-colors duration-300 ease-in overflow-hidden border-t-[.15px] border-[#e0dede49]'>
          {list.map(el =>
            <p key={el.current}
              className={`text-inherit ${current === el.current ? 'block' : 'hidden'} capitalize`}>
              {el.current} ({el.type})
            </p>
          )
          }
          <div className='w-full mt-4 py-4 items-center justify-center m-auto rounded-md md:max-w-2xl hidden overflow-hidden lg:flex md:w-auto md:m-0 md:self-center text-textLight transition-colors duration-300 ease-in'>
            <StatusTask />
          </div>
          {tasksDone.length > 0 && <p className={`dark:md:hover:text-gray-200 md:hover:text-gray-800 transition-colors duration-300 ease-in cursor-pointer text-base animate-tasksAnimate md:hover:font-bold`}
            onClick={() => setModal(!modal)}>Clear Completed</p>}
        </div>
      </div>
      <div className='dark:bg-containerDark dark:text-textDark overflow-hidden bg-containerLight text-textLight w-[90%] flex mt-4 py-4 items-center justify-center m-auto rounded-md  mb-8 md:py-5 lg:hidden animate-tasksAnimate transition-colors duration-300 ease-in md:max-w-2xl' >
        <StatusTask />
      </div >
      {modal && <Modal setModal={setModal} type='all' />}

      <p className='text-center md:mt-8'>Drag and drop to reorder list</p>
    </section>
  );
}
