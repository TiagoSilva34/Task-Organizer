import { MdEdit, MdDelete } from "react-icons/md";
import { Input } from "../../../shared/components/Input";
import { useModel } from "../../../shared/hooks/useModal";
import { Modal } from "../../../shared/components/modal";
import { Button } from "../../../shared/components/Button";
import { useCallback,useEffect, useMemo, useState } from "react";
import { Form } from "../../../shared/components/Form";
import { Select } from "../../../shared/components/Select";
import { countdownDate } from "../../../shared/utils/countdownDate";
import { ITodoItem } from "./interface";
import { ITODO } from "../../../shared/models/ITodo";
import moment from "moment";

export const TaskItem: React.FC<ITodoItem> = ({ todo, onClickRemoveTodo, onClickUpdateTodo }) => {
  const { toggle, isOpen } = useModel();
  const [modalName, setModalName] = useState<string>("");
  const [title, setTitle] = useState<string>(todo.task);
  const [priority, setPriority] = useState<string>(todo.priority);
  const [counter, setCounter] = useState<any>("");
  const [taskID, setTaskID] = useState<string>("");
  const [endDate, setEndDate] = useState<any>("")
  const [initialDate, setInitialDate] = useState<any>("")
  const enableBtnAdd = useMemo(() => {
    if ((title && title.length > 3) && (priority && priority.length && priority !== "default-value"))
      return false;
    else return true;
  }, [title, priority]);

  const handleFormTitle = useCallback(
    (value: string) => {
      setTitle(value);
    },
    [title]
  );

  const handleFormPriority = useCallback(
    (value: string) => {
      setPriority(value);
    },
    [priority]
  );

  const handleOpenModal = (todo: ITODO, name: string) => {
    setModalName(name);
    setTaskID(todo.id)
    toggle();

    if (name === 'edit-modal') {
      setInitialDate(todo.createAt)
      setEndDate(todo.endDate)
    }
  };

  const handleCheck = (id: string) => {
    todo.isCompleted = todo.isCompleted === 1 ? 0 : 1

      if (id === todo.id) {
        const todoData = { 
          ...todo,
          isCompleted:  todo.isCompleted
        }
        onClickUpdateTodo(todoData)
      }
  }

  const deleteTodo = () => {
    onClickRemoveTodo(taskID)
    toggle();
  }

  const updateTodo = () => {
    onClickUpdateTodo({
      id: taskID,
      task: title,
      priority: priority,
      createAt: initialDate === "" ? todo.createAt : initialDate,
      endDate: endDate === "" ? todo.endDate : endDate,
    })
    toggle();
  }
  
  useEffect(() => {
      setInterval(() => {
        if (todo.endDate && !todo.isCompleted) {
          setCounter(countdownDate(String(todo.endDate)))
        }
      }, 1000)
  }, [todo.endDate])

  return (
    <>
      {modalName === "delete-modal" && (
        <Modal isOpen={isOpen} toggle={toggle}>
          <h1 className="modal-delete-title">Do you want to delete the task?</h1>
          <div className="modal-actions">
            <Form>
              <Button
                type="button"
                onClick={() => toggle()}
                className="btn-modal-no font-regular mr"
                disabled={false}
              >
                No
              </Button>
              <Button
                type="submit"
                onClick={() => deleteTodo()}
                className="btn-modal-yes font-regular"
                disabled={false}
              >
                Yes
              </Button>
            </Form>
          </div>
        </Modal>
      )}

      {modalName === "edit-modal" && (
        <Modal isOpen={isOpen} toggle={toggle}>
          <Form onSubmit={() => {}} className="form-edit">
            <Input
              type="text"
              className="new-title-field"
              value={title}
              placeholder="New task name"
              onChange={(event) => handleFormTitle(event.target.value)}
            />
            <Select
              className="new-priority-list"
              value={priority}
              onChange={(event: any) => handleFormPriority(event.target.value)}
            >
              <option value="default-value">Select a priority</option>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </Select>
            <Input type="date" value={initialDate} onChange={event => setInitialDate(event.target.value)} className="date" />
            <Input type="date" value={endDate} onChange={event => setEndDate(event.target.value)} className="date" />

            <div className="modal-actions-edit">
              <Button
                type="button"
                onClick={() => toggle()}
                className="btn-modal-cancel font-regular"
                disabled={false}
              >
                cancel
              </Button>
              <Button
                type="button"
                onClick={() => updateTodo()}
                className={
                  enableBtnAdd
                    ? "disabled btn-modal-add font-regular mr"
                    : " enabled btn-modal-add font-regular mr"
                }
                disabled={false}
              >
                add task
              </Button>
            </div>
          </Form>
        </Modal>
      )}
        <li className={todo.isCompleted === 1 ? `animate` : "noAnimate"}>
          <div className="task-item-info">
            <h1 className="font-regular text-center">
              {todo.task}{" "} - {" "}
              <small className="situation-status font-normal">
                {todo.isCompleted ? 'Completed' : 'Incompleted'}
              </small>
            </h1>
            <small className="font-normal text-center mb mt createAt">
              Date to start the task: {moment(todo.createAt).format("DD/MM/YYYY")}
            </small>
            <small className="font-normal text-center mb mt createAt">
              Priority: {todo.priority}
            </small>
            {todo.isCompleted === 0 && todo.endDate && (
                <p className="font-normal text-center">
                  Date to complete the task until {moment(todo.endDate).format("DD/MM/YYYY")}:{" "}
                  <span>{`${counter}`}</span>
                </p>
            )}
          </div>
          <div className="task-item-actions mt">
            <Input
              className="check-complete"
              type="checkbox"
              onChange={() => handleCheck(todo.id)}
              value={todo.isCompleted}
              checked={todo.isCompleted === 1 ? true : false}
            />
            <MdEdit
              className="btn-edit ml mr"
              onClick={() => handleOpenModal(todo, "edit-modal")}
            />
            <MdDelete
              className="btn-delele"
              onClick={() => handleOpenModal(todo, "delete-modal")}
            />
          </div>
        </li>
    </>
  );
};
