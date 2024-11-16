'use client'

import { useTasksStore } from "../stores/tasksStore";

export const StatusTask = () => {
    const current = useTasksStore((state) => state.current);
    const setCurrent = useTasksStore((state) => state.setCurrent);
    const status = ['all', 'active', 'completed'] as const
    return (
        <>
            {status.map((el, index) => <p
                key={el + index}
                onClick={() => setCurrent(el)}
                className={`${current === el ? 'text-active  dark:text-blue-500' : 'text-inherit'} cursor-pointer transition-colors ease-in duration-300 text-base dark:md:hover:text-gray-200 md:hover:text-darkBg md:hover:font-bold capitalize mx-1`}>
                {el}
            </p>)}
        </>)
}
