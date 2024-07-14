import { useMemo } from "react";

export const useChartServerReport = () => {
  const AreaChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      filler: {
        propagate: false,
      },
    },
    scales: {
      x: {
        display: true,
        ticks: {
          display: true,
          padding: 10,
          fontColor: "#6C7383",
        },
        gridLines: {
          display: false,
          drawBorder: false,
          color: "transparent",
          zeroLineColor: "#eeeeee",
        },
      },
      y: {
        display: true,
        ticks: {
          display: true,
          autoSkip: false,
          maxRotation: 0,
          stepSize: 20,
          min: 0,
          max: 10,
          padding: 18,
          fontColor: "#6C7383",
        },
        gridLines: {
          display: true,
          color: "#f2f2f2",
          drawBorder: false,
        },
      },
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
    },
    elements: {
      line: {
        tension: 0.35,
      },
      point: {
        radius: 0,
      },
    },
  };
  const AreaChartData = (charTimeData: string[], charValueData: number[]) => {
    return useMemo(() => {
      const labels = [...charTimeData];
      return {
        labels,
        datasets: [
          {
            data: [...charValueData],
            borderColor: ["#4747A1"],
            borderWidth: 2,
            fill: false,
            label: "Porcentaje de uso",
          },
        ],
      };
    }, [charTimeData, charValueData]);
  };

  return {
    AreaChartOptions,
    AreaChartData,
  };
};
