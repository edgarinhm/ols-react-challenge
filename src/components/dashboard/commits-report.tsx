import styles from "./commits-report.module.scss";
import { useChartCommitsReport } from "common/hooks/use-chart-commits-report";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CommitsReport = (): JSX.Element => {
  const { AreaChartData, AreaChartOptions } = useChartCommitsReport();
  const chartData = AreaChartData(
    [12, 2, 3, 4, 5],
    [480, 230, 470, 210, 330],
    [400, 340, 550, 480, 170]
  );

  return (
    <div className={styles.commitsReport}>
      <p>{"Reporte De Commits"}</p>
      <p>
        {
          "Total de commits realizados por cada mes diferenciando entre los tag de Ajustes(fix) y Caracteristicas(feat)"
        }
      </p>
      <div className={styles.chartContainer}>
        {<Bar data={chartData} options={AreaChartOptions} />}
      </div>
    </div>
  );
};

export default CommitsReport;
