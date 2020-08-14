import { ThunkDispatch, ThunkAction } from "redux-thunk";
import {AppRootState} from "./store";
import {authApi} from "../api/authApi";
import {authMeAC, AuthMeACType} from "../features/login/loginReducer";
import {handleNetworkError, handleServerAppError} from "../utils/handleErrorsUtils";

// action types
const LOADING = 'LOADING';
const ERR = 'ERR';
const INIT_APP = 'INIT_APP';

// action creators
export const loadingBarAC = (loading: boolean) => ({type: LOADING, loading} as const);
export const errAC = (err: string | null) => ({type: ERR, err} as const);
export const initAppAC = (initialized: boolean) => ({type: INIT_APP, initialized} as const);

// Misc types
export type SetErrType = {type: typeof ERR, err: string | null};
export type SetLoadingType = {type: typeof LOADING, loading: boolean};
export type InitAppType = {type: typeof INIT_APP, initialized: boolean};
type ActionTypes = SetLoadingType | SetErrType | InitAppType | AuthMeACType;
type ThunkType = ThunkAction<void, AppRootState, {}, ActionTypes>;

// init state + type
export type AppGlobalStateType = {loading: boolean, err: string | null, initialized: boolean};
const initState = {
    loading: false,
    err: null,
    initialized: false,
}

// app reducer
export const appReducer = (state: AppGlobalStateType = initState, action: ActionTypes) => {
    switch (action.type) {
        case ERR:
            return {...state, err: action.err};
        case LOADING:
            return {...state, loading: action.loading};
        case INIT_APP:
            return {...state, initialized: action.initialized}
        default:
            return state;
    }
}

// thunk creators
export const loadingTC = (loading: boolean): ThunkType => (dispatch: ThunkDispatch<AppRootState, {}, ActionTypes>) => {
    dispatch(loadingBarAC(loading))
}
export const errTC = (err: string | null): ThunkType => (dispatch: ThunkDispatch<AppRootState, {}, ActionTypes>) => {
    dispatch(errAC(err));
}
export const initAppTC = () => (dispatch: ThunkDispatch<AppRootState, {}, ActionTypes>) => {
    authApi.authMe()
        .then((res) => {
            if (res.resultCode === 0) {
                dispatch(authMeAC(res.data, true));
                dispatch(errAC(null));
            } else {
                handleServerAppError(res, dispatch);
            }
            dispatch(initAppAC(true));
        })
        .catch((error) => {
            handleNetworkError(error, dispatch);
        })
}