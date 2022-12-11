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
  let csvData = `{${csvRows.join("}, {")}}`;
  return csvData;
};

// helper method to replace index icon in csv data
const replaceHash = (string) => {
  return string.replace(/��#/g, "index");
};

// helper method to return JSON string as array of objects
const convertJsonStringToArray = (jsonString) => {
  return JSON.parse("[" + jsonString + "]");
};

// helper method to remove unnecessary artwork and index values
// from playlist data
const cleanTraktorArray = (array) => {
  for (var i = 0; i < array.length; i++) {
    delete array[i].Artwork;
    delete array[i].index;
  }
  return array;
};

// helper method to replace white space with underscores
// in playlist array objects
const cleanTraktorKeys = (array) => {
  var newArray = [];
  for (var i = 0; i < array.length; i++) {
    var object = {};
    for (var key in array[i]) {
      if (array[i].hasOwnProperty(key)) {
        var newKey = key.replace(/\s/g, "_");
        object[newKey] = array[i][key];
      }
    }
    newArray.push(object);
  }
  return newArray;
};

module.exports = {
  convertToCSV: convertToCSV,
  replaceHash: replaceHash,
  convertJsonStringToArray: convertJsonStringToArray,
  cleanTraktorArray: cleanTraktorArray,
  cleanTraktorKeys: cleanTraktorKeys
};
