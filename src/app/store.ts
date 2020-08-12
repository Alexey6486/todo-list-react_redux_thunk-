import { createStore, combineReducers, applyMiddleware } from "redux";
import {tasksReducer} from "../features/AllTdls/Tdls/Tsks/tasks-reducer";
import {tdlsReducer} from "../features/AllTdls/Tdls/tdls-reducer";
import thunkMiddleware from 'redux-thunk';
import {appReducer} from "./appReducer";

const rootReducer = combineReducers({
    tdls: tdlsReducer,
    tasks: tasksReducer,
    app: appReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;