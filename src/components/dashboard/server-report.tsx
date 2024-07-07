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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ServerReport = () => {
  const serverReport = useDashboardStorage((state) => state.serverReport);

  const chartData = {
    labels: ["Red", "Orange", "Blue"],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "",
        data: [55, 23, 96],
        // you can set indiviual colors for each bar
        backgroundColor: [
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 255, 255, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

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
      <div className={styles.chartContainer}>{<Line data={chartData} />}</div>
    </div>
  );
};

export default ServerReport;
