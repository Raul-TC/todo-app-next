'use client'
import React, { useContext, useState } from 'react'
import HeaderComponent from './components/Header'
import '../styles/globals.css'
import ThemeContext from './context/themeConttext'
import InputTask from './components/InputTask'
import cross from '../assets/icon-cross.svg'
import Image from 'next/image'
import taskContext from './context/taskContext'
import ModalDeleteTask from './components/ModalDeleteTask'
import { Josefin_Sans } from '@next/font/google'
const josefin = Josefin_Sans({
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"]
})
const HomePage = () => {
    const [modal, setModal] = useState(false)
    const { dbTasks, current, setCurrent, pendingTask, tasksDone, filteredData } = useContext(taskContext)
    // const { DarkTheme } = useContext(ThemeContext)


    // let DarkTheme


    return (
        // <div className={`${DarkTheme ? 'bg-[#161722] text-white' : 'bg-white text-[#161722]'} ${josefin.className} transition-all duration-500  min-h-screen w-full h-full  pb-24`}>
        <div className={`dark:bg-[#161722] dark:text-white bg-white text-[#161722] ${josefin.className} transition-all duration-500  min-h-screen w-full h-full pb-24`}>
            <HeaderComponent />

            {/* <div className={`${DarkTheme ? 'bg-[#25273c]text - white ' : 'bg - gray - 100 text - [#25273c] '} min-h-[3rem] w-[90%] m-auto -mt-6 overflow-hidden rounded-md flex items-center justify-center  divide-y flex-col`}> */}
            < div className=' dark:bg-[#25273c] dark:text-white bg-gray-100 text-[#25273c] min-h-[3rem] w-[90%] m-auto -mt-6 overflow-hidden rounded-md flex items-center justify-center divide-y flex-col transition-all duration-500 ' >
                {dbTasks && filteredData.length > 0
                    ? filteredData.map(tsk => <InputTask key={tsk.id} id={tsk.id} isDone={tsk.isDone} content={tsk.content}>
                        {tsk.content}
                    </InputTask>)
                    : <p className='py-4'>{`${current === 'completed' ? 'complete a task ✔️' : 'Add a new task 🖋️'}`}</p>
                }
                <div className='w-full flex items-center justify-between py-4 pl-4 pr-4 bg-transparent md:py-5 animate-tasksAnimate transition-all duration-500 '>
                    {/* {current === 'all' ? <><p className={`${DarkTheme ? 'text-gray-600' : 'text-inherit'} ${DarkTheme ? 'md:hover:text-gray-200' : 'md:hover:text-gray-800'} cursor-pointer text-sm`}> All Items</p> </> : null} */}
                    {current === 'all' ? <><p className='dark:text-gray-600 text-inherit dark:md:hover:text-gray-200 md:hover:text-gray-800 cursor-pointer text-sm'> All Items</p> </> : null}
                    {/* {current === 'active' ? <><p className={`${DarkTheme ? 'text-gray-600' : 'text-inherit'} ${DarkTheme ? 'md:hover:text-gray-200' : 'md:hover:text-gray-800'} cursor-pointer text-sm`}>{pendingTask.length} items left</p> </> : null} */}
                    {current === 'active' ? <><p className='dark:text-gray-600 text-inherit dark:md:hover:text-gray-200 md:hover:text-gray-800 cursor-pointer text-sm'>{pendingTask.length} items left</p> </> : null}
                    {/* {current === 'completed' ? <><p className={`${DarkTheme ? 'text-gray-600' : 'text-inherit'} ${DarkTheme ? 'md:hover:text-gray-200' : 'md:hover:text-gray-800'} text-sm`}>{tasksDone.length} items completed</p> </> : null} */}
                    {current === 'completed' ? <><p className='dark:text-gray-600 text-inherit dark:md:hover:text-gray-200 md:hover:text-gray-800 cursor-pointer text-sm'>{tasksDone.length} items completed</p> </> : null}
                    {/* <div className={`${DarkTheme ? 'bg-[#25273c]' : 'bg-gray-100'} w-full max-w-85  mt-4 py-4 items-center justify-center m-auto rounded-md  md:max-w-2xl  md:py-5 hidden lg:flex md:w-auto md:m-0 md:hover:text-gray-800 text-sm md:self-center`}> */}
                    <div className='dark:bg-[#25273c] bg-gray-100 w-full max-w-85  mt-4 py-4 items-center justify-center m-auto rounded-md  md:max-w-2xl  md:py-5 hidden lg:flex md:w-auto md:m-0 md:hover:text-gray-800 text-sm md:self-center transition-all duration-500 '>
                        {/* <p onClick={() => setCurrent('all')} className={`${current === 'all' ? 'text-blue-500' : 'text-inherit'} ${DarkTheme && current === 'all' && 'text-blue-500'} ${DarkTheme ? 'md:hover:text-gray-200' : 'md:hover:text-gray-800'} cursor-pointer md:hover:text-gray-800 text-sm`}>All</p> */}
                        <p onClick={() => setCurrent('all')} className={`${current === 'all' ? 'text-blue-500  dark:text-blue-500' : 'text-inherit'} dark:md:hover:text-gray-200 md:hover:text-gray-800 cursor-pointer text-sm`}>All</p>
                        {/* <p onClick={() => setCurrent('active')} className={`${current === 'active' ? 'text-blue-500' : 'text-inherit'} ${DarkTheme && current === 'active' && 'text-blue-500'} ${DarkTheme ? 'md:hover:text-gray-200' : 'md:hover:text-gray-800'} ml-4 mr-4 cursor-pointer`}>Active</p> */}
                        <p onClick={() => setCurrent('active')} className={`${current === 'active' ? 'text-blue-500  dark:text-blue-500' : 'text-inherit'} dark:md:hover:text-gray-200 md:hover:text-gray-800 ml-4 mr-4 cursor-pointer`}>Active</p>
                        {/* <p onClick={() => setCurrent('completed')} className={`${current === 'completed' ? 'text-blue-500' : 'text-inherit'} ${DarkTheme && current === 'completed' && 'text-blue-500'} ${DarkTheme ? 'md:hover:text-gray-200' : 'md:hover:text-gray-800'} cursor-pointer`}>Completed</p> */}
                        <p onClick={() => setCurrent('completed')} className={`${current === 'completed' ? 'text-blue-500  dark:text-blue-500' : 'text-inherit'} dark:md:hover:text-gray-200 cursor-pointer`}>Completed</p>
                    </div>
                    {/* <p className={`${DarkTheme ? 'text-gray-600' : 'text-white'} ${DarkTheme ? 'md:hover:text-gray-200' : 'md:hover:text-gray-800'} ${tasksDone.length > 0 ? "opacity-100" : "opacity-0"} cursor-pointer text-sm animate-tasksAnimate`} onClick={() => setModal(!modal)}>Clear Completed</p> */}
                    <p className={` dark:text-gray-600 text-white dark:md:hover:text-gray-200 md:hover:text-gray-800  ${tasksDone.length > 0 ? "opacity-100" : "opacity-0"} cursor-pointer text-sm animate-tasksAnimate`} onClick={() => setModal(!modal)}>Clear Completed</p>
                </div>
            </div >
            {/* <div className={`${DarkTheme ? 'bg-[#25273c] text-white' : 'bg-gray-100 text-[#25273c]'} w-[90%] flex mt-4 py-4 items-center justify-center m-auto rounded-md  mb-8 md:py-5 lg:hidden animate-tasksAnimate`}> */}
            < div className='dark:bg-[#25273c] dark:text-white bg-gray-100 text-[#25273c] w-[90%] flex mt-4 py-4 items-center justify-center m-auto rounded-md  mb-8 md:py-5 lg:hidden animate-tasksAnimate transition-all duration-500 ' >
                {/* <p onClick={() => setCurrent('all')} className={`${current === 'all' ? 'text-blue-500' : 'text-inherit'} ${DarkTheme && current === 'all' && 'text-blue-500'} cursor-pointer text-sm`}>All</p> */}
                < p onClick={() => setCurrent('all')} className={`${current === 'all' ? 'text-blue-500  dark:text-blue-500' : 'text-inherit'} cursor-pointer text-sm`}> All</p >
                {/* <p onClick={() => setCurrent('active')} className={`${current === 'active' ? 'text-blue-500' : 'text-inherit'} ${DarkTheme && current === 'active' && 'text-blue-500'} ml-4 mr-4 cursor-pointer text-sm`}>Active</p> */}
                < p onClick={() => setCurrent('active')} className={`${current === 'active' ? 'text-blue-500  dark:text-blue-500' : 'text-inherit'} ml-4 mr-4 cursor-pointer text-sm`}> Active</p >
                {/* <p onClick={() => setCurrent('completed')} className={`${current === 'completed' ? 'text-blue-500' : 'text-inherit'} ${DarkTheme && current === 'completed' && 'text-blue-500'} cursor-pointer text-sm`}>Completed</p> */}
                < p onClick={() => setCurrent('completed')} className={`${current === 'completed' ? 'text-blue-500 dark:text-blue-500' : 'text-inherit'} cursor-pointer text-sm`}> Completed</p >
            </div >
            {modal && <ModalDeleteTask setModal={setModal} type='all' />}
        </div >


    )
}

export default HomePage