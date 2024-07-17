import ProgressBar from "./progress-bar";
import styles from "./progress-bar.module.scss";

interface ProgressBarWithLabelProps {
  currentValue: number;
  label: string;
  maxValue: number;
  minValue?: number;
  unit?: string;
}
const ProgressBarWithLabel = ({
  currentValue,
  label,
  maxValue,
  minValue = 0,
  unit,
}: ProgressBarWithLabelProps) => {
  return (
    <div className={styles.progressBar} role="progressbar">
      <label htmlFor="progress-bar">{label}</label>
      <ProgressBar currentValue={currentValue} maxValue={maxValue} minValue={minValue} />
      <div className={styles.currentValue}>
        {currentValue}
        {unit}
      </div>
    </div>
  );
};

export default ProgressBarWithLabel;
