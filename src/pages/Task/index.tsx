import { Button } from "../../shared/components/Button";
import { Form } from "../../shared/components/Form";
import { Input } from "../../shared/components/Input";
import { Select } from "../../shared/components/Select";
import { TaskItem } from "./TaskItem";
import './styles.scss'

export const Task = () => {
  return (
    <div className="container p">
      <div className="container-title">
        <h1 className="font-bold text-center title m">Just do it</h1>
        <h1 className="font-bold text-center title m">Just do it</h1>
      </div>
      <div className="form-container">
        <Form className="task-form" onSubmit={() => {}}>
          <Input className="title-field mb" type="text" value="" placeholder="Task name" onChange={() => {}} />
          <Select className="priority-list" onChange={() => {}} />
          <Button className="btn-add mb mt" disabled={false} type="button" onClick={() => {}}>add task</Button>
        </Form>
      </div>

      <div className="task-list-container">
        <TaskItem />
      </div>
    </div>
  );
};
