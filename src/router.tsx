import { Navigate, Route, Routes } from "react-router-dom";

import { lazy, ReactNode, Suspense } from "react";
import { routes } from "./routes";
import { Spinner } from "common/components/spinner/spinner";
const { Environment } = window["environment-config" as keyof typeof window] ?? {};
const isLocal = Environment === "local";

const Home = lazy(() => import("./components/home/home"));
const Dashboard = lazy(() => import("./components/dashboard/dashboard"));
const Project = lazy(() => import("./components/body/project/project"));
const User = lazy(() => import("./components/body/user/user"));
const Role = lazy(() => import("./components/body/role/role"));
const NoMatch = lazy(() => import("./components/no-match/no-match"));

const SuspenseWrapper = ({ children }: { children: ReactNode }): JSX.Element => {
  return <Suspense fallback={<Spinner show={true} text={"Loading..."} />}>{children}</Suspense>;
};

export const HomeRoutes = (): JSX.Element => {
  const defaultRoute = routes.dashboard.name;
  return (
    <Routes>
      <Route index element={<Navigate to={{ pathname: defaultRoute }} />} />
      <Route path={routes.dashboard.name} element={<Dashboard />} />
      <Route
        path={routes.projects.name}
        element={
          <SuspenseWrapper>
            <Project />
          </SuspenseWrapper>
        }
      />
      <Route
        path={routes.users.name}
        element={
          <SuspenseWrapper>
            <User />
          </SuspenseWrapper>
        }
      />
      <Route
        path={routes.roles.name}
        element={
          <SuspenseWrapper>
            <Role />
          </SuspenseWrapper>
        }
      />
      <Route
        path={"*"}
        element={isLocal ? <Navigate to={{ pathname: defaultRoute }} /> : <NoMatch />}
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
          <SuspenseWrapper>
            <Home />
          </SuspenseWrapper>
        }
      />
    </Routes>
  );
};
