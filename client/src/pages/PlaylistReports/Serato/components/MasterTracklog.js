import React, { Fragment } from 'react'
import Typography from "@mui/material/Typography";

const MasterTracklog = (masterTrackLog) => {
  // console.log(masterTrackLog)
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
