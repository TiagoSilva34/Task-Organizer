import { API } from "../../config/apiConfig"
import { ITODO } from "../models/ITodo"

export const getAllTodosFn = async () => {
    const response = await API().get<ITODO[]>('/todos')
    return response.data
}

export const createTodoFn = async (data: ITODO): Promise<any> => {
    const response = await API().post<ITODO>('/todos', data);
    return response.data;
};