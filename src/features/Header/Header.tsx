import React, {useEffect} from "react";
import s from './Header.module.css';
import {LinearProgress, createMuiTheme, ThemeProvider} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {AppGlobalStateType} from "../../app/appReducer";
import {authMeTC, AuthStateType, logoutTC} from "../login/loginReducer";
import {NavLink} from "react-router-dom";

export const Header = () => {

    const appState = useSelector<AppRootState, AppGlobalStateType>(state => state.app);
    const {loading} = appState;

    const dispatch = useDispatch();
    const authState = useSelector<AppRootState, AuthStateType>(state => state.auth);
    const {isAuth} = authState;

    const theme = createMuiTheme({
        palette: {
            secondary: {
                main: '#999',
            },
        },
    });

    useEffect(() => {

    }, [loading]);

    const loadingBar = loading &&
        <div className={s.loadingBar}>
            <ThemeProvider theme={theme}>
                <LinearProgress color="secondary"/>
            </ThemeProvider>
        </div>
    ;

    const onLogoutHandler = () => {
        dispatch(logoutTC());
    }
    return (
        <div className={s.header}>
            <div className={'container'}>
                <div className={s.headerContent}>
                    <div className={s.headerContent__title}>Header</div>
                    {
                        isAuth
                            ? <div className={s.headerContent__login} onClick={onLogoutHandler}>Logout</div>
                            : <NavLink to='/login' className={s.headerContent__login}>Login</NavLink>
                    }
                </div>
            </div>
            {loadingBar}
        </div>
    );
}