import {
    AddTdlAC,
    ChangeTdlFilterAC,
    FilterValuesType,
    RemoveTdlAC,
    tdlsReducer,
} from "./tdls-reduser";
import {v1} from "uuid";

// test('AllTdls reducer must add new todo list', () => {
//
//     let tdlId_01 = v1();
//     let tdlId_02 = v1();
//
//     let inputValue = 'Test_tdl_name';
//
//     let startState: Array<TdlsStateType> = [
//         {id: tdlId_01, title: 'test_tdl_01', filter: 'all'},
//         {id: tdlId_02, title: 'test_tdl_02', filter: 'all'}
//     ];
//
//     //const endState = tdlsReducer(startState, {type: 'ADD-TODO-LIST', inputValue: inputValue});
//     const endState = tdlsReducer(startState, AddTdlAC(inputValue));
//
//     expect(endState.length).toBe(3);
//     expect(endState[2].title).toBe(inputValue);
//     expect(endState[2].filter).toBe('all');
// });
//
// test('AllTdls reducer must remove target todo list', () => {
//
//     let tdlId_01 = v1();
//     let tdlId_02 = v1();
//
//     let startState: Array<TdlsStateType> = [
//         {id: tdlId_01, title: 'test_tdl_01', filter: 'all'},
//         {id: tdlId_02, title: 'test_tdl_02', filter: 'all'}
//     ];
//
//     //const endState = tdlsReducer(startState, {type: 'REMOVE-TODO-LIST', tdlId: tdlId_01});
//     const endState = tdlsReducer(startState, RemoveTdlAC(tdlId_01));
//
//     expect(endState.length).toBe(1);
//     expect(endState[0].id).toBe(tdlId_02);
//
// });
//
// test('AllTdls reducer must change filter', () => {
//
//     let tdlId_01 = v1();
//     let tdlId_02 = v1();
//
//     let startState: Array<TdlsStateType> = [
//         {id: tdlId_01, title: 'test_tdl_01', filter: 'all'},
//         {id: tdlId_02, title: 'test_tdl_02', filter: 'all'}
//     ];
//
//     const newFilter: FilterValuesType = 'active';
//
//     // const action ={
//     //     type: 'CHANGE-TODO-LIST-FILTER' as const, //вариант согласования типа
//     //     tdlId: tdlId_01,
//     //     filter: newFilter
//     // };
//
//     const endState = tdlsReducer(startState, ChangeTdlFilterAC(tdlId_01, newFilter));
//
//     expect(endState[0].filter).toBe(newFilter);
//     expect(endState[1].filter).toBe('all');
//
// });
//
// test('AllTdls reducer must edit todo list name', () => {
//
//     let tdlId_01 = v1();
//     let tdlId_02 = v1();
//
//     let startState: Array<TdlsStateType> = [
//         {id: tdlId_01, title: 'test_tdl_01', filter: 'all'},
//         {id: tdlId_02, title: 'test_tdl_02', filter: 'all'}
//     ];
//     const inputValue = 'test_tdl_01_changed';
//
//     /*
//     const action: EditToDoListNameActionType ={ //вариант согласования типа
//         type: 'EDIT-TODO-LIST-NAME',
//         tdlId: tdlId_01,
//         inputValue: inputValue
//     };*/
//     const endState = tdlsReducer(startState, EditTdlNameAC(tdlId_01, inputValue));
//
//     expect(endState[0].title).toBe(inputValue);
//     expect(endState[1].title).toBe('test_tdl_02');
//
// });
