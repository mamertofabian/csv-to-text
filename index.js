import fs from "fs";
import { createReadStream } from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import csv from "csv-parser";
import colors from "colors";

const __dirname = dirname(fileURLToPath(import.meta.url));

const formatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = "" + d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return ["1", year.substr(2, 2), month, day].join("");
};

const data = [];
const processData = () => {
  createReadStream("./data.csv")
    .pipe(csv())
    .on("data", (row) => {
      data.push(row);
      console.log(formatDate(row.dt));
    })
    .on("end", () => {
      console.log(`Finished reading archive data. ${data.length} rows`);
    });
};

processData();
