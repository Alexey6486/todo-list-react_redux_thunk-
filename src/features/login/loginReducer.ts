import {authApi, AuthMeDataResponseType, LoginPayload} from "../../api/authApi";
import {AppRootState} from "../../app/store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {handleNetworkError, handleServerAppError} from "../../utils/handleErrorsUtils";
import {errAC, initAppAC, InitAppType, loadingTC, SetErrType, SetLoadingType} from "../../app/appReducer";

const AUTH_ME = 'AUTH_ME';
const LOGIN = 'LOGIN';

export type AuthMeACType = {
    type: typeof AUTH_ME
    payload: AuthMeDataResponseType
    isAuth: boolean
};
export type LoginACType = {
    type: typeof LOGIN
    email: string
    password: string
    rememberMe: boolean
};

export const authMeAC = (payload: AuthMeDataResponseType, isAuth: boolean): AuthMeACType => {
    return {type: AUTH_ME, payload, isAuth};
};
const loginAC = (email: string, password: string, rememberMe: boolean): LoginACType => {
    return {type: LOGIN, email, password, rememberMe,}
}

type ActionTypes = AuthMeACType | LoginACType | SetLoadingType | InitAppType | SetErrType;
type DispatchTypes = (action: ActionTypes) => void;

export type AuthStateType = {
    payload: AuthMeDataResponseType
    isAuth: boolean
};

const initState: AuthStateType = {
    payload: {
        id: 0,
        email: '',
        login: '',
    },
    isAuth: false
};

export const loginReducer = (state: AuthStateType = initState, action: ActionTypes) => {
    switch (action.type) {
        case AUTH_ME:
            return {...state, payload: action.payload, isAuth: action.isAuth};
        default:
            return state;
    }
};

type ThunkType = ThunkAction<void, AppRootState, {}, ActionTypes>;
export const authMeTC = (): ThunkType => (dispatch: ThunkDispatch<AppRootState, {}, ActionTypes>) => {
    dispatch(loadingTC(true));
    authApi.authMe()
        .then((res) => {
            if (res.resultCode === 0) {
                dispatch(authMeAC(res.data, true));
                dispatch(errAC(null));
            } else {
                handleServerAppError(res, dispatch);
            }
        })
        .catch((error) => {
            handleNetworkError(error, dispatch);
        })
        .finally(() => {
            dispatch(loadingTC(false));
        })
};
export const loginTC = (payload: LoginPayload): ThunkType => (dispatch: ThunkDispatch<AppRootState, {}, ActionTypes>) => {
    dispatch(loadingTC(true));
    authApi.login(payload)
        .then((res) => {
            if (res.resultCode === 0) {
                dispatch(authMeTC());
                dispatch(errAC(null));
            } else {
               handleServerAppError(res, dispatch);
            }
        })
        .catch((error) => {
            handleNetworkError(error, dispatch);
        })
        .finally(() => {
            dispatch(loadingTC(false));
        })
};
export const logoutTC = (): ThunkType => (dispatch: ThunkDispatch<AppRootState, {}, ActionTypes>) => {
    dispatch(loadingTC(true));
    authApi.logout()
        .then((res) => {
            if (res.resultCode === 0) {
                dispatch(authMeAC({ id: 0, email: '', login: '', }, false));
            } else {
                handleServerAppError(res, dispatch);
            }
        })
        .catch((error) => {
            handleNetworkError(error, dispatch);
        })
        .finally(() => {
            dispatch(loadingTC(false));
        })
}