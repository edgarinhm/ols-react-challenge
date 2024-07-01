import {
  DashboardCards,
  DashboardCpuReport,
  DashboardReleaseResume,
  DashboardReportCommits,
} from "./api/api-routes";
import { axiosInstance } from "./api/api-base";
import { DashboardCardModel } from "common/models/dashboard-card-model";
import { DashboardServerReportModel } from "common/models/dashboard-server-report-model";
import { DashboardReportCommit } from "common/models/dashboard-report-commit-model";
import { DashboardReleaseResumeModel } from "common/models/dashboard-release-resume-model";

export const GetDashboardCards = async (): Promise<DashboardCardModel> => {
  const url = DashboardCards.get();
  return (await axiosInstance.get<DashboardCardModel>(url)).data;
};

export const GetDashboardServerReport = async (): Promise<DashboardServerReportModel> => {
  const url = DashboardCpuReport.get();
  return (await axiosInstance.get<DashboardServerReportModel>(url)).data;
};

export const GetDashboardReportCommits = async (): Promise<DashboardReportCommit[]> => {
  const url = DashboardReportCommits.get();
  return (await axiosInstance.get<DashboardReportCommit[]>(url)).data;
};

export const GetDashboardReleaseResume = async (): Promise<DashboardReleaseResumeModel> => {
  const url = DashboardReleaseResume.get();
  return (await axiosInstance.get<DashboardReleaseResumeModel>(url)).data;
};
