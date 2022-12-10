const { text } = require("body-parser");
const fs = require("fs");

let textData;

fs.readFile(
  "../scripts/sample_traktor_data/HISTORY 2020-02-15.txt",
  "utf8",
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      textData = data;
      return data;
    }
  }
);

const convertToCSV = (data) => {
  const rows = data.split('\n');
  const headers = rows[0].split('\t');
  const csvRows = rows.slice(1).map((row) => {
    const values = row.split('\t');
    return headers.map((header, i) => {
      return `"${header}": "${values[i]}"`;
    }).join(', ');
  });
  console.log(`{${csvRows.join('}, {')}}`)
  let x = `{${csvRows.join('}, {')}}`;
  return x
}

setTimeout(() => {
  // console.log("TEXTDATA ------------------", textData);
  console.log("CSV? ----------------------", convertToCSV(textData))  
}, 500);



// console.log("Converted? :", convertToCSV(textData))
