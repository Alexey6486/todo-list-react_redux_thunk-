import {combineReducers} from "redux";
import {tasksReducer} from "../features/AllTdls/Tdls/Tsks/tasks-reducer";
import {tdlsReducer} from "../features/AllTdls/Tdls/tdls-reducer";
import thunkMiddleware from 'redux-thunk';
import {appReducer} from "./appReducer";
import {loginReducer} from "../features/login/loginReducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    tdls: tdlsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: loginReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>

//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})

// @ts-ignore
window.store = store;