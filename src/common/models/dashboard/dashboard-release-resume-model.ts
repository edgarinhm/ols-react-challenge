export interface DashboardReleaseResumeModel {
  porcentaje: string;
  cicle: string;
  topProjects: [
    {
      name: string;
      porcentaje: string;
      isNc: boolean;
      isDelay: boolean;
      isDeliver: boolean;
    },
  ];
  ncState: {
    detected: number;
    process: number;
    solved: number;
  };
}
