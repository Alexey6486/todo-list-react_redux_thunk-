import {TaskObjectModelUpdateType, TaskObjectUpdateType, TaskType, tskApi} from "../../../../api/tskApi";
import {AppRootState} from "../../../../app/store";
import {ThunkDispatch} from "redux-thunk";
import {loadingTC} from "../../../../app/appReducer";
import {handleNetworkError, handleServerAppError} from "../../../../utils/handleErrorsUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TdlsStateType} from "../../../../api/tdlApi";
import { addTdlAC, removeTdlAC } from "../tdls-reducer";

// action types
// const ADD_TASK = 'ADD-TASK';
// const REMOVE_TASK = 'REMOVE-TASK';
// const UPDATE_TASK = 'UPDATE_TASK';
// const GET_TASKS = 'GET_TASKS';

// AC, dispatch and other types
// type ActionType =
//     ReturnType<typeof addTaskAC> |
//     ReturnType<typeof removeTaskAC> |
//     ReturnType<typeof updateTaskAC> |
//     ReturnType<typeof addTdlAC> |
//     ReturnType<typeof removeTdlAC> |
//     ReturnType<typeof getTasksAC> |
//     SetErrType |
//     SetLoadingType ;
// type DispatchTasksType = (action: ActionType) => void;

// action creators
// export const getTasksAC = (tdlId: string, tasks: Array<TaskType>) => ({type: GET_TASKS, tasks, tdlId} as const);
// export const addTaskAC = (tdlId: string, task: TaskType) => ({type: ADD_TASK, tdlId, task} as const);
// export const removeTaskAC = (tdlId: string, tskId: string) => ({type: REMOVE_TASK, tdlId, tskId,} as const);
// export const updateTaskAC = (tdlId: string, tskId: string, taskObj: TaskObjectModelUpdateType) => ({
//     type: UPDATE_TASK, tdlId, tskId, taskObj } as const);

// init state + type
export type TasksStateType = { [key: string]: Array<TaskType> };
const initialState: TasksStateType = {};

// task reducer
// export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
//     switch (action.type) {
//         case GET_TASKS:
//             return !state[action.tdlId] ? {...state, [action.tdlId]: action.tasks} : {
//                 ...state,
//                 [action.tdlId]: action.tasks
//             };
//
//         case ADD_TASK:
//             const newTask = {
//                 title: action.task.title,
//                 description: action.task.description,
//                 status: action.task.status,
//                 priority: action.task.priority,
//                 startDate: action.task.startDate,
//                 deadline: action.task.deadline,
//                 id: action.task.id,
//                 todoListId: action.task.todoListId,
//                 order: action.task.order,
//                 addedDate: action.task.addedDate,
//             };
//             return !state[action.tdlId] ? {...state, [action.tdlId]: [newTask]} : {
//                 ...state,
//                 [action.tdlId]: [...state[action.tdlId], newTask]
//             };
//
//         case REMOVE_TASK:
//             return {...state, [action.tdlId]: state[action.tdlId].filter(task => task.id !== action.tskId)};
//
//         case UPDATE_TASK:
//             return {
//                 ...state,
//                 [action.tdlId]: state[action.tdlId].map(t => t.id === action.tskId ? {...t, ...action.taskObj} : t)
//             };
//
//         //add an empty tasks arr when a new associated tdl is added
//         case ADD_TODO_LIST:
//             return {...state, [action.item.id]: []};
//
//         //remove a tasks arr when an associated tdl is removed
//         case REMOVE_TODO_LIST:
//             const stateCopy2 = {...state};
//             delete stateCopy2[action.tdlId];
//             return stateCopy2;
//
//         default:
//             return state;
//     }
// };

