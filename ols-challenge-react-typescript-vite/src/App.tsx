import { Route, Routes } from 'react-router-dom';
import styles from './app.module.scss';
import { AppRouter } from './Router';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route
        path={'*'}
        element={
          <div className={styles.app}>
            <AppRouter />
          </div>
        }
      ></Route>
    </Routes>
  );
};

export default App;
