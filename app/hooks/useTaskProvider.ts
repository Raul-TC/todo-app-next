'use client'
import { useContext } from "react";
import TaskContext from "../context/TaskContext";

export const useTaskProvider = () => {
    const data = useContext(TaskContext);
    if (data === undefined) {
        throw new Error('useMyContext debe ser usado dentro de un MyProvider');
    }
    const {
        userId,
        dbTasks,
        modal,
        setModal,
        localStorageKey,
        setLocalStorageKey,
        handleUpdateDragAndDrop,
        handleAddTask,
        handleDeleteTask,
        handleUpdateTask,
        tasksDone,
        pendingTask,
        current,
        setCurrent,
        filteredData } = data
    return {
        userId,
        dbTasks,
        modal,
        setModal,
        localStorageKey,
        setLocalStorageKey,
        handleUpdateDragAndDrop,
        handleAddTask,
        handleDeleteTask,
        handleUpdateTask,
        tasksDone,
        pendingTask,
        current,
        setCurrent,
        filteredData
    };
}