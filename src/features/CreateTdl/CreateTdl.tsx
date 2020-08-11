import React, {useCallback} from "react";
import s from "../AllTdls/AllTdls.module.css";
import {InputComponent} from "../../components/InputComponent/InputComponent";
import {addTdlThunkCreator} from "../AllTdls/Tdls/tdls-reduser";
import {useDispatch} from "react-redux";

export const CreateTdl = () => {

    const dispatch = useDispatch();

    const addTdl = useCallback((inputValue: string) => {
        dispatch(addTdlThunkCreator(inputValue));
    }, [dispatch]);

    return (
        <div className={s.addTdlBlock}>
            <div className={'container'}>
                <div className={s.addTdlContent}>
                    <InputComponent addItem={addTdl} btnName={'Create'} ph={'Create new todo list'}/>
                </div>
            </div>
        </div>
    );
}