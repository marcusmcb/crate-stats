import React, { Fragment, useEffect, useState, useRef } from "react";
import axios from "axios";
import Titlebar from "./Titlebar";
import TrackData from "./data_blocks/TrackData";
import BPMData from "./data_blocks/BPMData";
import PlaylistData from "./data_blocks/PlaylistData";

import DragAndDrop from "./DragAndDrop";
// import BarChart from "./d3/basicchart";

import "./testreport.css";

const TestReport = () => {
  const [data, setData] = useState(null);
  const [isBusy, setIsBusy] = useState(true);
  const isInitialMount = useRef(true);

  const getDataFromCSV = (userData) => {
    axios.post("http://localhost:5000/sendFile", userData).then((response) => {
      console.log("* * * * * * * * * RESPONSE FROM EXPRESS ");
      console.log(response.data);
      setData(response.data);
    });
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setIsBusy(false);
    }
  });

  return (
    <Fragment>
      <Titlebar />
      <DragAndDrop getDataFromCSV={getDataFromCSV} />
      <div className="testpage-body">
        {isBusy === true ? (
          <div className="data-block loading">Awaiting data...</div>
        ) : (
          <div>
            <div className="data-block">
              { data.playlist_data.has_playlist_data === false ? (
                <h3 className="no-data">No Playlist Data</h3>
              ) : (
                <PlaylistData data={data.playlist_data} />
              )}
            </div>
            <div className="data-block">
              {data.track_data.has_track_data === false ? (
                <h3 className="no-data">No Track Data</h3>
              ) : (
                <TrackData data={data.track_data} />
              )}
            </div>
            <div className="data-block">
              {data.bpm_data.has_bpm_data === false ? (
                <h3 className="no-data">No BPM Data</h3>
              ) : (
                <BPMData data={data.bpm_data} />               
              )}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default TestReport;
