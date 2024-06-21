import { Route, Routes } from "react-router-dom";
import styles from "./app.module.scss";
import TopBar from "components/top-bar/top-bar";
import { AppRouter } from "router";
import SessionProvider from "common/session/session-provider";

const App = (): JSX.Element => {
  return (
    <SessionProvider>
      <Routes>
        <Route
          path={"*"}
          element={
            <div className={styles.app}>
              <TopBar />
              <AppRouter />
            </div>
          }
        ></Route>
      </Routes>
    </SessionProvider>
  );
};

export default App;
