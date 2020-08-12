import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': '22146b81-8dec-43d8-8ad7-26ad8ffa196f',
    }
});

export enum StatusTypes {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export enum PriorityTypes {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}
export type TaskType = {
    description: string
    title: string
    status: StatusTypes
    priority: PriorityTypes
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponseType = {
    totalCount: number
    error: string | null
    items: Array<TaskType>
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
type TaskItemType = {
    item: TaskType
}
export type TaskObjectUpdateType = {
    title: string
    description: string
    status: StatusTypes
    priority: PriorityTypes
    startDate: string
    deadline: string
}
export type TaskObjectModelUpdateType = {
    title?: string
    description?: string
    status?: StatusTypes
    priority?: PriorityTypes
    startDate?: string
    deadline?: string
}
export const tskApi = {
    getTasks(tdlId: string) {
        return instance
            .get<GetTasksResponseType>(`todo-lists/${tdlId}/tasks`)
            .then(res => {
                return res.data
            })
    },
    addTask(tdlId: string, title: string) {
        return instance
            .post<ResponseType<TaskItemType>>(`todo-lists/${tdlId}/tasks`, {
                title
            })
            .then(res => {
                return res.data
            })
    },
    deleteTask(tdlId: string, tskId: string) {
        return instance
            .delete<ResponseType>(`todo-lists/${tdlId}/tasks/${tskId}`)
            .then(res => {
                return res.data
            })
    },
    updateTask(tdlId: string, tskId: string, tskObj: TaskObjectUpdateType) {
        return instance
            .put<ResponseType<TaskItemType>>(`todo-lists/${tdlId}/tasks/${tskId}`, {
                ...tskObj
            })
            .then(res => {
                return res.data
            })
    }
};
