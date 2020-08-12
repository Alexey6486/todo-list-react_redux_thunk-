import { ThunkDispatch, ThunkAction } from "redux-thunk";
import {AppRootState} from "./store";

// action types
const LOADING = 'LOADING';
const ERR = 'ERR';

// action creators
export const loadingBarAC = (loading: boolean) => ({type: LOADING, loading} as const);
export const errAC = (err: string | null) => ({type: ERR, err} as const);

// Misc types
export type SetErrType = {type: typeof ERR, err: string | null};
export type SetLoadingType = {type: typeof LOADING, loading: boolean};
type ActionTypes = SetLoadingType | SetErrType;
type ThunkType = ThunkAction<void, AppRootState, {}, ActionTypes>;

// init state + type
export type AppGlobalStateType = {loading: boolean, err: string | null};
const initState = {
    loading: false,
    err: null,
}

// app reducer
export const appReducer = (state: AppGlobalStateType = initState, action: ActionTypes) => {
    switch (action.type) {
        case ERR:
            return {...state, err: action.err};
        case LOADING:
            return {...state, loading: action.loading};
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