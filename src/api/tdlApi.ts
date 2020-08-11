import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '22146b81-8dec-43d8-8ad7-26ad8ffa196f',
    }
});

export type TdlsStateType = {
    id: string
    addedDate: string
    title: string
    order: number
}
type CreateItemResponseType = {
    item: TdlsStateType
}
type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export const tdlApi = {
    getTdlsApi() {
        return instance
            .get<Array<TdlsStateType>>(`todo-lists`)
            .then(res => {
                return res.data
            })
    },
    createTdlApi(title: string) {
        return instance
            .post<ResponseType<CreateItemResponseType>>(`todo-lists`, {
                title
            })
            .then(res => {
                return res.data
            })
    },
    removeTdlApi(tdlId: string) {
        return instance
            .delete<ResponseType<{}>>(`todo-lists/${tdlId}`)
            .then(res => {
                return res.data
            })
    },
    editTdlTitleApi(tdlId: string, title: string) {
        return instance
            .put<ResponseType<{}>>(`todo-lists/${tdlId}`, {
                title
            })
            .then(res => {
                return res.data
            })
    },
};