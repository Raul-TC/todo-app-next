'use client'
import { closestCenter, DndContext } from '@dnd-kit/core'
import { useTaskProvider } from '../hooks/useTaskProvider'
import { FormInput } from './FormInput'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'

export const DraggableList = () => {
    const { filteredData, current, handleUpdateDragAndDrop } = useTaskProvider()

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={e => handleUpdateDragAndDrop({ e })}
            modifiers={[restrictToVerticalAxis]}
        >
            <div className={`dark:bg-containerDark bg-containerLight divide-y-[0.15px] dark:text-textDark -mt-[36px] rounded-t-md overflow-hidden text-textLight w-full transition-colors duration-300 ease-in group flex flex-col items-center justify-between`}>
                <SortableContext
                    items={filteredData.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                >

                    {filteredData.length > 0 ? filteredData.map((tsk) =>
                        <FormInput key={tsk.id} isNewTask id={tsk.id} isDone={tsk.isDone} content={tsk.content} isNew={tsk.isNew} />
                    )
                        :
                        <p className='py-4 text-center w-full h-full'>
                            {`${current === 'completed' ? 'You have not completed any tasks 🥹' : '✍🏻 Add a new task '}`}
                        </p>
                    }

                </SortableContext>
            </div>
        </DndContext>
    )
}
