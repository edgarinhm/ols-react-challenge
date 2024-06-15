import { Navigate, Route, Routes } from 'react-router-dom';

import { lazy, Suspense } from 'react';
import { routes } from './routes';
import { Spinner } from 'common/components/spinner/spinner';

const Home = lazy(() => import('./components/home/home'));
const Dashboard = lazy(() => import('./components/dashboard/dashboard'));

export const HomeRoutes = (): JSX.Element => {
  const defaultRoute = routes.dashboard.name;
  return (
    <Routes>
      <Route index element={<Navigate to={{ pathname: defaultRoute }} />} />
      <Route path={routes.dashboard.name} element={<Dashboard />} />
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
  const defaultRoute = routes.dashboard.name;
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
