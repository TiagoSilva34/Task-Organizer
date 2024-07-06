import { MdEdit, MdDelete } from "react-icons/md";
import { Input } from "../../../shared/components/Input";
import { useModel } from "../../../shared/hooks/useModal";
import { Modal } from "../../../shared/components/modal";
import { Button } from "../../../shared/components/Button";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getDiffDaysBetweenDates } from "../../../shared/utils/diffDays";
import { Form } from "../../../shared/components/Form";
import { Select } from "../../../shared/components/Select";

export const TaskItem: React.FC = () => {
  const { toggle, isOpen } = useModel();
  const [modalName, setModalName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false)

  const [counter, setCounter] = useState<number>(
    getDiffDaysBetweenDates("7/02/2024", "07/07/2024")
  );

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

  const handleOpenModal = (name: string) => {
    setModalName(name);
    toggle();
  };

  const handleCheck = () => {
    setChecked(!checked)
  }

  useEffect(() => {
    let days = counter;

    setInterval(() => {
      if (days > 0) {
        --days;

        setCounter(days);
      }
    }, 2000);
  }, []);

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
              type="button"
              onClick={() => {}}
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
            <div className="modal-actions-edit">
              <Button
                type="button"
                onClick={() => {}}
                className="btn-modal-cancel font-regular"
                disabled={false}
              >
                cancel
              </Button>
              <Button
                type="button"
                onClick={() => toggle()}
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
              Task 01{" "}
              <small className="situation-status font-normal">
                <i>completed</i>
              </small>
            </h1>
            <small className="font-normal text-center mb mt createAt">
              Create at: 02/07/024
            </small>
            <p className="font-normal text-center">
              Time to complete the task until 06/07/2024:{" "}
              <span>counter days {`${counter} days`}</span>
            </p>
          </div>
          <div className="task-item-actions mt">
            <Input
              className="check-complete"
              type="checkbox"
              onChange={() => setChecked(!checked)}
              disabled={checked}              
            />
            <MdEdit
              className="btn-edit ml mr"
              onClick={() => handleOpenModal("edit-modal")}
            />
            <MdDelete
              className="btn-delele"
              onClick={() => handleOpenModal("delete-modal")}
            />
          </div>
        </li>
        <li>
          <div className="task-item-info">
            <h1 className="font-regular text-center">
              Task 02{" "}
              <span className="situation-status font-normal">
                not completed
              </span>
            </h1>
            <small className="font-normal text-center mb mt createAt">
              Create at: 02/07/024
            </small>
            <p className="font-normal text-center">
              Time to complete the task until 06/07/2024:{" "}
              <span>counter days {`${counter} days`}</span>
            </p>
          </div>
          <div className="task-item-actions mt">
            <Input
              className="check-complete"
              type="checkbox"
              onChange={() => handleCheck()}
              value={checked}
              checked={checked}  
            />
            <MdEdit
              className="btn-edit ml mr"
              onClick={() => handleOpenModal("edit-modal")}
            />
            <MdDelete
              className="btn-delele"
              onClick={() => handleOpenModal("delete-modal")}
            />
          </div>
        </li>
      </ul>
    </>
  );
};
