import {tdlApi, TdlsStateType} from "../../../api/tdlApi";
import {loadingBarAC, loadingTC} from "../../../app/AppReducer";
import {AppRootState} from "../../../app/store";
import { ThunkDispatch } from "redux-thunk";

export const ADD_TODO_LIST = 'ADD-TODO-LIST';
export const REMOVE_TODO_LIST = 'REMOVE-TODO-LIST';
const CHANGE_TODO_LIST_FILTER = 'CHANGE-TODO-LIST-FILTER';
const EDIT_TODO_LIST_NAME = 'EDIT-TODO-LIST-NAME';
const GET_TDLS = 'GET_TDLS';

type ActionType = ReturnType<typeof AddTdlAC> |
    ReturnType<typeof RemoveTdlAC> |
    ReturnType<typeof ChangeTdlFilterAC> |
    ReturnType<typeof EditTdlNameAC> |
    ReturnType<typeof getTdls> |
    ReturnType<typeof loadingBarAC>
    ;

type DispatchTdlsType = (action: ActionType) => void;

export type FilterValuesType = "all" | "active" | "completed";

export const ChangeTdlFilterAC = (tdlId: string, filter: FilterValuesType) => ({ type: CHANGE_TODO_LIST_FILTER, tdlId, filter } as const);

const getTdls = (tdlsArr: Array<TdlsStateType>) => ({ type: GET_TDLS, tdlsArr } as const);

export const AddTdlAC = (item: TdlsStateType) => ({ type: ADD_TODO_LIST, item } as const);

export const RemoveTdlAC = (tdlId: string) => ({ type: REMOVE_TODO_LIST, tdlId } as const);

const EditTdlNameAC = (tdlId: string, inputValue: string) => ({ type: EDIT_TODO_LIST_NAME, tdlId, inputValue } as const);

///////////////////////////////////////////////////////////
// for appWithHookReducer
// let tdlId01 = v1();
// let tdlId02 = v1();
// let [AllTdls, setTdls] = useState<Array<TdlsStateType>>([
//     {id: tdlId01, title: "tdl_01", filter: "all"},
//     {id: tdlId02, title: "tdl_02", filter: "all"},
// ]);
///////////////////////////////////////////////////////////

export type TdlsReduxStateType = TdlsStateType & {
    filter: FilterValuesType
}
const initialState: Array<TdlsReduxStateType> = [];

export const tdlsReducer = (state: Array<TdlsReduxStateType> = initialState, action: ActionType): Array<TdlsReduxStateType> => {
    switch (action.type) {

        case GET_TDLS:
            return action.tdlsArr !== undefined ? action.tdlsArr.map(tdl => tdl ? {...tdl, filter: 'all'} : tdl) : state;

        case ADD_TODO_LIST:
            return [{...action.item, filter: "all"}, ...state];

        case REMOVE_TODO_LIST:
            return state.filter(item => item.id !== action.tdlId);

        case CHANGE_TODO_LIST_FILTER:
            return  state.map(tdl => tdl.id === action.tdlId ? {...tdl, filter: action.filter} : tdl);

        case EDIT_TODO_LIST_NAME:
            return  state.map(tdl => tdl.id === action.tdlId ? {...tdl, title: action.inputValue} : tdl);

        default:
            return state;
    }
};

export const getTdlsThunkCreator = () => (dispatch: ThunkDispatch<AppRootState, {}, ActionType>) => {
    dispatch(loadingTC(true));
    tdlApi.getTdlsApi()
        .then(res => {
            dispatch(getTdls(res));
            dispatch(loadingTC(false));
        })

};
export const addTdlThunkCreator = (inputValue: string) => (dispatch: ThunkDispatch<AppRootState, {}, ActionType>) => {
    dispatch(loadingTC(true));
    tdlApi.createTdlApi(inputValue)
        .then(res => {
            dispatch(AddTdlAC(res.data.item));
            dispatch(loadingTC(false));
        })
};
export const removeTdlThunkCreator = (tdlId: string) => (dispatch: ThunkDispatch<AppRootState, {}, ActionType>) => {
    dispatch(loadingTC(true));
    tdlApi.removeTdlApi(tdlId)
        .then(res => {
            dispatch(RemoveTdlAC(tdlId));
            dispatch(loadingTC(false));
        })
};
export const editTdlTitleThunkCreator = (tdlId: string, title: string) => (dispatch: ThunkDispatch<AppRootState, {}, ActionType>) => {
    dispatch(loadingTC(true));
    tdlApi.editTdlTitleApi(tdlId, title)
        .then(res => {
            dispatch(EditTdlNameAC(tdlId, title));
            dispatch(loadingTC(false));
        })
};
export const changeTdlFilterThunkCreator = (tdlId: string, filter: FilterValuesType) => (dispatch: DispatchTdlsType) => {
    dispatch(ChangeTdlFilterAC(tdlId, filter));
}