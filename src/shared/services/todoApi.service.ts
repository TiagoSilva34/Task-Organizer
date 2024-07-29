import { API } from "../../config/apiConfig"
import { ITODO } from "../models/ITodo"

export const loginFn = async (data: ITODO) => {
    const response = await API().post<ITODO>('/login', data)
    return response.data
}

export const getAllTodosFn = async () => {
    const cache = JSON.parse(localStorage.getItem('cache') as any)

    if (cache) {
        return cache
    } else {
        const response = await API().get<ITODO[]>('/todos')
        let data = response.data 
        addCache(data)
        return response.data
    }
}

export const createTodoFn = async (data: ITODO) => {
    const response = await API().post<ITODO>('/todos', data);
    clearCache()
    return response.data;
};

export const removeTodoFn = async (id: string) => {
    const response = await API().delete(`/todos/${id}`);
    clearCache()
    return response.data;
};

export const updateTodoFn = async (id: string, todo: ITODO) => {
    const response = await API().put(`/todos/${id}`, todo);
    clearCache()
    return response.data;
};

const addCache = (data: any) => {
    localStorage.setItem('cache', JSON.stringify(data))
}

const clearCache = () => {
    localStorage.removeItem('cache')
}


