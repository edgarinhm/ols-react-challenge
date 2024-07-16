import { DashboardReportCommit } from "common/models/dashboard/dashboard-report-commit-model";
import dayjs from "dayjs";
import { useMemo } from "react";

export const useChartCommitsReport = () => {
  const AreaChartData = (commitsReport: DashboardReportCommit[]) => {
    return useMemo(() => {
      const monthsShort = dayjs.monthsShort();

      const labels = commitsReport.map(
        (commit) =>
          monthsShort[commit.month - 1].charAt(0).toUpperCase() +
          monthsShort[commit.month - 1].slice(1)
      );

      return {
        labels,
        datasets: [
          ...commitsReport.map((commit, index) => {
            return { month: labels[index], feat: commit.feat, fix: commit.fix };
          }),
        ],
      };
    }, [commitsReport]);
  };

  return {
    AreaChartData,
  };
};
