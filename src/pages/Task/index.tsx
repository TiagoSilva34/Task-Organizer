import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../../shared/components/Button";
import { Form } from "../../shared/components/Form";
import { Input } from "../../shared/components/Input";
import { Select } from "../../shared/components/Select";
import { TaskItem } from "./TaskItem";
import "./styles.scss";
import { Modal } from "../../shared/components/modal";
import { useModel } from "../../shared/hooks/useModal";

export const Task = () => {
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [modalName, setMadalName] = useState<string>("")
  const { toggle, isOpen } = useModel();

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
    [title]
  );

  const handleOpeModal = (name: string) => {
    setMadalName(name)
    toggle()
  } 

  const setEndDate = () => {
    console.log('Hello')
    toggle()
  }

  return (
    <div className="container p">
      {modalName === "set-date-modal" && (
        <Modal isOpen={isOpen} toggle={toggle}>
        <h1>Do you want to set a date to complete the task?</h1>
        <Form onSubmit={() => {}} className="form-set-date">
          <Input type="date" value="" onChange={() => {}} className="date" />
          <div className="modal-actions-date">
            <Button
              type="button"
              onClick={() => setEndDate()}
              className="btn-modal-date font-regular"
              disabled={false}
            >
              add date
            </Button>
          </div>
        </Form>
      </Modal>
      )}
      <div className="container-title">
        <h1 className="font-bold text-center title m">Just do it</h1>
        <h1 className="font-bold text-center title m">Just do it</h1>
      </div>
      <div className="form-container">
        <Form className="task-form" onSubmit={() => {}}>
          <Input
            className="title-field mb"
            type="text"
            value={title}
            placeholder="Task name"
            onChange={(event) => handleFormTitle(event.target.value)}
          />
          <Select
            className="priority-list"
            value={priority}
            onChange={(event: any) => handleFormPriority(event.target.value)}
          >
            <option value="default-value">Select a priority</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </Select>
          <Button
            className={
              enableBtnAdd ? "disabled btn-add mb mt" : " enabled btn-add mb mt"
            }
            disabled={enableBtnAdd}
            type="button"
            onClick={() => handleOpeModal('set-date-modal')}
          >
            add task
          </Button>
        </Form>
      </div>

      <div className="task-list-container">
        <TaskItem />
      </div>
    </div>
  );
};
