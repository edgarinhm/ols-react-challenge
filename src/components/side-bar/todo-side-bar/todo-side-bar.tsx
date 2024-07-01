import { shallow } from "zustand/shallow";
import styles from "./todo-side-bar.module.scss";
import { useTopBarStorage } from "common/state-management/top-bar-storage";
import { FormControl } from "common/components/form-control/form-control";

const TodoSideBar = () => {
  const { isTodoSideBarOpen, todos } = useTopBarStorage(
    (state) => ({ isTodoSideBarOpen: state.isTodoSideBarOpen, todos: state.todos }),
    shallow
  );

  return (
    <div className={`${styles.todoSideBar} ${Boolean(isTodoSideBarOpen) ? styles.open : ""}`}>
      <div className={styles.title}>{"Pendientes"}</div>
      <div className={styles.action}>
        {"Que tienes pendiente?"} <button>{"Agregar"}</button>
      </div>
      <div className={styles.body}>
        {todos.map((todo) => {
          return <div>{todo.description}</div>;
        })}
      </div>
    </div>
  );
};

export default TodoSideBar;
