import {ADD_TODO_LIST, addTdlAC, REMOVE_TODO_LIST, removeTdlAC} from "../tdls-reducer";
import {TaskObjectModelUpdateType, TaskObjectUpdateType, TaskType, tskApi} from "../../../../api/tskApi";
import {AppRootState} from "../../../../app/store";
import {ThunkDispatch} from "redux-thunk";
import {errTC, loadingTC, SetErrType, SetLoadingType} from "../../../../app/appReducer";
import {handleNetworkError, handleServerAppError} from "../../../../utils/handleErrorsUtils";

// action types
const ADD_TASK = 'ADD-TASK';
const REMOVE_TASK = 'REMOVE-TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const GET_TASKS = 'GET_TASKS';

// AC, dispatch and other types
type ActionType =
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof updateTaskAC> |
    ReturnType<typeof addTdlAC> |
    ReturnType<typeof removeTdlAC> |
    ReturnType<typeof getTasksAC> |
    SetErrType |
    SetLoadingType ;
type DispatchTasksType = (action: ActionType) => void;

// action creators
export const getTasksAC = (tdlId: string, tasks: Array<TaskType>) => ({type: GET_TASKS, tasks, tdlId} as const);
export const addTaskAC = (tdlId: string, task: TaskType) => ({type: ADD_TASK, tdlId, task} as const);
export const removeTaskAC = (tdlId: string, tskId: string) => ({type: REMOVE_TASK, tdlId, tskId,} as const);
export const updateTaskAC = (tdlId: string, tskId: string, taskObj: TaskObjectModelUpdateType) => ({
    type: UPDATE_TASK, tdlId, tskId, taskObj } as const);

// init state + type
export type TasksStateType = { [key: string]: Array<TaskType> };
const initialState: TasksStateType = {};

// task reducer
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case GET_TASKS:
            return !state[action.tdlId] ? {...state, [action.tdlId]: action.tasks} : {
                ...state,
                [action.tdlId]: action.tasks
            };

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
            return !state[action.tdlId] ? {...state, [action.tdlId]: [newTask]} : {
                ...state,
                [action.tdlId]: [...state[action.tdlId], newTask]
            };

        case REMOVE_TASK:
            return {...state, [action.tdlId]: state[action.tdlId].filter(task => task.id !== action.tskId)};

        case UPDATE_TASK:
            return {
                ...state,
                [action.tdlId]: state[action.tdlId].map(t => t.id === action.tskId ? {...t, ...action.taskObj} : t)
            };

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

// thunk creators
export const getTasksThunkCreator = (tdlId: string) => (dispatch: ThunkDispatch<AppRootState, {}, ActionType>) => {
    dispatch(loadingTC(true));
    tskApi.getTasks(tdlId)
        .then(res => {
            dispatch(getTasksAC(tdlId, res.items));
            dispatch(loadingTC(false));
        })
        .catch(error => {
            handleNetworkError(error.message, dispatch);
        })
};
export const addTaskThunkCreator = (tdlId: string, title: string) => (dispatch: ThunkDispatch<AppRootState, {}, ActionType>) => {
    dispatch(loadingTC(true));
    tskApi.addTask(tdlId, title)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(addTaskAC(tdlId, res.data.item));
                dispatch(loadingTC(false));
            } else {
                handleServerAppError(res, dispatch);
            }
        })
        .catch(error => {
            handleNetworkError(error.message, dispatch);
        })
};
export const deleteTaskThunkCreator = (tdlId: string, tskId: string) => (dispatch: ThunkDispatch<AppRootState, {}, ActionType>) => {
    dispatch(loadingTC(true));
    tskApi.deleteTask(tdlId, tskId)
        .then(res => {
            dispatch(removeTaskAC(tdlId, tskId));
            dispatch(loadingTC(false));
        })
        .catch(error => {
            handleNetworkError(error.message, dispatch);
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
            if (res.resultCode === 0) {
                dispatch(updateTaskAC(tdlId, tskId, model));
                dispatch(loadingTC(false));
            } else {
                handleServerAppError(res, dispatch);
            }
        })
        .catch(error => {
            handleNetworkError(error.message, dispatch);
        })
};