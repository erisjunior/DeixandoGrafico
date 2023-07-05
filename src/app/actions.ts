"use server";

import csv from "csv-parser";
import * as fs from "fs";
import * as path from "path";

// Total;2311;3060;2030;2183;1248;1915;8111;907;21765
// Total;2659;3603;2181;2405;1391;2060;9215;1158;24672
// Total;2945;3657;2419;2618;1510;2274;10140;1204;26767

export async function get(): Promise<{
  areas: any;
}> {
  return await new Promise((resolve, reject) => {
    const areas: any = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
    fs.createReadStream(path.join(__dirname, "../../../public/2019.csv"))
      .pipe(csv())
      .on("data", (data) => {
        const value = Object.values(data)[0] as string;
        const [cause, ...amounts] = value.split(";");
        amounts.forEach((amount, index: number) => {
          areas[index][cause] = [amount, 0, 0];
        });
      })
      .on("end", () => {
        fs.createReadStream(path.join(__dirname, "../../../public/2020.csv"))
          .pipe(csv())
          .on("data", (data) => {
            const value = Object.values(data)[0] as string;
            const [cause, ...amounts] = value.split(";");
            amounts.forEach((amount, index: number) => {
              if (areas[index][cause]) {
                areas[index][cause][1] = amount;
              } else {
                areas[index][cause] = [0, amount, 0];
              }
            });
          })
          .on("end", () => {
            fs.createReadStream(
              path.join(__dirname, "../../../public/2021.csv")
            )
              .pipe(csv())
              .on("data", (data) => {
                const value = Object.values(data)[0] as string;
                const [cause, ...amounts] = value.split(";");
                amounts.forEach((amount, index: number) => {
                  if (areas[index][cause]) {
                    areas[index][cause][2] = amount;
                  } else {
                    areas[index][cause] = [0, amount, 0];
                  }
                });
              })
              .on("end", () => {
                resolve({
                  areas,
                });
              });
          });
      });
  });
}
