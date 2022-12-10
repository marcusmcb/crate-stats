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
  return string.replace(/��#/g, "index");
};

function convertJsonStringToArray(jsonString) {
  return JSON.parse('[' + jsonString + ']');
}

setTimeout(() => {
  let x = convertToCSV(textData);  
  console.log(x)
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
    // console.log(z)
    // let w = convertJsonStringToArray(z)
    // console.log(w)
    
    console.log("******************************");
    // convert json string to object
    let stringToObj = z.split(/\},\s*\{/g);

    let arr = [];
    // let blarfy = Object.values(stringToObj)
    // console.log(blarfy)
    let temp = Object.entries(stringToObj).forEach((item) => {
      arr.push(item);
    });
    
    // let ceecee = convertObjectToArray(beebee)
    // console.log(ceecee)
  } catch (err) {
    console.log("ERR: ", err);
  }
  let z = JSON.parse(JSON.stringify(y));
}, 500);
