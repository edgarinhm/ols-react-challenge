export interface DashboardServerReportModel {
  percentajeTime: number;
  deploys: number;
  time: [
    {
      time: string;
      value: number;
    },
  ];
}
