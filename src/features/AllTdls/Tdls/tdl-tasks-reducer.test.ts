import {tasksReducer, TasksStateType} from "./Tsks/tasks-reducer";
// import {AddTdlAC, tdlsReducer, TdlsStateType} from "./AllTdls-reduser";
//
// test('id in tdl and tasks states must be the same', () => {
//     const startTasksState: TasksStateType = {};
//     const startTdlState: Array<TdlsStateType> = [];
//
//     const action = AddTdlAC("new_tdl");
//
//     const endTasksState = tasksReducer(startTasksState, action);
//     const endTdlState = tdlsReducer(startTdlState, action);
//
//     const keys = Object.keys(endTasksState);
//     const idFromTasks = keys[0];
//     const idFromTodoLists = endTdlState[0].id;
//
//     expect(idFromTasks).toBe(action.id);
//     expect(idFromTodoLists).toBe(action.id);
// });