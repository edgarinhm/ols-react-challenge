import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import styles from "./release-chart.module.scss";

interface ReleaseChartProps {
  data: { name: string; value: number; fill: string }[];
}

const ReleaseChart = ({ data }: ReleaseChartProps) => {
  const RenderColorfulLegendText = (props) => {
    const { payload } = props;
    return (
      <>
        {payload.map((entry, index) => (
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
            <p className={styles.value}>{entry.payload.value}</p>
          </div>
        ))}
      </>
    );
  };

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
          content={<RenderColorfulLegendText />}
        />
        <Pie cx="50%" cy="50%" data={data} dataKey="value" outerRadius={100} innerRadius={80} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ReleaseChart;
