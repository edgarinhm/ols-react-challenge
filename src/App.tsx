import { Route, Routes } from 'react-router-dom';
import styles from './app.module.scss';
import { AppRouter } from './Router';
import { ApiBaseProvider } from 'common/services/api/api-base';

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
