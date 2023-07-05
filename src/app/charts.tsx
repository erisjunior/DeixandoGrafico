"use client";

import { useMemo, useState } from "react";
import { Chart } from "./chart";

const areasLabels = [
  "1° - Sao Jose de Mipibu",
  "2° - Mossoro",
  "3° - Joao Camara",
  "4° - Caico",
  "5° - Santa Cruz",
  "6° - Pau dos Ferros",
  "7° - Metropolitana",
  "8° - Açu",
];

export const Charts = ({
  data,
}: {
  data: {
    areas: any;
  };
}) => {
  const [search, setSearch] = useState("");

  const types = useMemo(() => {
    return Object.keys(data.areas[0]).filter((type) => {
      return type.toLowerCase().includes(search.toLowerCase());
    });
  }, [data, search]);

  return (
    <>
      <div>
        {areasLabels.map((area, areaIndex) => (
          <div
            key={area}
            style={{ display: "flex", alignItems: "center", padding: "2rem" }}
          >
            <p
              style={{
                minWidth: 300,
                fontWeight: 400,
                fontSize: "1.5rem",
                height: "fit-content",
              }}
            >
              {area}
            </p>
            {types.map((type) => {
              return (
                <Chart
                  key={`${area}-${type}`}
                  data={data.areas[areaIndex][type]}
                  type={type}
                  area={area}
                />
              );
            })}
          </div>
        ))}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              minWidth: 300,
              maxWidth: 300,
              marginLeft: "1rem",
            }}
          >
            <label
              style={{
                fontWeight: 400,
                fontSize: "1.5rem",
                height: "fit-content",
              }}
            >
              Pesquisar
            </label>
            <input
              type="text"
              placeholder="Pesquisar"
              style={{
                width: "100%",
                padding: "1rem",
                fontSize: "1.5rem",
                border: "1px solid #000",
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {types.map((type) => (
            <p
              key={type}
              style={{
                minWidth: 300,
                maxWidth: 300,
                fontWeight: 400,
                fontSize: "1.5rem",
                height: "fit-content",
                padding: "2rem",
              }}
            >
              {type}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};
