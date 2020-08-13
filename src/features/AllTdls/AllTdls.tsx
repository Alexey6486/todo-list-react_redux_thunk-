import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {getTdlsThunkCreator, TdlsReduxStateType} from "./Tdls/tdls-reducer";
import {Todolist} from "./Tdls/Todolist";
import s from './AllTdls.module.css';
import {CreateTdl} from "../CreateTdl/CreateTdl";
import {ErrMsg} from "../../components/ErrMsg/ErrMsg";
import {Redirect} from "react-router-dom";
import {AuthStateType} from "../login/loginReducer";

export const AllTdls = () => {

    const dispatch = useDispatch();
    const tdls = useSelector<AppRootState, Array<TdlsReduxStateType>>(state => state.tdls);
    const authState = useSelector<AppRootState, AuthStateType>(state => state.auth);
    const {isAuth} = authState;

    useEffect(() => {
        dispatch(getTdlsThunkCreator());
    }, [dispatch]);

    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }

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
            <CreateTdl/>

            <div className={s.tdlsBlock}>
                <div className={'container'}>
                    <div className={s.tdlsWrap}>
                        {tdlsMap}
                    </div>
                </div>
            </div>

            <ErrMsg/>
        </>
    );
}