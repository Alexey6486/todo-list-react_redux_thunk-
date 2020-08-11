import {ADD_TODO_LIST, AddTdlAC, REMOVE_TODO_LIST, RemoveTdlAC} from "../tdls-reduser";
import {tskApi, TaskObjectModelUpdateType, TaskObjectUpdateType, TaskType} from "../../../../api/tskApi";
import {AppRootState} from "../../../../app/store";
import {ThunkDispatch} from "redux-thunk";
import {loadingBarAC, loadingTC} from "../../../../app/AppReducer";

const ADD_TASK = 'ADD-TASK';
const REMOVE_TASK = 'REMOVE-TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const GET_TASKS = 'GET_TASKS';

type ActionType =
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof updateTaskAC> |
    ReturnType<typeof AddTdlAC> |
    ReturnType<typeof RemoveTdlAC> |
    ReturnType<typeof getTasksAC> |
    ReturnType<typeof loadingBarAC>;

type DispatchTasksType = (action: ActionType) => void;

const getTasksAC = (tdlId: string, tasks: Array<TaskType>) => ({type: GET_TASKS, tasks, tdlId} as const);

export const addTaskAC = (tdlId: string, task: TaskType) => ({type: ADD_TASK, tdlId, task} as const);

export const removeTaskAC = (tdlId: string, tskId: string) => ({type: REMOVE_TASK, tdlId, tskId, } as const);

export const updateTaskAC = (tdlId: string, tskId: string, taskObj: TaskObjectModelUpdateType) => ({type: UPDATE_TASK, tdlId, tskId, taskObj} as const);

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {

        case GET_TASKS:
            return !state[action.tdlId] ? {...state, [action.tdlId]: action.tasks} : {...state, [action.tdlId]: action.tasks};

        case ADD_TASK:
            const newTask = {
                title: action.task.title,
                description: action.task.description,
                status: action.task.status,
                priority: action.task.priority,
                startDate: action.task.startDate,
                deadline: action.task.deadline,
                id: action.task.id,
                todoListId: action.task.todoListId,
                order: action.task.order,
                addedDate: action.task.addedDate,
            };
            return !state[action.tdlId] ? {...state, [action.tdlId]: [newTask]} : {...state, [action.tdlId]: [...state[action.tdlId], newTask]};

        case REMOVE_TASK:
            return {...state, [action.tdlId]: state[action.tdlId].filter(task => task.id !== action.tskId)};

        case UPDATE_TASK:
            return {...state, [action.tdlId]: state[action.tdlId].map(t => t.id === action.tskId ? {...t, ...action.taskObj} : t)};

        //add an empty tasks arr when a new associated tdl is added
        case ADD_TODO_LIST:
            return {...state, [action.item.id]: []};

        //remove a tasks arr when an associated tdl is removed
        case REMOVE_TODO_LIST:
            const stateCopy2 = {...state};
            delete stateCopy2[action.tdlId];
            return stateCopy2;

        default:
            return state;
    }
};

export const getTasksThunkCreator = (tdlId: string) => (dispatch: ThunkDispatch<AppRootState, {}, ActionType>) => {
    dispatch(loadingTC(true));
    tskApi.getTasks(tdlId)
        .then(res => {
            dispatch(getTasksAC(tdlId, res.items));
            dispatch(loadingTC(false));
        })
};
export const addTaskThunkCreator = (tdlId: string, title: string) => (dispatch: ThunkDispatch<AppRootState, {}, ActionType>) => {
    dispatch(loadingTC(true));
    tskApi.addTask(tdlId, title)
        .then(res => {
            dispatch(addTaskAC(tdlId, res.data.item));
            dispatch(loadingTC(false));
        })
};
export const deleteTaskThunkCreator = (tdlId: string, tskId: string) => (dispatch: ThunkDispatch<AppRootState, {}, ActionType>) => {
    dispatch(loadingTC(true));
    tskApi.deleteTask(tdlId, tskId)
        .then(res => {
            dispatch(removeTaskAC(tdlId, tskId));
            dispatch(loadingTC(false));
        })
};
export const updateTaskThunkCreator = (tdlId: string, tskId: string, taskObj: TaskObjectModelUpdateType) => (dispatch: ThunkDispatch<AppRootState, {}, ActionType>, getState: () => AppRootState) => {
    dispatch(loadingTC(true));
    const state = getState();
    const task = state.tasks[tdlId].find(task => task.id === tskId);
    if (!task) {
        return;
    }
    const model: TaskObjectUpdateType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...taskObj
    }
    tskApi.updateTask(tdlId, tskId, model)
        .then(res => {
            dispatch(updateTaskAC(tdlId, tskId, model));
            dispatch(loadingTC(false));
        })
}