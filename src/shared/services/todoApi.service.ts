import { API } from "../../config/apiConfig"
import { ITODO } from "../models/ITodo"

export const getAllTodosFn = async () => {
    const response = await API().get<ITODO[]>('/todos')
    return response.data
}

export const createTodoFn = async (data: ITODO) => {
    const response = await API().post<ITODO>('/todos', data);
    return response.data;
};


export const removeTodoFn = async (id: string) => {
    const response = await API().delete(`/todos/${id}`);
    return response.data;
};

export const updateTodoFn = async (id: string, todo: ITODO) => {
    const response = await API().put(`/todos/${id}`, todo);
    return response.data;
};

