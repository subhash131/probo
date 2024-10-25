"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = () => {
  const labels = [
    "21 Sep",
    "26 Sep",
    "03 Oct",
    "09 Oct",
    "14 Oct",
    "20 Oct",
    "25 Oct",
  ];

  const datasets = [42, 95, 27, 83, 29, 12, 86, 93, 60, 20, 50, 34, 60, 20, 98];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "trend",
        data: datasets,
        fill: false,
        borderColor: "#197BFF",
        tension: 0.2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            label += `${context.raw}%`; // Displays the raw data value
            return label;
          },
        },
      },
    },

    scales: {
      y: {
        grid: {
          display: false,
        },
        title: {
          display: false,
        },
        display: false,
        min: 10,
      },
      x: {
        grid: {
          display: false,
        },
        title: {
          display: false,
        },
        display: false,
      },
    },
  };

  return (
    <div className="size-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
