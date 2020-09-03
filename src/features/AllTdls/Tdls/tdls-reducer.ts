import {tdlApi, TdlsStateType} from "../../../api/tdlApi";
import {loadingBarAC, loadingTC} from "../../../app/appReducer";
import {AppRootState} from "../../../app/store";
import { ThunkDispatch } from "redux-thunk";
import {handleNetworkError} from "../../../utils/handleErrorsUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";

// action types
// export const ADD_TODO_LIST = 'ADD-TODO-LIST';
// export const REMOVE_TODO_LIST = 'REMOVE-TODO-LIST';
// const CHANGE_TODO_LIST_FILTER = 'CHANGE-TODO-LIST-FILTER';
// const EDIT_TODO_LIST_NAME = 'EDIT-TODO-LIST-NAME';
// const GET_TDLS = 'GET_TDLS';
// const SET_ENT_STAT = 'SET_ENT_STAT';

// AC, Dispatch and other types
export type FilterValuesType = "all" | "active" | "completed";
export type EntityStatusTypes = 'idle' | 'succeeded' | 'loading' | 'failed';
// export type EntityStateACType = {type: typeof SET_ENT_STAT, tdlId: string, entStatus: EntityStatusTypes};
// type ActionType = ReturnType<typeof addTdlAC> |
//     ReturnType<typeof removeTdlAC> |
//     ReturnType<typeof changeTdlFilterAC> |
//     ReturnType<typeof editTdlNameAC> |
//     ReturnType<typeof getTdls> |
//     ReturnType<typeof loadingBarAC> |
//     EntityStateACType;
// type DispatchTdlsType = (action: ActionType) => void;

// action creators
// export const changeTdlFilterAC = (tdlId: string, filter: FilterValuesType) => ({ type: CHANGE_TODO_LIST_FILTER, tdlId, filter } as const);
// export const getTdls = (tdlsArr: Array<TdlsStateType>) => ({ type: GET_TDLS, tdlsArr } as const);
// export const addTdlAC = (item: TdlsStateType) => ({ type: ADD_TODO_LIST, item } as const);
// export const removeTdlAC = (tdlId: string) => ({ type: REMOVE_TODO_LIST, tdlId } as const);
// export const editTdlNameAC = (tdlId: string, inputValue: string) => ({ type: EDIT_TODO_LIST_NAME, tdlId, inputValue } as const);
// export const setEntStatAC = (tdlId: string, entStatus: EntityStatusTypes) => ({type: SET_ENT_STAT, tdlId, entStatus} as const);

// init state + types
export type TdlsReduxStateType = TdlsStateType & {
    filter: FilterValuesType
    entityStatus: EntityStatusTypes
}
const initialState: Array<TdlsReduxStateType> = [];

// tdl reducer
// export const tdlsReducer = (state: Array<TdlsReduxStateType> = initialState, action: ActionType): Array<TdlsReduxStateType> => {
//     switch (action.type) {
//
//         case GET_TDLS:
//             return action.tdlsArr !== undefined ? action.tdlsArr.map(tdl => tdl ? {...tdl, filter: 'all', entityStatus: 'idle'} : tdl) : state;
//
//         case ADD_TODO_LIST:
//             return [{...action.item, filter: "all", entityStatus: 'idle'}, ...state];
//
//         case REMOVE_TODO_LIST:
//             return state.filter(item => item.id !== action.tdlId);
//
//         case CHANGE_TODO_LIST_FILTER:
//             return  state.map(tdl => tdl.id === action.tdlId ? {...tdl, filter: action.filter} : tdl);
//
//         case EDIT_TODO_LIST_NAME:
//             return  state.map(tdl => tdl.id === action.tdlId ? {...tdl, title: action.inputValue} : tdl);
//
//         case SET_ENT_STAT:
//             return state.map(tdl => tdl.id === action.tdlId ? {...tdl, entityStatus: action.entStatus} : tdl);
//
//         default:
//             return state;
//     }
// };

