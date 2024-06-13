import { Route, Routes } from 'react-router-dom';

import { lazy, Suspense } from 'react';
import { routes } from './routes';
import { Spinner } from 'common/components/spinner/spinner';

const Home = lazy(() => import('./components/home/home'));

export const HomeRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route
        path={`${routes.home.name}*`}
        element={
          <Suspense fallback={<Spinner show={true} text={'Loading...'} />}>
            <Home />
          </Suspense>
        }
      />
    </Routes>
  );
};

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route
        path={`${routes.home.name}*`}
        element={
          <Suspense fallback={<Spinner show={true} text={'Loading...'} />}>
            <Home />
          </Suspense>
        }
      />
    </Routes>
  );
};
