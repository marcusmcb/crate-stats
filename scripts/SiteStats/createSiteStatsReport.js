const { getPlaylists } = require("../../firebase");

function calculateAverage(arr) {
  if (!Array.isArray(arr)) {
    return null;
  }
  let sum = arr.reduce((a, b) => a + b, 0);
  let average = sum / arr.length;
  return average.toFixed(2);
}

const createSiteStatsReport = async () => {
  let bpmArray = [];
  let keyArray = []
  await getPlaylists().then((data) => {
    data.forEach((item) => {
      console.log(item.data.bpm_data.average_bpm);
      bpmArray.push(new Number(item.data.bpm_data.average_bpm));
    //   keyArray.push(item.data.key_data.most_common_key.key)
    });
  });
  console.log(keyArray)
  const siteAverageBPM = calculateAverage(bpmArray)
  console.log(siteAverageBPM)
  
  let siteStatsReport = {}

  siteStatsReport.average_bpm = siteAverageBPM
  siteStatsReport.total_playlists_submitted = bpmArray.length
  return siteStatsReport
};

module.exports = createSiteStatsReport;
