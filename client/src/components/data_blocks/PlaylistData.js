import React, { Fragment } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import MinutesText from "../text_spans/minutesText";
import SecondsText from "../text_spans/secondsText";
import MinuteText from "../text_spans/minuteText";
import SecondText from "../text_spans/secondText";
import HoursText from "../text_spans/hoursText";
import HourText from "../text_spans/hourText";

const PlaylistData = (playlistData) => {
  return (
    <Fragment>
      <div>
        {/* playlist data header */}
        <Typography
          sx={{ fontSize: 20 }}
          color="#c5e1a5"
          fontWeight={500}
          gutterBottom
        >
          set list data:
        </Typography>
        {/* playlist data cards */}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={5} sm={12} lg={6}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  {/* crate stats card */}
                  <Typography>crate stats for:</Typography>
                  <Typography
                    variant="h4"
                    component="div"
                    fontWeight={500}
                    sx={{ color: "#558b2f" }}
                  >
                    {playlistData.data.title}
                  </Typography>
                  <Typography sx={{ marginTop: "10px" }} color="text.secondary">
                    set date:
                  </Typography>
                  <Typography variant="h5" component="div">
                    {playlistData.data.start_time_formatted.day},{" "}
                    {playlistData.data.start_time_formatted.month}{" "}
                    {playlistData.data.start_time_formatted.dateday}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={7} sm={12} lg={6}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  {/* set length/start time card */}
                  <Typography color="text.secondary">set length:</Typography>
                  <Typography
                    variant="h4"
                    component="div"
                    fontWeight={500}
                    sx={{ color: "#558b2f" }}
                  >
                    {playlistData.data.playlist_length_formatted.hours > 1 ? (
                      playlistData.data.playlist_length_formatted.minutes > 1 ||
                      playlistData.data.playlist_length_formatted.minutes ===
                        0 ? (
                        <div>
                          <span>
                            {playlistData.data.playlist_length_formatted.hours}{" "}
                            <HoursText />,{" "}
                            {
                              playlistData.data.playlist_length_formatted
                                .minutes
                            }{" "}
                            <MinutesText />
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span>
                            {playlistData.data.playlist_length_formatted.hours}{" "}
                            <HoursText />,{" "}
                            {
                              playlistData.data.playlist_length_formatted
                                .minutes
                            }{" "}
                            <MinuteText />
                          </span>
                        </div>
                      )
                    ) : playlistData.data.playlist_length_formatted.hours ===
                      1 ? (
                      playlistData.data.playlist_length_formatted.minutes > 1 ||
                      playlistData.data.playlist_length_formatted.minutes ===
                        0 ? (
                        <div>
                          <span>
                            {playlistData.data.playlist_length_formatted.hours}{" "}
                            <HourText />,{" "}
                            {
                              playlistData.data.playlist_length_formatted
                                .minutes
                            }{" "}
                            <MinutesText />
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span>
                            {playlistData.data.playlist_length_formatted.hours}{" "}
                            <HourText />,{" "}
                            {
                              playlistData.data.playlist_length_formatted
                                .minutes
                            }{" "}
                            <MinuteText />
                          </span>
                        </div>
                      )
                    ) : playlistData.data.playlist_length_formatted.minutes !==
                      0 ? (
                      playlistData.data.playlist_length_formatted.seconds > 1 ||
                      playlistData.data.playlist_length_formatted.seconds ===
                        0 ? (
                        <div>
                          <span>
                            {
                              playlistData.data.playlist_length_formatted
                                .minutes
                            }{" "}
                            <MinutesText />,{" "}
                            {
                              playlistData.data.playlist_length_formatted
                                .seconds
                            }{" "}
                            <SecondsText />
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span>
                            {
                              playlistData.data.playlist_length_formatted
                                .minutes
                            }{" "}
                            <MinutesText />,{" "}
                            {
                              playlistData.data.playlist_length_formatted
                                .seconds
                            }{" "}
                            <SecondText />
                          </span>
                        </div>
                      )
                    ) : (
                      <div>
                        <span>Too short to determine set length</span>
                      </div>
                    )}
                  </Typography>
                  <Typography sx={{ marginTop: "10px" }} color="text.secondary">
                    start time:
                  </Typography>
                  <Typography variant="h5" component="div">
                    {playlistData.data.start_time}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Fragment>
  );
};

export default PlaylistData;

// DEV NOTES FOR PLAYLISTDATA.JS
// -----------------------------
//
// check for 12/24 hour formatting in set_start_time (fix in createSeratoReport script)
//
// add helper method to convert 24 hour to 12 hour format (default view - add as user preference in UI?)
//
// break longer set title strings (underscores, etc) into text with whitespace (solves responsive UI issue)
//
// move component-specific css into its own corresponding file
//
// check playlist_length_formatted for source of null values (seen in JTM data sample)
//
// remove playlist artist value from csv import as there's no way to set it in Serato DJ Pro
