import { MdEdit, MdDelete } from "react-icons/md";
import { Input } from "../../../shared/components/Input";

export const TaskItem: React.FC = () => {
  return (
    <ul>
      <li>
        <div className="task-item-info">
          <h1 className="font-regular text-center">
            Task 01{" "}
            <small className="situation-status font-normal"><i>completed</i></small>
          </h1>
         <small className="font-normal text-center mb mt createAt">Create at: 02/07/024</small>
         <p className="font-normal text-center">Time to complete the task: 2 days</p>
        </div>
        <div className="task-item-actions mt">
          <Input className="check-complete" type="checkbox" onChange={() => {}} />
          <MdEdit className="btn-edit ml mr" />
          <MdDelete className="btn-delele" />
        </div>
      </li>
      <li>
        <div className="task-item-info">
          <h1 className="font-regular text-center">
            Task 02{" "}
            <span className="situation-status font-normal">not completed</span>
          </h1>
          <small className="font-normal text-center mb mt createAt">Create at: 02/07/024</small>
          <p className="font-normal text-center">Time to complete the task: 2 days</p>
        </div>
        <div className="task-item-actions mt">
          <Input className="check-complete" type="checkbox" onChange={() => {}} />
          <MdEdit className="btn-edit ml mr" />
          <MdDelete className="btn-delele" />
        </div>
      </li>
    </ul>
  );
};
