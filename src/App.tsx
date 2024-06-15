import { Route, Routes } from 'react-router-dom';
import styles from './app.module.scss';
import { AppRouter } from './Router';
import TopBar from 'components/top-bar/top-bar';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route
        path={'*'}
        element={
          <div className={styles.app}>
            <TopBar />
            <AppRouter />
          </div>
        }
      ></Route>
    </Routes>
  );
};

export default App;
