import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'api-key': '22146b81-8dec-43d8-8ad7-26ad8ffa196f',
    },
})

export type AuthResponseType<D = {}> = {
    data: D
    resultCode: number
    messages: Array<string>
}
export type AuthMeDataResponseType = {
    id: number
    email: string
    login: string
}
export type LoginDataResponseType = {
    userId: number
}
export type LoginPayload = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export const authApi = {
    authMe() {
        return axios
            .get<AuthResponseType<AuthMeDataResponseType>>(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
                withCredentials: true,
            })
            .then((res) => {
                return res.data
            })
    },
    login(payload: LoginPayload) {
        return instance
            .post<AuthResponseType<LoginDataResponseType>>(`/auth/login`, {
                ...payload
            })
            .then((res) => {
                return res.data;
            })
    },
    logout() {
        return instance
            .delete<AuthResponseType>(`/auth/login`)
            .then((res) => {
                return res.data;
            })
    },
}