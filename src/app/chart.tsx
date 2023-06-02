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

const defaultFinances = { PPI: 0, FAEC: 0, "": 0 };
const defaultYears = {
  "2020": defaultFinances,
  "2021": defaultFinances,
  "2022": defaultFinances,
  "2023": defaultFinances,
};

export const Chart = ({
  data,
  city,
  type,
}: {
  data: any[];
  city: string;
  type: string;
}) => {
  const formatedData = useMemo(() => {
    const structured = data
      .filter(
        (item) =>
          item["TIPO CIRURGIA "] === type &&
          item["MUNICÍPIO DE ORIGEM"] === city
      )
      .reduce((acc, cur) => {
        const year = cur["DATA DA CIRURGIA"].split("/").at(-1);
        const funding = cur["FINANCIAMENTO"];

        if (funding === "PROGRAMA ESTADUAL" || funding === "--") return acc;

        const accYear = acc[year];
        return {
          ...acc,
          [year]: {
            ...accYear,
            [funding]: accYear[funding] ? accYear[funding] + 1 : 1,
          },
        };
      }, defaultYears);

    return {
      labels: Object.keys(structured),
      datasets: Object.keys(structured["2021"]).map((finance, index) => ({
        label: finance === "" ? "Não informado" : finance,
        data: Object.keys(structured).map((year) => structured[year][finance]),
        borderColor: chartColors[finance].borderColor,
        backgroundColor: chartColors[finance].backgroundColor,
      })),
    };
  }, [data, city, type]);

  let title = `${city} - ${type}`.toLowerCase();
  title = title.replace(/(^|\s)\S/g, (l) => l.toUpperCase());

  const options = {
    responsive: true,
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
