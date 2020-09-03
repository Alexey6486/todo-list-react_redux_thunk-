import {tasksReducer, TasksStateType} from "./Tsks/tasks-reducer";
import {addTdlAC, tdlsReducer, TdlsReduxStateType} from "./tdls-reducer";

test('id in tdl and tasks states must be the same', () => {
    const startTasksState: TasksStateType = {};
    const startTdlState: Array<TdlsReduxStateType> = [];

    let newTdl: TdlsReduxStateType = {id: 'test_id', title: 'test_tdl_033', addedDate: "string", order: 1, filter: "all", entityStatus: 'idle'};

    const action = addTdlAC({item: newTdl});

    const endTasksState = tasksReducer(startTasksState, action);
    const endTdlState = tdlsReducer(startTdlState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTdlState[0].id;

    expect(idFromTasks).toBe(action.payload.item.id);
    expect(idFromTodoLists).toBe(action.payload.item.id);
});