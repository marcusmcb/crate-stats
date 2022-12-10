const fs = require("fs");

let textData;

// read txt data from test file
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

// convert txt data to csv format
const convertToCSV = (data) => {
  const rows = data.split("\n");
  const headers = rows[0].split("\t");
  const csvRows = rows.slice(1).map((row) => {
    const values = row.split("\t");
    return headers
      .map((header, i) => {
        return `"${header}": "${values[i]}"`;
      })
      .join(", ");
  });
  let x = `{${csvRows.join("}, {")}}`;
  return x;
};

// helper method to replace index icon in csv data
const replaceHash = (string) => {
  return string.replace(/��#/g, 'index');
};

function convertObjectToArray(object) {
  var array = [];
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      array.push(object[key]);
    }
  }
  return array;
}

setTimeout(() => {
  let x = convertToCSV(textData);
  let y = replaceHash(x);
  try {
    y = y.replace(/[\u0000-\u001F]+/g, "");
    y = y
      .replace(/\\n/g, "\\n")
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, "\\&")
      .replace(/\\r/g, "\\r")
      .replace(/\\t/g, "\\t")
      .replace(/\\b/g, "\\b")
      .replace(/\\f/g, "\\f");
    let z = JSON.parse(JSON.stringify(y));    
    console.log("******************************")
    let beebee = z.split(/\},\s*\{/g)
    // console.log(beebee)
    let ceecee = convertObjectToArray(beebee)
    console.log(ceecee)
  } catch (err) {
    console.log("ERR: ", err);
  }
  let z = JSON.parse(JSON.stringify(y));  
}, 500);
