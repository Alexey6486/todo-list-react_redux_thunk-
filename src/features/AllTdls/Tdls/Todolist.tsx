import React, {useCallback, useEffect} from 'react';
import {InputComponent} from "../../../components/InputComponent/InputComponent";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {
    changeTdlFilterThunkCreator,
    editTdlTitleThunkCreator,
    FilterValuesType,
    removeTdlThunkCreator
} from './tdls-reduser';
import {
    addTaskThunkCreator,
    deleteTaskThunkCreator,
    getTasksThunkCreator,
    TasksStateType,
    updateTaskThunkCreator
} from './Tsks/tasks-reducer';
import {Task} from './Tsks/Task';
import {useDispatch, useSelector} from "react-redux";
import {StatusTypes, TaskObjectModelUpdateType} from "../../../api/tskApi";
import {AppRootState} from "../../../app/store";
import s from './Todolist.module.css';
import bin from '../../../assets/icons/bin.png';

type PropsType = {
    title: string
    filter: FilterValuesType
    tdlId: string
}

export const Todolist = React.memo((props: PropsType) => {

    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks);

    const {tdlId, filter, title} = props;

    //todolists' thunks
    const editTdlNameHandler = useCallback((inputValue: string) => {
        dispatch(editTdlTitleThunkCreator(tdlId, inputValue));
    }, []);
    const filterTypeBtn = useCallback((filterType: FilterValuesType) => {
        dispatch(changeTdlFilterThunkCreator(tdlId, filterType));
    }, []);
    const remTdl = useCallback((tdlId: string) => {
        dispatch(removeTdlThunkCreator(tdlId));
    }, []);

    //tasks' thunks
    const addTaskHandler = useCallback((inputValue: string) => {
        dispatch(addTaskThunkCreator(tdlId, inputValue));
    }, [tdlId]);
    const remTask = useCallback((id: string) => {
        dispatch(deleteTaskThunkCreator(tdlId, id));
    }, [dispatch]);
    const updateTask = useCallback((tskId: string, taskObj: TaskObjectModelUpdateType) => {
        dispatch(updateTaskThunkCreator(tdlId, tskId, taskObj));
    }, [dispatch]);

    let tasksForTodoList = tasks[tdlId];

    if (filter === "active") {
        tasksForTodoList = tasksForTodoList.filter(task => task.status === StatusTypes.New);
    }
    if (filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter(task => task.status === StatusTypes.Completed);
    }

    useEffect(() => {
        dispatch(getTasksThunkCreator(tdlId))
    }, [dispatch, tdlId]);

    return (
        <div className={s.tdlWrap}>

            <div className={s.tdlName}>
                <div className={s.spanWrap}>
                    <EditableSpan title={title} editTask={editTdlNameHandler}/>
                </div>
                <button onClick={() => remTdl(tdlId)}>
                    <img src={bin} alt="delete todo list"/>
                </button>
            </div>

            <div className={s.addTaskWrap}>
                <InputComponent addItem={addTaskHandler} btnName={'Add'} ph={'Add new task'}/>
            </div>

            <div className={s.tasksWrap}>
                <ul>
                    {
                        tasksForTodoList ? tasksForTodoList.map((task) => {

                            return (
                                <Task key={task.id}
                                      tskId={task.id}
                                      title={task.title}
                                      description={task.description}
                                      status={task.status}
                                      priority={task.priority}
                                      startDate={task.startDate}
                                      deadline={task.deadline}
                                      remTask={remTask}
                                      updateTask={updateTask}/>
                            )
                        }) : false
                    }
                </ul>
            </div>

            <div className={s.filterBtns}>

                <button className={filter === "all" ? `${s.active}` : ""}
                        onClick={() => filterTypeBtn("all")}>All
                </button>

                <button className={filter === "active" ? `${s.active}` : ""}
                        onClick={() => filterTypeBtn("active")}>Active
                </button>

                <button className={filter === "completed" ? `${s.active}` : ""}
                        onClick={() => filterTypeBtn("completed")}>Done
                </button>

            </div>

        </div>
    )
});


