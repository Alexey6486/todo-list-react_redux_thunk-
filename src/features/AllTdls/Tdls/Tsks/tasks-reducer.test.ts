import {v1} from "uuid";
import {addTaskAC, removeTaskAC, tasksReducer, TasksStateType, updateTaskAC} from "./tasks-reducer";
import {addTdlAC, removeTdlAC, TdlsReduxStateType} from "../tdls-reducer";
import {PriorityTypes, StatusTypes, TaskObjectModelUpdateType, TaskType} from "../../../../api/tskApi";

let startState: TasksStateType;
beforeEach(() => {
    startState = {
        ['01']: [
            { description: 'string', title: 'string', status: StatusTypes.New, priority: PriorityTypes.Middle,
                startDate: 'string', deadline: 'string', id: 'tsk_11', todoListId: '01', order: 1, addedDate: 'string'},
            { description: 'string', title: 'string', status: StatusTypes.New, priority: PriorityTypes.Middle,
                startDate: 'string', deadline: 'string', id: 'tsk_12', todoListId: '01', order: 2, addedDate: 'string'},
        ],
        ['02']: [
            { description: 'string', title: 'string', status: StatusTypes.New, priority: PriorityTypes.Middle,
                startDate: 'string', deadline: 'string', id: 'tsk_21', todoListId: '02', order: 1, addedDate: 'string'},
            { description: 'string', title: 'string', status: StatusTypes.New, priority: PriorityTypes.Middle,
                startDate: 'string', deadline: 'string', id: 'tsk_22', todoListId: '02', order: 2, addedDate: 'string'},
        ]
    }
})

test('Tasks reducer must add a new task.', () => {

    const newTask = { title: 'new test task', description: 'new test task', status: StatusTypes.New,
        priority: PriorityTypes.Middle, startDate: 'new test task', deadline: 'new test task', id: 'new test task',
        todoListId: 'new test task', order: 3, addedDate: 'new test task',
    };

    const endState = tasksReducer(startState, addTaskAC('01', newTask));

    expect(endState['01'].length).toBe(3);
    expect(endState['02'].length).toBe(2);
});

test('Tasks reducer must remove the target task.', () => {

    const endState = tasksReducer(startState, removeTaskAC('01', 'tsk_11'));

    expect(endState['01'].length).toBe(1);
    expect(endState['02'].length).toBe(2);
    expect(endState['01'].every(t => t.id != 'tsk_11')).toBeTruthy();
});

test('Tasks reducer must change checkbox/status at the target task.', () => {
    const taskUpdated: TaskObjectModelUpdateType = { status: StatusTypes.Completed, };
    const endState = tasksReducer(startState, updateTaskAC('02', 'tsk_22', taskUpdated));
    expect(endState['02'][1].status).toBe(StatusTypes.Completed);
    expect(endState['01'][0].status).toBe(StatusTypes.New);
});

test('Tasks reducer must change a task name at the target task.', () => {
    const taskUpdated: TaskObjectModelUpdateType = { title: 'updated_title', };
    const endState = tasksReducer(startState, updateTaskAC('02', 'tsk_21', taskUpdated));
    expect(endState['02'][0].title).toBe('updated_title');
    expect(endState['01'][0].title).toBe('string');
});

test('Tasks reducer must add an empty array for a new tdl.', () => {

    const newTdl = {id: '03', addedDate: 'string', title: 'string_01', order: 1};
    const endState = tasksReducer(startState, addTdlAC(newTdl));

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== '01' && k !== '02');
    if (!newKey) {
        throw Error('new key should be added');
    }
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([]);
});

test('Tasks reducer must delete tasks when tdl is deleted.', () => {
    const action = removeTdlAC('02');
    const endState = tasksReducer(startState, action);
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState['02']).not.toBeDefined();
});
