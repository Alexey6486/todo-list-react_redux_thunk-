import {AppGlobalStateType, appReducer, errAC, loadingBarAC} from "./appReducer";

let startState: AppGlobalStateType;

beforeEach(() => {
    startState = {
        loading: false,
        err: null,
    }
})

test('err component', () => {
    const endState = appReducer(startState, errAC('test err'));
    expect(endState.err).toBe('test err');
})

test('loading status', () => {
    const endState = appReducer(startState, loadingBarAC(true));
    expect(endState.loading).toBe(true);
})

