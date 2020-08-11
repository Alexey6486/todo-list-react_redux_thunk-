import { ThunkDispatch, ThunkAction } from "redux-thunk";
import {AppRootState} from "./store";

const LOADING = 'LOADING';
export const loadingBarAC = (loading: boolean) => ({type: LOADING, loading} as const);

type ActionTypes = ReturnType<typeof loadingBarAC>;
export type AppGlobalStateType = {
    loading: boolean
}
const initState = {
    loading: false
}
export const appReducer = (state: AppGlobalStateType = initState, action: ActionTypes) => {
    switch (action.type) {
        case LOADING:
            return {...state, loading: action.loading};
        default:
            return state;
    }
}

type ThunkType = ThunkAction<void, AppRootState, {}, ActionTypes>;
export const loadingTC = (loading: boolean): ThunkType => (dispatch: ThunkDispatch<AppRootState, {}, ActionTypes>) => {
    dispatch(loadingBarAC(loading))
}