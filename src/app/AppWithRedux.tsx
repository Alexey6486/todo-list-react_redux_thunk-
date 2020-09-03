import React, {useEffect} from 'react';
import './App.css';
import {AllTdls} from "../features/AllTdls/AllTdls";
import {Header} from '../features/Header/Header';
import {Login} from "../features/login/Login";
import {Route} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from "./store";
import {AppGlobalStateType, initAppTC} from './appReducer';

export const AppWithRedux = () => {

    const dispatch = useDispatch();
    const appState = useSelector<AppRootState, AppGlobalStateType>(state => state.app);
    const {initialized} = appState;

    useEffect(() => {
        dispatch(initAppTC())
    }, [])

    if (!initialized) {
        return (
            <div className="loadingio-spinner-eclipse-dt9w0ghfo8f">
                <div className="ldio-wbdjdcflesd">
                    <div></div>
                </div>
            </div>
        )
    }

    return (
        <div className="App">
            <Header/>
            <Route path={'/login'} render={() => <Login/>}/>
            <Route exact path={'/'} render={() => <AllTdls/>}/>
        </div>
    );
};