const slice = createSlice({
    name: "tdls",
    initialState: initialState,
    reducers: {
        changeTdlFilterAC(state, action: PayloadAction<{tdlId: string, filter: FilterValuesType}>) {
            const index = state.findIndex(item => item.id === action.payload.tdlId);
            state[index].filter = action.payload.filter;
            //state.map(tdl => tdl.id === action.payload.tdlId ? {...tdl, filter: action.payload.filter} : tdl);
        },
        getTdls(state, action: PayloadAction<{tdlsArr: Array<TdlsStateType>}>) {
            return action.payload.tdlsArr !== undefined ? action.payload.tdlsArr.map(tdl => tdl ? {...tdl, filter: 'all', entityStatus: 'idle'} : tdl) : state;
        },
        addTdlAC(state, action: PayloadAction<{item: TdlsStateType}>) {
            state.push({...action.payload.item, filter: "all", entityStatus: 'idle'});
        },
        removeTdlAC(state, action: PayloadAction<{tdlId: string}>) {
            const index = state.findIndex(item => item.id === action.payload.tdlId);
            if (index > -1) {
                state.splice(index, 1);
            }
            // or
            // return state.filter(item => item.id !== action.payload.tdlId);
        },
        editTdlNameAC(state, action: PayloadAction<{tdlId: string, inputValue: string}>) {
            const index = state.findIndex(item => item.id === action.payload.tdlId);
            state[index].title = action.payload.inputValue
            //state.map(tdl => tdl.id === action.payload.tdlId ? {...tdl, title: action.payload.inputValue} : tdl);
        },
        setEntStatAC(state, action: PayloadAction<{tdlId: string, entStatus: EntityStatusTypes}>) {
            const index = state.findIndex(item => item.id === action.payload.tdlId);
            state[index].entityStatus = action.payload.entStatus
            //state.map(tdl => tdl.id === action.payload.tdlId ? {...tdl, entityStatus: action.payload.entStatus} : tdl);
        },
    }
})
export const tdlsReducer = slice.reducer;
export const {changeTdlFilterAC, getTdls, addTdlAC, removeTdlAC, editTdlNameAC, setEntStatAC} = slice.actions;

// Thunk creators
export const getTdlsThunkCreator = () => (dispatch: ThunkDispatch<AppRootState, {}, any>) => {
    dispatch(loadingTC(true));
    tdlApi.getTdlsApi()
        .then(res => {
            dispatch(getTdls({tdlsArr: res}));
            dispatch(loadingTC(false));
        })
        .catch(error => {
            handleNetworkError(error.message, dispatch)
        })
};
export const addTdlThunkCreator = (inputValue: string) => (dispatch: ThunkDispatch<AppRootState, {}, any>) => {
    dispatch(loadingTC(true));
    tdlApi.createTdlApi(inputValue)
        .then(res => {
            dispatch(addTdlAC({item: res.data.item}));
            dispatch(loadingTC(false));
        })
        .catch(error => {
            handleNetworkError(error.message, dispatch)
        })
};
export const removeTdlThunkCreator = (tdlId: string) => (dispatch: ThunkDispatch<AppRootState, {}, any>) => {
    dispatch(loadingTC(true));
    dispatch(setEntStatTC(tdlId, 'loading'));
    tdlApi.removeTdlApi(tdlId)
        .then(res => {
            dispatch(removeTdlAC({tdlId: tdlId}));
            dispatch(loadingTC(false));
        })
        .catch(error => {
            handleNetworkError(error.message, dispatch)
        })
};
export const editTdlTitleThunkCreator = (tdlId: string, title: string) => (dispatch: ThunkDispatch<AppRootState, {}, any>) => {
    dispatch(loadingTC(true));
    tdlApi.editTdlTitleApi(tdlId, title)
        .then(res => {
            dispatch(editTdlNameAC({tdlId: tdlId, inputValue: title}));
            dispatch(loadingTC(false));
        })
        .catch(error => {
            handleNetworkError(error.message, dispatch)
        })
};
export const changeTdlFilterThunkCreator = (tdlId: string, filter: FilterValuesType) => (dispatch: Dispatch<any>) => {
    dispatch(changeTdlFilterAC({tdlId: tdlId, filter: filter}));
}
export const setEntStatTC = (tdlId: string, entStatus: EntityStatusTypes) => (dispatch: Dispatch<any>) => {
    dispatch(setEntStatAC({tdlId: tdlId, entStatus: entStatus}));
}


///////////////////////////////////////////////////////////
// init state for appWithHookReducer
// let tdlId01 = v1();
// let tdlId02 = v1();
// let [AllTdls, setTdls] = useState<Array<TdlsStateType>>([
//     {id: tdlId01, title: "tdl_01", filter: "all"},
//     {id: tdlId02, title: "tdl_02", filter: "all"},
// ]);
///////////////////////////////////////////////////////////