import { API } from "../../config/apiConfig"
import { ITODO } from "../models/ITodo"

export const loginFn = async (data: ITODO) => {
    const response = await API().post<ITODO>('/login', data)
    return response.data
}

export const getAllTodosFn = async () => {
    const chachedData = JSON.parse(localStorage.getItem('cachedData') as any)
    const cacheTime = JSON.parse(localStorage.getItem('cacheTime') as any)
    const currentTime = new Date().getTime()
    const cacheDuration = 1000 * 50 * 5 // Cache de 5 minutos
    
    if (chachedData && cacheTime && currentTime - cacheTime < cacheDuration) {
        return chachedData
    } else {
        try {
            const response = await API().get<ITODO[]>('/tasks')
            const data = response.data 

            localStorage.setItem('todos', JSON.stringify(data));
            localStorage.setItem('cacheTime', JSON.stringify(currentTime));

            return data
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
            throw error;
        }
    }
}

export const createTodoFn = async (data: ITODO) => {
    try {
        await API().post<ITODO>('/tasks', data);
        getAllTodosFn()  
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
};

export const removeTodoFn = async (id: string) => {
    try {
        await API().delete(`/tasks/${id}`);
        getAllTodosFn()
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
};

export const updateTodoFn = async (id: string, todo: ITODO) => {
    try {
        await API().put(`/tasks/${id}`, todo);
        getAllTodosFn()
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
};



