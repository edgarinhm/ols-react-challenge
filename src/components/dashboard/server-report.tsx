import { useDashboardStorage } from "common/state-management/dashboard-storage";
import styles from "./server-report.module.scss";
import { useChartServerReport } from "common/hooks/use-chart-server-report";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Card from "common/components/card/card";

const ServerReport = () => {
  const serverReport = useDashboardStorage((state) => state.serverReport);

  const { LineChartData } = useChartServerReport();
  const chartData = LineChartData(serverReport);

  return (
    <Card>
      <Card.Header title={"Detalles del servidor"} />
      <p className={styles.description}>
        {
          "The total number of sessions within the date range. its. the periods time  a user is  actively engaded with your website, page, app etc."
        }
      </p>
      <div className={styles.details}>
        <div className={styles.item}>
          <p>{"tiempo de uso "}</p>
          <h3>
            {serverReport?.percentajeTime?.toFixed(2)}
            {"%"}
          </h3>
        </div>
        <div className={styles.item}>
          <p>{"proyectos deplegados "}</p>
          <h3>{serverReport?.deploys}</h3>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%" aspect={500 / 300}>
        <LineChart width={600} height={300} data={chartData.datasets}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="time"
            ticks={chartData.labels}
            axisLine={false}
            tickLine={false}
            tickMargin={20}
            padding={{ left: 45 }}
            height={50}
          />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Line dataKey="value" type="monotone" fill="#6C7383" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ServerReport;
