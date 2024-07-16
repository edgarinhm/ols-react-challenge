import { DashboardServerReportModel } from "common/models/dashboard/dashboard-server-report-model";
import { useMemo } from "react";

export const useChartServerReport = () => {
  const LineChartData = (serverReport: DashboardServerReportModel | undefined) => {
    const dataTimeLabel = serverReport?.time.map((time) => time.time);

    return useMemo(() => {
      const labels = dataTimeLabel;
      return {
        labels,
        datasets: serverReport?.time,
      };
    }, [dataTimeLabel, serverReport?.time]);
  };

  return {
    LineChartData,
  };
};
