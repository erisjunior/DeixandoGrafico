"use client";

import { useMemo } from "react";
import { Chart } from "./chart";

export const Charts = ({ data }: { data: any[] }) => {
  const cities = useMemo(() => {
    return data
      .map((item) => item["MUNICÍPIO DE ORIGEM"])
      .filter((value, index, self) => self.indexOf(value) === index);
  }, [data]);

  const types = useMemo(() => {
    return data
      .map((item) => item["TIPO CIRURGIA "])
      .filter((value, index, self) => self.indexOf(value) === index);
  }, [data]);

  return (
    <>
      <div>
        {cities.map((city) => (
          <div
            key={city}
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
              {city}
            </p>
            {types.map((type) => (
              <Chart
                key={`${city}-${type}`}
                data={data}
                type={type}
                city={city}
              />
            ))}
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
            }}
          />
          {types.map((type) => (
            <p
              key={type}
              style={{
                minWidth: 300,
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
