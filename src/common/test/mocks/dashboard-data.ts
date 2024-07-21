import { DashboardCardModel } from "common/models/dashboard/dashboard-card-model";
import { DashboardReportCommit } from "common/models/dashboard/dashboard-report-commit-model";
import { DashboardServerReportModel } from "common/models/dashboard/dashboard-server-report-model";

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

export const DashboardCommitsReportData: DashboardReportCommit[] = [
  { month: 12, feat: 50, fix: 10 },
];
