import { ITODO } from "../../../shared/models/ITodo";

export interface ITodoItem {
    todo: ITODO
    setCheckedTodo: any
    removeAnimate: boolean
    onClickRemoveTodo: (id: string) => void
    onClickUpdateTodo: (todo: any) => void
}