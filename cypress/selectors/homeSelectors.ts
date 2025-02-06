export const homeSelectors = {
    homePageText: '[data-test="welcome-text"]',
    tasks: '[data-test^="taskContainer"]',
    POSTApiTasks: '/api/tasks',
    toastNewTaskPendingText: 'Creando nueva Tarea',
    toastNewTaskSuccessText: 'Tarea agregada con exito',
    toastEmptyNewTaskText: '😡 No puedes agregar notas vacías',
    addTaskButton: '[data-test="addTask"]',
    inputCreateTask: '[data-test="todoInput"]',
    editTaskIcon: '[data-test="edit-task"]',
    deleteTaskIcon: '[data-test="deleteTask"]',
    modalDelete: '[data-test="modalDelete"]',
    modalCancelOption: '[data-test="noCancel"]',
    modalYesDeleteOption: '[data-test="yesDelete"]',
    inputEditTask: '[data-test="form-edit"]',
    confirmTaskIcon: '[data-test="confirm-edit-task"]',
    taskContent: `Editando task new hora ${new Date().toLocaleTimeString()}`,
    toastEditTaskSuccess: 'Tarea actualizada con éxito!',
    textTaxt: '[data-test="taskText"]',
    toastPendingDeleteTask: 'Eliminando Tarea',
    toastSuccessDelete: 'Tarea eliminada con exito'

}