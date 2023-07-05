"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useMemo } from "react";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartColors: { [k: string]: any } = {
  PPI: {
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
  FAEC: {
    borderColor: "rgb(53, 235, 123)",
    backgroundColor: "rgba(53, 235, 123, 0.5)",
  },
  "": {
    borderColor: "rgb(99, 190, 255)",
    backgroundColor: "rgba(99, 190, 255, 0.5)",
  },
};

const years = ["2019", "2020", "2021"];

export const Chart = ({
  data,
  area,
  type,
}: {
  data: any;
  area: string;
  type: string;
}) => {
  let title = `${area} - ${type}`.toLowerCase();
  title = title.replace(/(^|\s)\S/g, (l) => l.toUpperCase());

  const formatedData = useMemo(() => {
    return {
      labels: years,
      datasets: [
        {
          label: "",
          data,
          borderColor: "rgb(99, 190, 255)",
          backgroundColor: "rgba(99, 190, 255, 0.5)",
        },
      ],
    };
  }, [data]);

  const options = {
    responsive: true,
    scales: {
      y: {
        suggestedMax: 10,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <div style={{ width: 300 }}>
      <Line options={options} data={formatedData} />
    </div>
  );
};
