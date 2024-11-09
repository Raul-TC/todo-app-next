import React from 'react';
import '@/app/globals.css'; // Importa aquí tu estilo de shimmer

const TaskSkeleton = () => {
    return (
        <div className='-mt-[44px] w-full md:max-w-2xl mx-auto rounded-md divide-y-2 overflow-hidden bg-lightBg dark:bg-darkBg'>

            {
                [...Array(6)].map((_, index) => (

                    <BodySkeleton key={index * 2} />
                ))
            }
        </div>

    )
};

const BodySkeleton = () => {
    return (
        <div className="flex items-center p-6 bg-containerLight animate-pulse dark:bg-containerDark gap-4 w-full h-full max-w-2xl mx-auto ">
            {/* Checkbox */}
            <div className="w-8 h-8 bg-textDark dark:bg-darkBg rounded-full"></div>

            {/* Texto */}
            <div className="flex-1 flex items-center h-full justify-center bg-textDark dark:bg-darkBg rounded-md">
                <div className="h-8 dark:bg-darkBg rounded-md"></div>
            </div>

            {/* Botones */}
            <div className="flex gap-4 ">
                <div className="w-8 h-8 bg-textDark dark:bg-darkBg rounded-md"></div>
                <div className="w-8 h-8 bg-textDark dark:bg-darkBg rounded-md"></div>
            </div>
        </div>
    )
}
export default TaskSkeleton;
