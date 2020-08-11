import React, {useEffect} from "react";
import s from './Header.module.css';
import {LinearProgress} from "@material-ui/core";
import {useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {AppGlobalStateType} from "../../app/AppReducer";

export const Header = () => {

    const appState = useSelector<AppRootState, AppGlobalStateType>(state => state.app);
    const {loading} = appState;

    useEffect(() => {

    }, [loading]);

    const loadingBar = loading &&
        <div className={s.loadingBar}>
            <LinearProgress />
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