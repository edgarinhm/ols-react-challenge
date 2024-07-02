import { shallow } from "zustand/shallow";
import styles from "./todo-side-bar.module.scss";
import { useTopBarStorage } from "common/state-management/top-bar-storage";
import { FormControl } from "common/components/form-control/form-control";
import { FormEvent, useId } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

const TodoSideBar = () => {
  const id = useId();
  const { isTodoSideBarOpen, todos, setTodoState } = useTopBarStorage(
    (state) => ({
      isTodoSideBarOpen: state.isTodoSideBarOpen,
      todos: state.todos,
      setTodoState: state.setState,
    }),
    shallow
  );

  const onCheckboxChange = (id: number): void => {
    setTodoState((state) => {
      const editableTodoIndex = state.todos.findIndex((todo) => todo.id === id);
      const editableTodo = state.todos[editableTodoIndex];
      editableTodo.check = !editableTodo.check;
      state.todos[editableTodoIndex] = editableTodo;
      return state;
    });
  };

  const handleRemoveTodo = (id: number): void => {
    setTodoState((state) => {
      const editableTodoIndex = state.todos.findIndex((todo) => todo.id === id);
      const editableTodo = state.todos[editableTodoIndex];
      editableTodo.hide = true;
      state.todos[editableTodoIndex] = editableTodo;
      return state;
    });
  };

  const closeTodoSideBar = (): void => {
    setTodoState((state) => {
      state.isTodoSideBarOpen = !state.isTodoSideBarOpen;
    });
  };

  console.log("todos", todos);

  const handleOnSumit = (event: FormEvent): void => {
    event.preventDefault();
  };

  return (
    <div className={`${styles.todoSideBar} ${Boolean(isTodoSideBarOpen) ? styles.open : ""}`}>
      <div className={styles.title}>{"Pendientes"}</div>
      <FontAwesomeIcon icon={faXmark} className={styles.close} onClick={closeTodoSideBar} />
      <div className={styles.addTodo}>
        <form noValidate autoComplete="off" onSubmit={handleOnSumit}>
          <div className={styles.addActionGroup}>
            <FormControl.Input placeholder={"Que tienes pendiente?"} className={styles.todoInput} />
            <button type="submit">{"Agregar"}</button>
          </div>
        </form>
      </div>
      <div className={styles.todoList}>
        {todos
          .filter((todo) => todo.hide !== true)
          .map((todo) => {
            const isChecked = todo.check === true;
            return (
              <div
                key={todo.id}
                className={`${styles.todoItem} ${isChecked ? styles.completed : ""}`}
              >
                <div className={styles.checkGroup}>
                  <FontAwesomeIcon
                    icon={isChecked ? faSquareCheck : faSquare}
                    className={styles.checkTodo}
                    onClick={() => onCheckboxChange(todo.id)}
                  />
                  <FormControl.CheckInput
                    type="checkbox"
                    checked={isChecked}
                    id={`${id}-${todo.id}`}
                    label={todo.description}
                    labelClassName={`${styles.standardLabel}`}
                    onChange={() => onCheckboxChange(todo.id)}
                  />
                </div>
                <FontAwesomeIcon
                  icon={faXmark}
                  className={styles.removeTodo}
                  onClick={() => handleRemoveTodo(todo.id)}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TodoSideBar;
