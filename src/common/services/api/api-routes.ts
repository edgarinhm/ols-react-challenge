export const Login = {
  get: (): string => "/login",
  post: (): string => "/login",
};

export const Users = {
  get: (): string => `/users`,
};

export const WeatherFind = {
  get: (): string => `https://openweathermap.org/data/2.5/find?`,
};

export const Notification = {
  get: (): string => `/notification`,
};

export const DashboardCards = {
  get: (): string => "/dashboard_cards",
};

export const Todos = {
  get: (): string => "/todos",
};

export const DashboardCpuReport = {
  get: (): string => "/cpu_report",
};

export const DashboardReportCommits = {
  get: (): string => "/report_commits",
};

export const DashboardReleaseResume = {
  get: (): string => "/release_resume",
};

export const Projects = {
  get: (): string => "/projects",
  post: (): string => "/projects",
  delete: (projectId: number): string => `/projects/${projectId}`,
  put: (projectId: number): string => `/projects/${projectId}`,
};

export const ProjectById = {
  get: (projectId: number): string => `/projects/${projectId}`,
};
