"use server";

import csv from "csv-parser";
import * as fs from "fs";
import * as path from "path";

export async function get(): Promise<any[]> {
  return await new Promise((resolve, reject) => {
    const results: any[] = [];
    console.log(__dirname);
    fs.createReadStream(path.join(__dirname, "../public/dados.csv"))
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        const mapTypes = new Map();
        results.forEach((item) => {
          const key = item["TIPO CIRURGIA "];
          if (mapTypes.has(key)) {
            mapTypes.set(key, mapTypes.get(key) + 1);
          } else {
            mapTypes.set(key, 1);
          }
        });
        const topTypes = Array.from(mapTypes)
          .sort((a, b) => a[1] - b[1])
          .reverse()
          .slice(0, 20);

        const mapCities = new Map();
        results.forEach((item) => {
          const key = item["MUNICÍPIO DE ORIGEM"];
          if (key === "") return;
          if (mapCities.has(key)) {
            mapCities.set(key, mapCities.get(key) + 1);
          } else {
            mapCities.set(key, 1);
          }
        });
        const topCities = Array.from(mapCities)
          .sort((a, b) => a[1] - b[1])
          .reverse()
          .slice(0, 20);

        resolve(
          results.filter((item) => {
            return (
              topTypes.find((type) => type[0] === item["TIPO CIRURGIA "]) &&
              topCities.find((city) => city[0] === item["MUNICÍPIO DE ORIGEM"])
            );
          })
        );
      });
  });
}
