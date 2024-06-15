import { Navigate, Route, Routes } from 'react-router-dom';

import { lazy, Suspense } from 'react';
import { routes } from './routes';
import { Spinner } from 'common/components/spinner/spinner';

const Home = lazy(() => import('./components/home/home'));
const Dashboard = lazy(() => import('./components/dashboard/dashboard'));
const Project = lazy(() => import('./components/body/project/project'));
const User = lazy(() => import('./components/body/user/user'));

export const HomeRoutes = (): JSX.Element => {
  const defaultRoute = routes.dashboard.name;
  return (
    <Routes>
      <Route index element={<Navigate to={{ pathname: defaultRoute }} />} />
      <Route path={routes.dashboard.name} element={<Dashboard />} />
      <Route
        path={routes.projects.name}
        element={
          <Suspense fallback={<Spinner show={true} text={'Loading...'} />}>
            <Project />
          </Suspense>
        }
      />
      <Route
        path={routes.users.name}
        element={
          <Suspense fallback={<Spinner show={true} text={'Loading...'} />}>
            <User />
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
