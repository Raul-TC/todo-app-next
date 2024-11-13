'use client'

export const StatusTask = ({ current, setCurrent }: { current: string, setCurrent: React.Dispatch<React.SetStateAction<string>> }) => {

    const status = ['all', 'active', 'completed']
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
