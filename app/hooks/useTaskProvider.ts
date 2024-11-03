'use client'
import { useContext } from "react";
import TaskContext from "../context/TaskContext";

export const useTaskProvider = () => {
    const data = useContext(TaskContext);
    if (data === undefined) {
        throw new Error('useMyContext debe ser usado dentro de un MyProvider');
    }
    const { dbTasks,
        darkTheme,
        handleTheme,
        // animateTask,
        classDrag,
        setclassDrag,
        handleUpdateDragAndDrop,
        handleAddTask,
        handleDeleteTask,
        handleUpdateTask,
        tasksDone,
        // setTasksDone,
        pendingTask,
        // setPendingTask,
        current,
        setCurrent,
        filteredData } = data
    return {
        dbTasks,
        darkTheme,
        handleTheme,
        // animateTask,
        classDrag,
        setclassDrag,
        handleUpdateDragAndDrop,
        handleAddTask,
        handleDeleteTask,
        handleUpdateTask,
        tasksDone,
        // setTasksDone,
        pendingTask,
        // setPendingTask,
        current,
        setCurrent,
        filteredData
    };
}