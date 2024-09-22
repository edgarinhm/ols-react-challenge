import { PieChart, Pie, Tooltip, ResponsiveContainer, Label } from "recharts";
import styles from "./release-chart.module.scss";

interface ReleaseChartProps {
  data: { name: string; value: number; fill: string }[];
}

const ReleaseChart = ({ data }: ReleaseChartProps) => {
  return (
    <div className={styles.container}>
      <ResponsiveContainer height={"75%"}>
        <PieChart>
          <Tooltip />
          <Pie
            cx="50%"
            cy="50%"
            data={data}
            dataKey="value"
            outerRadius={"100%"}
            innerRadius={"80%"}
            strokeWidth={0}
          >
            <Label
              width={30}
              position="center"
              value={data.reduce(
                (accumulator, currentValue) => accumulator + currentValue.value,
                0
              )}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <CustomLegendText data={data} />
    </div>
  );
};

const CustomLegendText = ({ data }: ReleaseChartProps) => {
  return (
    <>
      {data?.map((entry) => (
        <div key={entry?.value} className={styles.legendText}>
          <div className={styles.legend}>
            <div className={styles.iconGroup}>
              <div
                className={styles.icon}
                style={{
                  backgroundColor: entry?.fill,
                }}
              ></div>
              <p className={styles.label}>{entry?.name}</p>
            </div>
          </div>
          <div key={entry?.value} className={styles.legend}>
            <p className={styles.value}>{entry?.value}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ReleaseChart;
