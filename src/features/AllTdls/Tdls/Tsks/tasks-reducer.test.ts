import {v1} from "uuid";
// import {tasksReducer, addTaskAC, TasksStateType, removeTaskAC, changeCheckboxAC, editTaskNameAC} from "./tasks-reducer";
// import {AddTdlAC, RemoveTdlAC} from "./AllTdls-reduser";
//
//
// test('Tasks reducer must add a new task.', () => {
//
//     const tdlId_01 = v1();
//     const tdlId_02 = v1();
//     const taskId_01 = v1();
//     const taskId_02 = v1();
//     const inputValue = 'test_task';
//
//     const startState: TasksStateType = {
//         [tdlId_01]: [
//             {id: taskId_01, title: "HTML&CSS", isDone: false}
//         ],
//         [tdlId_02]: [
//             {id: taskId_02, title: "JS", isDone: false}
//         ],
//     };
//
//     const endState = tasksReducer(startState, addTaskAC(inputValue, tdlId_01));
//
//     expect(endState[tdlId_01].length).toBe(2);
//     expect(endState[tdlId_02].length).toBe(1);
// });
//
// test('Tasks reducer must remove the target task.', () => {
//
//     const tdlId_01 = v1();
//     const tdlId_02 = v1();
//     const taskId_01 = v1();
//     const taskId_02 = v1();
//     const taskId_03 = v1();
//
//     const startState: TasksStateType = {
//         [tdlId_01]: [
//             {id: taskId_01, title: "HTML&CSS", isDone: false},
//             {id: taskId_03, title: "PHP", isDone: false},
//         ],
//         [tdlId_02]: [
//             {id: taskId_02, title: "JS", isDone: false}
//         ],
//     };
//
//     const endState = tasksReducer(startState, removeTaskAC(tdlId_01, taskId_03));
//
//     expect(endState[tdlId_01].length).toBe(1);
//     expect(endState[tdlId_02].length).toBe(1);
//     expect(endState[tdlId_01].every(t => t.id != taskId_03)).toBeTruthy();
// });
//
// test('Tasks reducer must change checkbox/isDone at the target task.', () => {
//
//     const tdlId_01 = v1();
//     const tdlId_02 = v1();
//     const taskId_01 = v1();
//     const taskId_02 = v1();
//
//     const doneStatus = true;
//
//     const startState: TasksStateType = {
//         [tdlId_01]: [
//             {id: taskId_01, title: "HTML&CSS", isDone: false}
//         ],
//         [tdlId_02]: [
//             {id: taskId_02, title: "JS", isDone: false}
//         ],
//     };
//
//     const endState = tasksReducer(startState, changeCheckboxAC(taskId_01, doneStatus, tdlId_01));
//
//     expect(endState[tdlId_01][0].isDone).toBe(true);
//     expect(endState[tdlId_02][0].isDone).toBe(false);
//
// });
//
// test('Tasks reducer must change a task name at the target task.', () => {
//
//     const tdlId_01 = v1();
//     const tdlId_02 = v1();
//     const taskId_01 = v1();
//     const taskId_02 = v1();
//
//     const newName = 'test_task_name';
//
//     const startState: TasksStateType = {
//         [tdlId_01]: [
//             {id: taskId_01, title: "HTML&CSS", isDone: false}
//         ],
//         [tdlId_02]: [
//             {id: taskId_02, title: "JS", isDone: false}
//         ],
//     };
//
//     const endState = tasksReducer(startState, editTaskNameAC(tdlId_01, taskId_01, newName));
//
//     expect(endState[tdlId_01][0].title).toBe(newName);
//     expect(endState[tdlId_02][0].title).toBe("JS");
//
// });
//
// test('Tasks reducer must add an empty array for a new tdl.', () => {
//
//     const tdlId_01 = v1();
//     const tdlId_02 = v1();
//     const taskId_01 = v1();
//     const taskId_02 = v1();
//     const inputValue = 'test_tdl';
//
//     const startState: TasksStateType = {
//         [tdlId_01]: [
//             {id: taskId_01, title: "HTML&CSS", isDone: false}
//         ],
//         [tdlId_02]: [
//             {id: taskId_02, title: "JS", isDone: false}
//         ],
//     };
//
//     const endState = tasksReducer(startState, AddTdlAC(inputValue));
//
//     const keys = Object.keys(endState);
//     const newKey = keys.find(k => k !== tdlId_01 && k !== tdlId_02);
//     if (!newKey) {
//         throw Error('new key should be added');
//     }
//     expect(keys.length).toBe(3);
//     expect(endState[newKey]).toStrictEqual([]);
// });
//
// test('Tasks reducer must delete tasks when tdl is deleted.', () => {
//
//     const tdlId_01 = v1();
//     const tdlId_02 = v1();
//     const taskId_01 = v1();
//     const taskId_02 = v1();
//
//     const doneStatus = true;
//
//     const startState: TasksStateType = {
//         [tdlId_01]: [
//             {id: taskId_01, title: "HTML&CSS", isDone: false}
//         ],
//         [tdlId_02]: [
//             {id: taskId_02, title: "JS", isDone: false}
//         ],
//     };
//
//     const action = RemoveTdlAC(tdlId_02);
//
//     const endState = tasksReducer(startState, action);
//
//     const keys = Object.keys(endState);
//
//     expect(keys.length).toBe(1);
//     expect(endState[tdlId_02]).not.toBeDefined();
//
// });