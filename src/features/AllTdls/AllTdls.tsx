import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {getTdlsThunkCreator, TdlsReduxStateType} from "./Tdls/tdls-reducer";
import {Todolist} from "./Tdls/Todolist";
import s from './AllTdls.module.css';

export const AllTdls = () => {

    const dispatch = useDispatch();
    const tdls = useSelector<AppRootState, Array<TdlsReduxStateType>>(state => state.tdls);

    useEffect(() => {
        dispatch(getTdlsThunkCreator());
    }, [dispatch]);

    let tdlsMap = tdls.map(tdl => {

        return (
            <Todolist
                title={tdl.title}
                tdlId={tdl.id}
                filter={tdl.filter}
                entityStatus={tdl.entityStatus}
            />
        )
    });

    return (
        <>
            <div className={s.tdlsBlock}>
                <div className={'container'}>
                    <div className={s.tdlsWrap}>
                        {tdlsMap}
                    </div>
                </div>
            </div>
        </>
    );
}