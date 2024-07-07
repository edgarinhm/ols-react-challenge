import { DashboardCardModel } from "common/models/dashboard-card-model";
import { DashboardServerReportModel } from "common/models/dashboard-server-report-model";

export const CardsData: DashboardCardModel = {
  projects: 1,
  projectsDev: 2,
  pedingNc: 3,
  errorsDeploy: 4,
};

export const DashboardServerReportData: DashboardServerReportModel = {
  percentajeTime: 20,
  deploys: 5,
  time: [
    {
      time: "",
      value: 9,
    },
  ],
};
