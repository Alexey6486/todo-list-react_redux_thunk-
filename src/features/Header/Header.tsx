import React, {useEffect} from "react";
import s from './Header.module.css';
import {LinearProgress, createMuiTheme, ThemeProvider} from "@material-ui/core";
import {useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {AppGlobalStateType} from "../../app/appReducer";

export const Header = () => {

    const appState = useSelector<AppRootState, AppGlobalStateType>(state => state.app);
    const {loading} = appState;

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

    return (
        <div className={s.header}>
            <div className={'container'}>
                <div className={s.headerContent}>
                    <div className={s.headerContent__title}>Header</div>
                    <div className={s.headerContent__login}>Login</div>
                </div>
            </div>
            {loadingBar}
        </div>
    );
}