const data = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Project 1'},
        'task-2': { id: 'task-2', content: 'Project 2'},
        'task-3': { id: 'task-3', content: 'Project 3'},
        'task-4': { id: 'task-4', content: 'Project 4'},
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To Do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
            numTasks: 4,
        },
        'column-2': {
            id: 'column-2',
            title: 'In Progress',
            taskIds: [],
            numTasks: 0,
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: [],
            numTasks: 0,
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
    numberOfTasks: 4,
    addedProject: '',
    taskCounter: 4,
};

export default data;