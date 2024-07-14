import dayjs from "dayjs";
import { useMemo } from "react";

export const useChartCommitsReport = () => {
  const AreaChartOptions = {
    cornerRadius: 5,
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 20,
        bottom: 0,
      },
    },
    scales: {
      x: {
        stacked: false,
        ticks: {
          beginAtZero: true,
          fontColor: "#6C7383",
          padding: 10,
        },
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
          display: false,
        },
        barPercentage: 1,
      },
      y: {
        display: true,
        gridLines: {
          display: true,
          drawBorder: false,
          color: "#F2F2F2",
        },
        ticks: {
          display: true,
          min: 0,
          max: 560,
          callback: function (value: unknown) {
            return value + "$";
          },
          autoSkip: true,
          maxTicksLimit: 10,
          fontColor: "#6C7383",
        },
      },
    },
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };
  const AreaChartData = (months: number[], chartFeatureData: number[], chartFixData: number[]) => {
    return useMemo(() => {
      // The following colors will be used sequentially for the chart bars
      const backgroundColors = ["#98BDFF", "#4B49AC"];
      const monthsShort = dayjs.monthsShort();

      const labels = months.map(
        (month) => monthsShort[month - 1].charAt(0).toUpperCase() + monthsShort[month - 1].slice(1)
      );

      return {
        labels,
        datasets: [
          {
            label: "Feat",
            data: [...chartFeatureData],
            backgroundColor: backgroundColors[0],
          },
          {
            label: "Fix",
            data: [...chartFixData],
            backgroundColor: backgroundColors[1],
          },
        ],
      };
    }, [chartFeatureData, chartFixData, months]);
  };

  return {
    AreaChartOptions,
    AreaChartData,
  };
};
