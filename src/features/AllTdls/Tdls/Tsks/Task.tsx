import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {PriorityTypes, StatusTypes, TaskObjectModelUpdateType} from "../../../../api/tskApi";
import s from './Task.module.css';
import bin from '../../../../assets/icons/bin.png';

type TaskPropsType = {
    remTask: (id: string) => void
    updateTask: (tskId: string, taskObj: TaskObjectModelUpdateType) => void
    tskId: string
    title: string
    description: string,
    status: StatusTypes,
    priority: PriorityTypes,
    startDate: string,
    deadline: string,
}
export const Task = React.memo((props: TaskPropsType) => {

    const {remTask, updateTask, tskId, title, status} = props;

    const onClickHandler = useCallback(() => {
        remTask(tskId)
    }, [remTask, tskId]);

    const checkboxOnclickHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const editableTask: TaskObjectModelUpdateType = {
            status: e.currentTarget.checked ? StatusTypes.Completed : StatusTypes.New,
        };
        updateTask(tskId, editableTask)
    }, [updateTask, tskId]);

    const editTaskNameHandler = useCallback((inputValue: string) => {
        const editableTask: TaskObjectModelUpdateType = {
            title: inputValue,
        };
        updateTask(tskId, editableTask);
    }, [updateTask, tskId]);

    return (
        <li className={s.taskLi}>
            <div className={s.taskWrap}>
                <div className={s.taskCheckWrap}>
                    <input type="checkbox"
                           onChange={checkboxOnclickHandler}
                           checked={status === StatusTypes.Completed} id={tskId}/>
                    <label htmlFor={tskId}></label>
                </div>
                <EditableSpan title={title} editTask={editTaskNameHandler}/>
            </div>
            <button onClick={onClickHandler}>
                <img src={bin} alt="delete task"/>
            </button>
        </li>
    )
});