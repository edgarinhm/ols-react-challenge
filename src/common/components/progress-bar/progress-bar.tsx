import { useId } from "react";

interface ProgressBarProps {
  currentValue: number;
  maxValue: number;
  minValue?: number;
}
const ProgressBar = ({ currentValue, maxValue, minValue = 0 }: ProgressBarProps) => {
  const id = useId();
  return (
    <progress
      id={`${id}-progress-bar`}
      value={currentValue}
      max={maxValue}
      aria-valuenow={currentValue}
      aria-valuemin={minValue}
      aria-valuemax={maxValue}
    />
  );
};

export default ProgressBar;
