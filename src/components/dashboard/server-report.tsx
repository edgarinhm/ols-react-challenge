import { useDashboardStorage } from "common/state-management/dashboard-storage";
import styles from "./server-report.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useChartServerReport } from "common/hooks/use-chart-server-report";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ServerReport = () => {
  const serverReport = useDashboardStorage((state) => state.serverReport);
  const [charTimeData, setCharTimeData] = useState<string[]>([]);
  const [charValueData, setCharValueData] = useState<number[]>([]);

  const { AreaChartData, AreaChartOptions } = useChartServerReport();
  const chartData = AreaChartData(charTimeData, charValueData);

  useEffect(() => {
    const LoadCharData = () => {
      if (serverReport?.time?.length) {
        const dataTimeLabel = serverReport.time.map((time) => time.time);
        const dataValueLabel = serverReport?.time.map((time) => time.value);
        setCharTimeData(dataTimeLabel);
        setCharValueData(dataValueLabel);
      }
    };
    LoadCharData();
  }, [serverReport?.time]);

  return (
    <div className={styles.serverReport}>
      <p>{"Detalles del servidor"}</p>
      <p>
        {
          "The total number of sessions within the date range. its. the periods time  a user is  actively engaded with your website, page, app etc."
        }
      </p>
      <div>
        <div>
          {"tiempo de uso "}
          <span>{serverReport?.percentajeTime?.toFixed(2)}%</span>
        </div>
        <div>
          {"proyectos deplegados "}
          <span>{serverReport?.deploys}</span>
        </div>
      </div>
      <div className={styles.chartContainer}>
        {<Line data={chartData} options={AreaChartOptions} />}
      </div>
    </div>
  );
};

export default ServerReport;
