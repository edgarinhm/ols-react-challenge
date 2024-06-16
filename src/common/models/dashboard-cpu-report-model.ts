export interface DashboardCpuReportModel {
  percentajeTime: number;
  deploys: number;
  time: [
    {
      time: string;
      value: number;
    },
  ];
}
