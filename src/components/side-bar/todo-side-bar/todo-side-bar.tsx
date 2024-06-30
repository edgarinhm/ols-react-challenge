import { useSharedStorage } from "common/state-management/shared-storage";
import styles from "./todo-side-bar.module.scss";
import { Collapse } from "common/components/collapse/collapse";

const TodoSideBar = () => {
  const isTodoSideBarOpen = useSharedStorage((state) => state.isTodoSideBarOpen);

  return (
    <Collapse
      collapse={Boolean(isTodoSideBarOpen)}
      timeout={1000}
      delay={350}
      /*enterEasing="linear"
      exitEasing="ease"*/
      /*enterEasing="ease-in-out"
      exitEasing="ease"
      direction={"vertical"}*/
      exitEasing="ease"
    >
      <div className={styles.todoSideBar}>TodoSideBar</div>
    </Collapse>
  );
};

export default TodoSideBar;
