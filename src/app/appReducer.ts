import { ThunkDispatch, ThunkAction } from "redux-thunk";
import {AppRootState} from "./store";
import {authApi} from "../api/authApi";
import {authMeAC} from "../features/login/loginReducer";
import {handleNetworkError, handleServerAppError} from "../utils/handleErrorsUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// action types
// const LOADING = 'LOADING';
// const ERR = 'ERR';
// const INIT_APP = 'INIT_APP';

// action creators
// export const loadingBarAC = (loading: boolean) => ({type: LOADING, loading} as const);
// export const errAC = (err: string | null) => ({type: ERR, err} as const);
// export const initAppAC = (initialized: boolean) => ({type: INIT_APP, initialized} as const);

// Misc types
// export type SetErrType = {type: typeof ERR, err: string | null};
// export type SetLoadingType = {type: typeof LOADING, loading: boolean};
// export type InitAppType = {type: typeof INIT_APP, initialized: boolean};
// type ActionTypes = SetLoadingType | SetErrType | InitAppType;
// type ThunkType = ThunkAction<void, AppRootState, {}, ActionTypes>;

// init state + type
export type AppGlobalStateType = {loading: boolean, err: string | null | any, initialized: boolean};
const initState = {
    loading: false,
    err: null,
    initialized: false,
}

// app reducer
// export const appReducer = (state: AppGlobalStateType = initState, action: ActionTypes) => {
//     switch (action.type) {
//         case ERR:
//             return {...state, err: action.err};
//         case LOADING:
//             return {...state, loading: action.loading};
//         case INIT_APP:
//             return {...state, initialized: action.initialized}
//         default:
//             return state;
//     }
// }

const slice = createSlice({
    name: "app",
    initialState: initState,
    reducers: {
        initAppAC(state, action: PayloadAction<{initialized: boolean}>) {
            state.initialized = action.payload.initialized;
        },
        loadingBarAC(state, action: PayloadAction<{loading: boolean}>) {
            state.loading = action.payload.loading;
        },
        errAC(state, action: PayloadAction<{err: null | string | any}>) {
            state.err = action.payload.err;
        },
    }
})

export const appReducer = slice.reducer;
export const initAppAC = slice.actions.initAppAC;
export const loadingBarAC = slice.actions.loadingBarAC;
export const errAC = slice.actions.errAC;

// thunk creators
export const loadingTC = (loading: boolean) => (dispatch: ThunkDispatch<AppRootState, {}, any>) => {
    dispatch(loadingBarAC({loading: loading}))
}
export const errTC = (err: string | null) => (dispatch: ThunkDispatch<AppRootState, {}, any>) => {
    dispatch(errAC({err: err}));
}
export const initAppTC = () => (dispatch: ThunkDispatch<AppRootState, {}, any >) => {
    authApi.authMe()
        .then((res) => {
            if (res.resultCode === 0) {
                dispatch(authMeAC({userData: res.data, isAuth: true}));
                dispatch(errAC({err: null}));
            } else {
                handleServerAppError(res, dispatch);
            }
            dispatch(initAppAC({initialized: true}));
        })
        .catch((error) => {
            handleNetworkError(error, dispatch);
        })
}