import {addTdlAC, changeTdlFilterAC, editTdlNameAC, FilterValuesType, getTdls, removeTdlAC, setEntStatAC, tdlsReducer,
    TdlsReduxStateType, } from "./tdls-reducer";
import {TdlsStateType} from "../../../api/tdlApi";

let startState: Array<TdlsReduxStateType>;
beforeEach(() => {
    startState = [
        {id: '01', addedDate: 'string', title: 'string_01', order: 1, filter: 'all', entityStatus: 'idle',},
        {id: '02', addedDate: 'string', title: 'string_02', order: 2, filter: 'all', entityStatus: 'idle',},
        {id: '03', addedDate: 'string', title: 'string_03', order: 3, filter: 'all', entityStatus: 'idle',},
    ]
})

test('Tdl reducer must get todo lists', () => {
    let startState: Array<TdlsReduxStateType> = [];
    const newState: Array<TdlsStateType> = [
        {id: '01', addedDate: 'string', title: 'string_01', order: 1},
        {id: '02', addedDate: 'string', title: 'string_02', order: 2},
        {id: '03', addedDate: 'string', title: 'string_03', order: 3},
    ]
    const endState = tdlsReducer(startState, getTdls(newState));
    expect(endState.length).toBe(3);
});

test('Tdl reducer must add new todo list', () => {
    let newTdl: TdlsStateType = {id: '04', title: 'test_tdl_033', addedDate: "string", order: 4};
    const endState = tdlsReducer(startState, addTdlAC(newTdl));
    expect(endState.length).toBe(4);
    expect(endState[0].title).toBe('test_tdl_033');
    expect(endState[0].filter).toBe('all');
    expect(endState[0].entityStatus).toBe('idle');
});

test('Tdl reducer must remove target todo list', () => {
    const endState = tdlsReducer(startState, removeTdlAC('01'));
    expect(endState.length).toBe(2);
    expect(endState[0].id).toBe('02');
});

test('Tdl reducer must change filter', () => {
    const newFilter: FilterValuesType = 'active';
    const endState = tdlsReducer(startState, changeTdlFilterAC('01', newFilter));
    expect(endState[0].filter).toBe(newFilter);
    expect(endState[1].filter).toBe('all');
});

test('Tdl reducer must edit todo list name', () => {
    const inputValue = 'test_tdl_01_changed';
    const endState = tdlsReducer(startState, editTdlNameAC('01', inputValue));
    expect(endState[0].title).toBe(inputValue);
    expect(endState[1].title).toBe('string_02');
});

test('entity status', () => {
    const endState = tdlsReducer(startState, setEntStatAC('02', 'loading'));
    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe('loading');
})
