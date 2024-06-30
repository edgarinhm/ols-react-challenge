import { useSharedStorage } from "common/state-management/shared-storage";
import styles from "./todo-side-bar.module.scss";

const TodoSideBar = () => {
  const isTodoSideBarOpen = useSharedStorage((state) => state.isTodoSideBarOpen);

  return (
    <div className={`${styles.todoSideBar} ${Boolean(isTodoSideBarOpen) ? styles.open : ""}`}>
      <div className={styles.title}>{"Pendientes"}</div>
      <div className={styles.action}>
        {"Que tienes pendiente?"} <button>{"Agregar"}</button>
      </div>
      <div className={styles.body}>body</div>
    </div>
  );
};

export default TodoSideBar;
