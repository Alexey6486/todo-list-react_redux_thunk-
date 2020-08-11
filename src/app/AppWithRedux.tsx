import React from 'react';
import './App.css';
import {AllTdls} from "../features/AllTdls/AllTdls";
import {Header} from '../features/Header/Header';
import {CreateTdl} from "../features/CreateTdl/CreateTdl";

export const AppWithRedux = () => {
    return (
        <div className="App">
            <Header/>
            <CreateTdl/>
            <AllTdls/>
        </div>
    );
};


