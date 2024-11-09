import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { DraggableList } from "../components/DraggableList"
import { StatusCount } from "../components/StatusCount"
import { StatusTask } from "../components/StatusTask"
import { ClearCompleted } from "../components/ClearCompleted"

export default async function TodoList() {
    const session = await getServerSession()

    console.log(session, 'ddddd')
    if (!session) redirect('/auth/login')
    return (
        <>
            {session &&

                <section className={`dark:bg-darkBg dark:text-textDark bg-lightBg text-textLight transition-colors duration-300 ease-in  min-h-[calc(100vh-228px)] w-full h-full pb-24`}>
                    <div className='dark:bg-containerDark dark:text-textDark bg-bodyLight text-textLight w-[90%] mx-auto flex items-center rounded-md justify-center divide-[#d1cece] flex-col transition-colors duration-300 ease-in md:max-w-2xl' >
                        <DraggableList />
                        <div className='dark:bg-containerDark dark:text-textOpacity bg-containerLight w-full h-full m-auto flex rounded-b-md items-center justify-between p-4 text-base transition-colors duration-300 ease-in overflow-hidden border-t-[.15px] border-[#e0dede49]'>
                            <StatusCount />
                            <div className='w-full mt-4 py-4 items-center justify-center m-auto rounded-md md:max-w-2xl hidden overflow-hidden lg:flex md:w-auto md:m-0 md:self-center text-textLight transition-colors duration-300 ease-in'>
                                <StatusTask />
                            </div>
                            <ClearCompleted />
                        </div>
                    </div>
                    <div className='dark:bg-containerDark dark:text-textDark overflow-hidden bg-containerLight text-textLight w-[90%] flex mt-4 py-4 items-center justify-center m-auto rounded-md  mb-8 md:py-5 lg:hidden animate-tasksAnimate transition-colors duration-300 ease-in md:max-w-2xl' >
                        <StatusTask />
                    </div >

                    <p className='text-center md:mt-8'>Drag and drop to reorder list</p>
                </section>


            }
        </>
    )
}
