import { ITODO } from "../../../shared/models/ITodo";

export interface ITodoItem {
    todo: ITODO
    onClickRemoveTodo: (id: string) => void
    onClickUpdateTodo: (todo: any) => void
}