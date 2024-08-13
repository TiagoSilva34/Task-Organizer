import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../../shared/components/Button";
import { Form } from "../../shared/components/Form";
import { Input } from "../../shared/components/Input";
import { Select } from "../../shared/components/Select";
import { TaskItem } from "./TaskItem";
import { Modal } from "../../shared/components/modal";
import { useModel } from "../../shared/hooks/useModal";
import { ITODO } from "../../shared/models/ITodo";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createTodoFn,
  getAllTodosFn,
  removeTodoFn,
  updateTodoFn,
} from "../../shared/services/todoApi.service";
import { MdSearch } from "react-icons/md"
import moment from "moment";
import { useRefetch } from "../../shared/hooks/useRefetch";
import "./styles.scss";

export const Task = () => {
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [modalName, setMadalName] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [initialDate, setInitialDAte] = useState<string>("");
  const [filteredDate, setFilteredDate] = useState<string>("");
  const [filterByName, setFilterByName] = useState<string>("");
  const [allTasks, setAllTasks] = useState<ITODO[]>([]);
  const [tasks, setTasks] = useState<ITODO[]>([]);
  const { refetch, handleRefetch, status, checkTodoStatus } = useRefetch()
  const { toggle, isOpen } = useModel();
  const { data: response } = useQuery({
    queryKey: ["todos"],
    queryFn: getAllTodosFn,
  });

  const mutation = useMutation({
    mutationFn: (newTodo: ITODO) => createTodoFn(newTodo),
    onSuccess: () => {
      localStorage.setItem("status", JSON.stringify(true));
    },
  });

  const deleteTodo = useMutation({
    mutationFn: (id: string) => removeTodoFn(id),
  });

  const updateTodo = useMutation({
    mutationFn: (todo: ITODO) => updateTodoFn(todo.id, todo),
  });

  const enableBtnAdd = useMemo(() => {
    if (
      title &&
      title.length > 3 &&
      priority &&
      priority.length &&
      priority !== "default-value"
    )
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
    setMadalName(name);
    toggle();
  };

  const handleEndDate = (event: React.FormEvent) => {
    const teste = new Date(initialDate)
    console.log(teste)
    event.preventDefault()
    mutation.mutate({
      id: String(Math.random() * 1000),
      task: title,
      priority: priority,
      createAt: moment(new Date(initialDate)).format("YYYY-MM-DD"),
      isCompleted: 0,
      endDate: endDate.length ? moment(new Date(endDate)).format("YYYY-MM-DD") : "",
    });
    setTitle("");
    setEndDate("")
    setInitialDAte("")
    setPriority("");
    toggle();
  };

  const onClickRemoveTodo = (id: string) => {
    deleteTodo.mutate(id);
    handleRefetch()
  };

  const onClickUpdateTodo = (todo: any) => {
    updateTodo.mutate(todo);
    handleRefetch()
  };

  const onClickGetAllTasks = () => {
    let todos: ITODO[] = tasks;

    setAllTasks(todos);
  };

  const onClickGetCompletedTasks = () => {
    let todos: ITODO[] = JSON.parse(localStorage.getItem("todos") as any);

    todos = todos && todos.filter((item) => item.isCompleted === 1);
    setAllTasks(todos);
    checkTodoStatus()
  };

  const onClickGetNotCompletedTasks = () => {
    let todos: ITODO[] = JSON.parse(localStorage.getItem("todos") as any);

    todos = todos && todos.filter((item) => item.isCompleted === 0);
    setAllTasks(todos);
  };

  const handleFilterTaskByDate = (value: string) => {
    setFilteredDate(value)
 
    let formattedDate = moment(value).format("YYYY-MM-DD");
    let filterTaskByDate: ITODO[] = tasks;

    filterTaskByDate = filterTaskByDate.filter((item) => {
        if (item.createAt !== "Invalid date") {
          if (item.createAt === formattedDate) return item
        } 
    });

    if (filterTaskByDate.length === 0) setAllTasks([])
    else if (filterTaskByDate.length > 0) setAllTasks(filterTaskByDate);
  };

  const handleFilterTaskByName = (value: string) => {
    setFilterByName(value)

    let toLowerValue = value.toLowerCase()

    let filterTaskByName: ITODO[] = tasks;

    filterTaskByName = filterTaskByName.filter(item => item.task.toLowerCase().includes(toLowerValue))

    setAllTasks(filterTaskByName);
  };

  useEffect(() => {
    if (!status) onClickGetCompletedTasks()
    else if (!status) onClickGetNotCompletedTasks()
  }, [status]);

  useEffect(() => {
    setTimeout(() => {    
      if (!refetch) { 
        let todos = JSON.parse(localStorage.getItem("todos") as any);

        setAllTasks(todos);
        setTasks(todos)
        handleRefetch()
      }
    }, 100)
  }, [refetch]);

  return (
    <div className="container p">
      {modalName === "set-date-modal" && (
        <Modal isOpen={isOpen} toggle={toggle}>
          <Form className="form-set-date" onSubmit={handleEndDate}>
            <h1>
              You need to create an initial date to start the task (required)
            </h1>
            <Input
              required
              type="date"
              value={initialDate}
              onChange={(event) => setInitialDAte(event.target.value)}
              className="initial-date"
            />
            <Input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="end-date"
            />
            <div className="modal-actions-date">
              <Button
                type="submit"
                onClick={() => handleRefetch()}
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
              enableBtnAdd ? "disabled btn-add mb mt" : "enabled btn-add mb mt"
            }
            disabled={enableBtnAdd}
            type="button"
            onClick={() => handleOpenModal("set-date-modal")}
          >
            add task
          </Button>
        </Form>
      </div>
      <nav className="nav-filter-task">
        <ul>
          <li>
            <Button disabled={false} type="button" onClick={onClickGetAllTasks}>
              All tasks
            </Button>
          </li>
          <li>
            <Button
              disabled={false}
              type="button"
              onClick={() => checkTodoStatus()}
            >
              Completed tasks
            </Button>
          </li>
          <li>
            <Button
              disabled={false}
              type="submit"
              onClick={onClickGetNotCompletedTasks}
            >
              Incompleted tasks
            </Button>
          </li>
        </ul>
        <div>
          <h1 className="filter-by-date-title">Filter by date</h1>
          <Input
            type="date"
            className="filter-date"
            value={filteredDate}
            onChange={(event: any) => handleFilterTaskByDate(event.target.value)}
          />
        </div>
      </nav>
      <div className="filter-by-name-container">
        <MdSearch className="search-icon" />
        <Input
            type="name"
            className="filter-by-name"
            value={filterByName}
            onChange={(event: any) => handleFilterTaskByName(event.target.value)}
            placeholder="Typing a task"
          />
      </div>
      <div className="task-list-container">
        <ul>
            
          {allTasks?.map((todo: ITODO) => (
            <TaskItem
              key={todo.id}
              todo={todo}
              onClickRemoveTodo={onClickRemoveTodo}
              onClickUpdateTodo={onClickUpdateTodo}
            />
          ))}

          {!allTasks.length && (
            <span className="no-tasks">You have no tasks registered!</span>
          )}
        </ul>
      </div>
    </div>
  );
};
