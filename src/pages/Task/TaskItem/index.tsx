import { MdEdit, MdDelete } from "react-icons/md";
import { Input } from "../../../shared/components/Input";
import { useModel } from "../../../shared/hooks/useModal";
import { Modal } from "../../../shared/components/modal";
import { Button } from "../../../shared/components/Button";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Form } from "../../../shared/components/Form";
import { Select } from "../../../shared/components/Select";
import { countdownDate } from "../../../shared/utils/countdownDate";
import { ITodoItem } from "./interface";
import { ITODO } from "../../../shared/models/ITodo";
import moment from "moment";

export const TaskItem: React.FC<ITodoItem> = ({ todo, onClickRemoveTodo, onClickUpdateTodo }) => {
  const { toggle, isOpen } = useModel();
  const [modalName, setModalName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false)
  const [counter, setCounter] = useState<any>("");
  const [taskID, setTaskID] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("")

  const enableBtnAdd = useMemo(() => {
    if (title.length > 3 && priority.length && priority !== "default-value")
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
  };

  const handleCheck = () => {
    setChecked(!checked)
  }

  const deleteTodo = () => {
    onClickRemoveTodo(taskID)
    toggle();
    window.location.reload()
  }

  const updateTodo = () => {
    onClickUpdateTodo({
      id: taskID,
      task: title,
      priority: priority,
      createAt: moment(new Date).format("DD/MM/YYYY"),
      endDate: endDate.length ? moment(endDate).format("DD/MM/YYYY") : ""
    })
    toggle();

    window.location.reload()
  }
  
  useEffect(() => {
    if (todo.endDate && !todo.isCompleted) {
      setInterval(() => {
        setCounter(countdownDate(todo.endDate))
      }, 1000)
    }
  }, [todo.isCompleted, todo.endDate])

  return (
    <>
      {modalName === "delete-modal" && (
        <Modal isOpen={isOpen} toggle={toggle}>
          <h1>Do you want to delete the task?</h1>
          <p></p>
          <div className="modal-actions">
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

      <ul>
        <li>
          <div className="task-item-info">
            <h1 className="font-regular text-center">
              {todo.task}{" "}
              <span className="situation-status font-normal">
                {todo.isCompleted}
              </span>
            </h1>
            <small className="font-normal text-center mb mt createAt">
              Create at: {todo.createAt}
            </small>
            <small className="font-normal text-center mb mt createAt">
              Priority: {todo.priority}
            </small>
            {!todo.isCompleted && todo.endDate && (
                <p className="font-normal text-center">
                  Time to complete the task until {todo.endDate}:{" "}
                  <span>counter hours {`${counter}`}</span>
                </p>
            )}
          </div>
          <div className="task-item-actions mt">
            <Input
              className="check-complete"
              type="checkbox"
              onChange={() => handleCheck()}
              value={todo.isCompleted}
              checked={todo.isCompleted}  
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
      </ul>
    </>
  );
};
