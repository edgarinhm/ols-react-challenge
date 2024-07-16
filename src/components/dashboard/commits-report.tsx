import styles from "./commits-report.module.scss";
import { useChartCommitsReport } from "common/hooks/use-chart-commits-report";
import { useDashboardStorage } from "common/state-management/dashboard-storage";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CommitsReport = (): JSX.Element => {
  const commitsReport = useDashboardStorage((state) => state.commitsReport);

  const { AreaChartData } = useChartCommitsReport();
  const chartData = AreaChartData(commitsReport);

  return (
    <div className={styles.commitsReport}>
      <p className={styles.title}>{"Reporte De Commits"}</p>
      <p className={styles.description}>
        {
          "Total de commits realizados por cada mes diferenciando entre los tag de Ajustes(fix) y Caracteristicas(feat)"
        }
      </p>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%" aspect={500 / 300}>
          <BarChart width={600} height={300} data={chartData.datasets} barGap={0}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" ticks={chartData.labels} axisLine={false} tickLine={false} />
            <YAxis unit={"$"} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend
              iconType={"rect"}
              verticalAlign="top"
              align="left"
              height={45}
              wrapperStyle={{ textTransform: "capitalize" }}
            />
            <Bar dataKey="feat" fill="#98BDFF" radius={5} />
            <Bar dataKey="fix" fill="#4B49AC" radius={5} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CommitsReport;
