import MainSideBar from "components/side-bar/main-side-bar/main-side.bar";
import styles from "./home.module.scss";
import { HomeRoutes } from "router";
import TodoSideBar from "components/side-bar/todo-side-bar/todo-side-bar";
const Home = (): JSX.Element => {
  return (
    <div className={styles.home}>
      <MainSideBar />
      <div className={styles.content} id="scrollable-div">
        <HomeRoutes />
      </div>
      <TodoSideBar />
    </div>
  );
};

export default Home;
