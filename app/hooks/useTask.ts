import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTaskProvider } from "./useTaskProvider";

export interface useTaskProps {
    isNewTask?: boolean,
    id?: number | undefined,
    isDone?: boolean,
    content?: string,
    isNew?: boolean,
    updatedAt?: Date
}
export function useTask({ id, content, isDone, updatedAt }: useTaskProps) {
    const { userId, handleAddTask, handleUpdateTask } = useTaskProvider()
    const [taskState, setTaskState] = useState({
        task: content || '',
        taskEdited: content || '',
        isCheck: isDone || false,
        isEditable: false,
        tries: 0,
        modalInTask: false,
        timePassed: { text: '', time: 0 }
    });

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGElement> | React.KeyboardEvent<HTMLInputElement>) => {
        e?.preventDefault();
        setTaskState(prevState => ({ ...prevState, tries: prevState.tries + 1 }));

        if (!taskState.task.trim()) {
            setTaskState(prevState => ({ ...prevState, task: '' }));
            toast.error("😡 No puedes agregar notas vacías", { position: "bottom-left" });
            return;
        }

        if (taskState.isEditable) {
            if (taskState.taskEdited !== content && taskState.taskEdited !== '') {
                handleUpdateTask({ idTask: id!, status: taskState.isCheck, type: 'edit', content: taskState.taskEdited, isNew: false, userId: userId!, exist: true });
                setTaskState({ ...taskState, isEditable: false, isCheck: false, timePassed: { text: "0", time: 0 } });
            } else {
                setTaskState(prevState => ({ ...prevState, isEditable: false }));
            }
        } else {
            handleAddTask({ task: taskState.task, userId: userId! });
            setTaskState(prevState => ({ ...prevState, task: '' }));
        }
    }, [taskState, content, handleAddTask, handleUpdateTask, id, userId]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskState(prevState => ({ ...prevState, task: e.target.value }));
    }

    const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setTaskState(prevState => ({ ...prevState, isCheck: !taskState.isCheck, timePassed: { text: "", time: 0 } }));
        handleUpdateTask({ idTask: id!, status: !isDone, type: 'done', userId: userId!, exist: true });

    }

    useEffect(() => {
        const timer = setTimeout(() => setTaskState(prevState => ({ ...prevState, tries: 0 })), 10000);
        if (taskState.tries === 5) {
            toast.warning("No hagas spam!, espera 8 segundos para seguir agregando Tareas");
        }
        return () => clearTimeout(timer);
    }, [taskState.tries]);

    const timeSince = ({ date }: { date: Date }) => {
        const currentDate = new Date()
        const upDate = new Date(date)
        const difference = currentDate.getTime() - upDate.getTime()
        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        let timeText;

        if (seconds < 60) {
            timeText = `${seconds} seconds ago`;
        } else if
            (seconds < 3600) {
            timeText = `${minutes} minutes ago`;
        }
        else if (hours < 86400) {
            timeText = `${hours} ${hours > 1 ? 'hours ago' : 'hour ago'}`;
        } else {
            timeText = `${days} ${days > 1 ? 'days ago' : 'day ago'}`;
        }
        return { timeText, seconds }
    }

    useEffect(() => {
        if (updatedAt) {
            const intervalId = setInterval(() => {
                const { timeText, seconds } = timeSince({ date: updatedAt });
                setTaskState(prevState => ({ ...prevState, timePassed: { text: timeText, time: seconds } }));
                if (seconds > 60) clearInterval(intervalId);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [updatedAt]);


    return {
        userId,
        setTaskState,
        task: taskState.task,
        taskEdited: taskState.taskEdited,
        isCheck: taskState.isCheck,
        isEditable: taskState.isEditable,
        tries: taskState.tries,
        modalInTask: taskState.modalInTask,
        timePassed: taskState.timePassed,
        handleSubmit,
        handleChange,
        handleChangeCheckbox
    }
}