const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        getTasksAC(state, action: PayloadAction<{ tdlId: string, tasks: Array<TaskType> }>) {
            state[action.payload.tdlId] = action.payload.tasks;
            // return !state[action.payload.tdlId] ? {...state, [action.payload.tdlId]: action.payload.tasks} : {
            //     ...state,
            //     [action.payload.tdlId]: action.payload.tasks
            // }
        },
        addTaskAC(state, action: PayloadAction<{ tdlId: string, task: TaskType }>) {
            const newTask = {
                title: action.payload.task.title,
                description: action.payload.task.description,
                status: action.payload.task.status,
                priority: action.payload.task.priority,
                startDate: action.payload.task.startDate,
                deadline: action.payload.task.deadline,
                id: action.payload.task.id,
                todoListId: action.payload.task.todoListId,
                order: action.payload.task.order,
                addedDate: action.payload.task.addedDate,
            };
            state[action.payload.task.todoListId].unshift(newTask)
        },
        removeTaskAC(state, action: PayloadAction<{ tdlId: string, tskId: string }>) {
            const tasks = state[action.payload.tdlId];
            const index = tasks.findIndex(task => task.id === action.payload.tskId);
            if (index > -1) {
                tasks.splice(index, 1);
            }

            //state[action.payload.tdlId] = state[action.payload.tdlId].filter(task => task.id !== action.payload.tskId);
        },
        updateTaskAC(state, action: PayloadAction<{ tdlId: string, tskId: string, taskObj: TaskObjectModelUpdateType }>) {
            const tasks = state[action.payload.tdlId];
            const index = tasks.findIndex(task => task.id === action.payload.tskId);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.taskObj};
            }

            //state[action.payload.tdlId] = state[action.payload.tdlId].map(t => t.id === action.payload.tskId ? {...t, ...action.payload.taskObj} : t);
        },
    },
    // extraReducers: {
    //     [addTdlAC.type]: (state, action: PayloadAction<{ item: TdlsStateType }>) => {
    //         state[action.payload.item.id] = [];
    //     },
    //     [removeTdlAC.type]: (state, action: PayloadAction<{ tdlId: string }>) => {
    //         const index = state[action.payload.tdlId].findIndex(task => task.id === action.payload.tdlId);
    //         if (index > -1) {
    //             state[action.payload.tdlId].splice(index, 1);
    //         }
    //         const stateCopy2 = {...state};
    //         delete stateCopy2[action.payload.tdlId];
    //         state = stateCopy2;
    //     },
    // }
    extraReducers: (builder) => {
        builder.addCase(addTdlAC, (state, action) => {
            state[action.payload.item.id] = [];
        });
        builder.addCase(removeTdlAC, (state, action) => {
            delete state[action.payload.tdlId];
        })
    }
});

export const tasksReducer = slice.reducer;
export const {addTaskAC, getTasksAC, removeTaskAC, updateTaskAC} = slice.actions;

// thunk creators
export const getTasksThunkCreator = (tdlId: string) => (dispatch: ThunkDispatch<AppRootState, {}, any>) => {
    dispatch(loadingTC(true));
    tskApi.getTasks(tdlId)
        .then(res => {
            dispatch(getTasksAC({tdlId: tdlId, tasks: res.items}));
            dispatch(loadingTC(false));
        })
        .catch(error => {
            handleNetworkError(error.message, dispatch);
        })
};
export const addTaskThunkCreator = (tdlId: string, title: string) => (dispatch: ThunkDispatch<AppRootState, {}, any>) => {
    dispatch(loadingTC(true));
    tskApi.addTask(tdlId, title)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(addTaskAC({tdlId: tdlId, task: res.data.item}));
                dispatch(loadingTC(false));
            } else {
                handleServerAppError(res, dispatch);
            }
        })
        .catch(error => {
            handleNetworkError(error.message, dispatch);
        })
};
export const deleteTaskThunkCreator = (tdlId: string, tskId: string) => (dispatch: ThunkDispatch<AppRootState, {}, any>) => {
    dispatch(loadingTC(true));
    tskApi.deleteTask(tdlId, tskId)
        .then(res => {
            dispatch(removeTaskAC({tdlId: tdlId, tskId: tskId}));
            dispatch(loadingTC(false));
        })
        .catch(error => {
            handleNetworkError(error.message, dispatch);
        })
};
export const updateTaskThunkCreator = (tdlId: string, tskId: string, taskObj: TaskObjectModelUpdateType) => (dispatch: ThunkDispatch<AppRootState, {}, any>, getState: () => AppRootState) => {
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
                dispatch(updateTaskAC({tdlId: tdlId, tskId: tskId, taskObj: model}));
                dispatch(loadingTC(false));
            } else {
                handleServerAppError(res, dispatch);
            }
        })
        .catch(error => {
            handleNetworkError(error.message, dispatch);
        })
};