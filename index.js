import fs from "fs";
import { createReadStream } from "fs";
import csv from "csv-parser";

const formatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = "" + d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return ["1", year.substr(2, 2), month, day].join("");
};

const writeStream = fs.createWriteStream("./output.txt");

const data = [];
const processData = () => {
  createReadStream("./data.csv")
    .pipe(csv())
    .on("data", (row) => {
      data.push(row);
      const line1 = `KeyValues = Vector.Create();`;
      const line2 = `KeyValues.Push_Back( ${row.nvalue} );`;
      const line3 = `KeyValues.Push_Back( ${row.pvalue} );`;
      const line4 = `MyDates["${formatDate(row.dt)}"] = KeyValues;`;
      const item = `${line1}\n${line2}\n${line3}\n${line4}\n\n`;
      writeStream.write(item);
    })
    .on("end", () => {
      console.log(`Finished reading data. ${data.length} rows`);
      writeStream.end();
      console.log(`Finished writint output.`);
    });
};

processData();
