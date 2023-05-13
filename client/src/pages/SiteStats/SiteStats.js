import React, { Fragment, useState, useEffect } from "react";
import Titlebar from "../../components/shared/Titlebar";

import axios from "axios";

import { Typography } from "@mui/material";
import { Divider } from "semantic-ui-react";

import "./sitestats.css";

const SiteStats = () => {
  const [siteStats, setSiteStats] = useState();
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const getSiteStats = () => {
      axios.post("/getSiteStats").then((response) => {
        console.log(response.data);
        setSiteStats(response.data);
        setHasData(true);
      });
    };
    getSiteStats();
  }, []);
  return (
    <Fragment>
      <div className="sitestats-pagebody">
        <Titlebar />
        {hasData ? (
          <div>
            <div>
              <Typography className="page-header-text">
                sitewide statistics:
              </Typography>
            </div>
            <Typography style={{ textAlign: "center" }}>
              - total playlists submitted: {siteStats.total_playlists_submitted}
            </Typography>
            <Typography style={{ textAlign: "center" }}>
              - average bpm: {siteStats.average_bpm}
            </Typography>
            <Typography style={{ textAlign: "center" }}>
              - likelihood of doubles, etc (deeper dives)
            </Typography>
            <Typography style={{ textAlign: "center" }}>
              - playlists submitted
            </Typography>
            <Divider />
            <div></div>
          </div>
        ) : (
          <div>
            <Typography className="page-header-text">
              fetching site stats...
            </Typography>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default SiteStats;
