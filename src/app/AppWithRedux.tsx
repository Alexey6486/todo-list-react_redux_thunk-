import React from 'react';
import './App.css';
import {AllTdls} from "../features/AllTdls/AllTdls";
import {Header} from '../features/Header/Header';
import {Login} from "../features/login/Login";
import { Route } from 'react-router-dom';

export const AppWithRedux = () => {
    return (
        <div className="App">
            <Header/>
            <Route path={'/login'} render={() => <Login/>}/>
            <Route exact path={'/'} render={() => <AllTdls/>}/>
        </div>
    );
};


