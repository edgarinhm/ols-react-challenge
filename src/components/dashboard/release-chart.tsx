import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, LegendProps } from "recharts";
import styles from "./release-chart.module.scss";

interface ReleaseChartProps {
  data: { name: string; value: number; fill: string }[];
}

const ReleaseChart = ({ data }: ReleaseChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%" aspect={500 / 300}>
      <PieChart width={600} height={300}>
        <Tooltip />
        <Legend
          height={70}
          iconType="circle"
          layout="vertical"
          verticalAlign="bottom"
          iconSize={10}
          content={<CustomLegendText />}
        />
        <Pie cx="50%" cy="50%" data={data} dataKey="value" outerRadius={100} innerRadius={80} />
      </PieChart>
    </ResponsiveContainer>
  );
};

const CustomLegendText = ({ payload }: LegendProps) => {
  return (
    <>
      {payload &&
        payload.map((entry) => (
          <div key={entry.value} className={styles.legend}>
            <div className={styles.iconGroup}>
              <div
                className={styles.icon}
                style={{
                  backgroundColor: entry.color,
                }}
              ></div>
              <p className={styles.label}>{entry.value}</p>
            </div>
            <p className={styles.value}>{entry.payload?.value}</p>
          </div>
        ))}
    </>
  );
};

export default ReleaseChart;
