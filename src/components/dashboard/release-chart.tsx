import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, LegendProps, Label } from "recharts";
import styles from "./release-chart.module.scss";

interface ReleaseChartProps {
  data: { name: string; value: number; fill: string }[];
}

const ReleaseChart = ({ data }: ReleaseChartProps) => {
  return (
    <ResponsiveContainer height={350}>
      <PieChart>
        <Tooltip />
        <Legend
          layout="vertical"
          verticalAlign="bottom"
          content={<CustomLegendText />}
          align="left"
        />
        <Pie
          cy="35%"
          data={data}
          dataKey="value"
          outerRadius={120}
          innerRadius={90}
          strokeWidth={0}
        >
          <Label
            width={30}
            position="center"
            value={data.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)}
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

const CustomLegendText = ({ payload }: LegendProps) => {
  return (
    <div className={styles.legendText}>
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
    </div>
  );
};

export default ReleaseChart;
