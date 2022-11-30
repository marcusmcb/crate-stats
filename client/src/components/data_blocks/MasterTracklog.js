import React, { Fragment } from 'react'

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandMore from "../helpers/CardExpander";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Modal from "@mui/material/Modal";

const MasterTracklog = (masterTrackLog) => {
  console.log(masterTrackLog)
  return (
    <Fragment>
      <div>
      <Typography
          sx={{ fontSize: 20 }}
          color="#c5e1a5"
          fontWeight={500}
          gutterBottom
        >
          master track log:
        </Typography>
      </div>
    </Fragment>
  )
}

export default MasterTracklog

// add UI elements to give this feature a "timeline" look
// with key events (shortest/longest track, biggest bpm change, etc)
// highlighted accordingly in display
