import React, {useCallback} from "react";
import s from "../AllTdls/AllTdls.module.css";
import {InputComponent} from "../../components/InputComponent/InputComponent";
import {addTdlThunkCreator} from "../AllTdls/Tdls/tdls-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {AppGlobalStateType} from "../../app/appReducer";

export const CreateTdl = () => {

    const dispatch = useDispatch();
    const appState = useSelector<AppRootState, AppGlobalStateType>(state => state.app);
    const {loading} = appState;

    const addTdl = useCallback((inputValue: string) => {
        dispatch(addTdlThunkCreator(inputValue));
    }, [dispatch]);

    return (
        <div className={s.addTdlBlock}>
            <div className={'container'}>
                <div className={s.addTdlContent}>
                    <InputComponent addItem={addTdl} btnName={'Create'} ph={'Create new todo list'} disabled={loading}/>
                </div>
            </div>
        </div>
    );
}