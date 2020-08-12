import {ResponseType} from "../api/tskApi";
import {errAC, errTC, loadingBarAC, loadingTC, SetErrType, SetLoadingType} from "../app/appReducer";
import {Dispatch} from "react";

export const handleServerAppError = <D>(res: ResponseType<D>, dispatch: Dispatch<SetErrType | SetLoadingType>) => {
    if (res.messages.length) {
        dispatch(errAC(res.messages[0]));
        dispatch(loadingBarAC(false));
    } else {
        dispatch(errAC('some error'));
        dispatch(loadingBarAC(false));
    }
}

export const handleNetworkError = (error: string, dispatch: Dispatch<SetErrType | SetLoadingType>) => {
    dispatch(errAC(error));
    dispatch(loadingBarAC(false));
}