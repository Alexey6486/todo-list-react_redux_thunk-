import {authApi, AuthMeDataResponseType, LoginPayload} from "../../api/authApi";
import {handleNetworkError, handleServerAppError} from "../../utils/handleErrorsUtils";
import {errAC, loadingTC} from "../../app/appReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";

// const AUTH_ME = 'AUTH_ME';
// const LOGIN = 'LOGIN';

// export type AuthMeACType = {
//     type: typeof AUTH_ME
//     payload: AuthMeDataResponseType
//     isAuth: boolean
// };
// export type LoginACType = {
//     type: typeof LOGIN
//     email: string
//     password: string
//     rememberMe: boolean
// };

// export const authMeAC = (payload: AuthMeDataResponseType, isAuth: boolean): AuthMeACType => {
//     return {type: AUTH_ME, payload, isAuth};
// };
// const loginAC = (email: string, password: string, rememberMe: boolean): LoginACType => {
//     return {type: LOGIN, email, password, rememberMe,}
// }

//type ActionTypes = AuthMeACType | LoginACType | SetLoadingType | InitAppType | SetErrType;
//type DispatchTypes = (action: ActionTypes) => void;
//type ThunkType = ThunkAction<void, AppRootState, {}, ActionTypes>;

// export const loginReducer = (state: AuthStateType = initState, action: ActionTypes) => {
//     switch (action.type) {
//         case AUTH_ME:
//             return {...state, payload: action.payload, isAuth: action.isAuth};
//         default:
//             return state;
//     }
// };

export type AuthStateType = {
    userData: AuthMeDataResponseType
    isAuth: boolean
};

const initState = {
    userData: {
        id: 0,
        email: '',
        login: '',
    },
    isAuth: false
};

const slice = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {
        authMeAC(stateDraft, action: PayloadAction<{ userData: AuthMeDataResponseType, isAuth: boolean }>) {
            stateDraft.userData = action.payload.userData;
            stateDraft.isAuth = action.payload.isAuth;
        }
    },
})

export const loginReducer = slice.reducer;
export const authMeAC = slice.actions.authMeAC;

export const authMeTC = () => (dispatch: Dispatch<any>) => {
    dispatch(loadingTC(true));
    authApi.authMe()
        .then((res) => {
            if (res.resultCode === 0) {
                dispatch(authMeAC({userData: res.data, isAuth: true}));
                dispatch(errAC({err: null}));
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
export const loginTC = (payload: LoginPayload) => (dispatch: Dispatch<any>) => {
    dispatch(loadingTC(true));
    authApi.login(payload)
        .then((res) => {
            if (res.resultCode === 0) {
                dispatch(authMeTC());
                dispatch(errAC({err: null}));
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
export const logoutTC = () => (dispatch: Dispatch<any>) => {
    dispatch(loadingTC(true));
    authApi.logout()
        .then((res) => {
            if (res.resultCode === 0) {
                dispatch(authMeAC({userData: {id: 0, email: '', login: '',}, isAuth: false}));
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