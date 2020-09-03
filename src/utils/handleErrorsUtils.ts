import {ResponseType} from "../api/tskApi";
import {errAC, loadingBarAC} from "../app/appReducer";
import {Dispatch} from "react";

export const handleServerAppError = <D>(res: ResponseType<D>, dispatch: Dispatch<any>) => {
    if (res.messages.length) {
        dispatch(errAC({err: res.messages[0]}));
        dispatch(loadingBarAC({loading: false}));
    } else {
        dispatch(errAC({err: 'some error'}));
        dispatch(loadingBarAC({loading: false}));
    }
}

export const handleNetworkError = (error: string, dispatch: Dispatch<any>) => {
    dispatch(errAC({err: error}));
    dispatch(loadingBarAC({loading: false}));
}