import React, { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import Titlebar from "../../../components/shared/Titlebar";
import RekordboxFileInput from "../../../components/shared/RekordboxFileInput";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Divider } from "semantic-ui-react";
import "./rekordboxplaylistreport.css";

const RekordboxPlaylistReport = () => {
  const [data, setData] = useState(null);
  const [isBusy, setIsBusy] = useState(true);
  const isInitialMount = useRef(true);

  const getDataFromTXT = (userData) => {
    axios.post("/sendRekordboxFile", userData).then((response) => {
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
      {/* <DragAndDrop /> */}
      <RekordboxFileInput getDataFromTXT={getDataFromTXT} />
      <div className="playlistreport-body">
        {isBusy ? (
          <div className="data-block-two await-data">
            <Box sx={{ flexGrow: 1 }}>
              <Grid>
                <Card>
                  <CardContent>
                    <Grid>
                      <Grid item mt={1.5}>
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: "500",
                          }}
                        >
                          Upload or drop your exported Rekordbox TXT file above
                          to view your CrateStats analysis.
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Box>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "14px",
                marginTop: "20px",
                paddingBottom: "15px",
                color: "white",
              }}
            >
              Don't have Rekordbox? Grab a{" "}
              <span>
                <a
                  style={{ color: "#c5e1a5", fontWeight: "400" }}
                  href={"/"}
                  download=""
                  target="_blank"
                  rel="noreferrer"
                >
                  test file
                </a>
              </span>{" "}
              to demo this page.
            </Typography>
          </div>
        ) : (
          <div>
            <div className="data-block-two">
              <Typography
                sx={{ fontSize: 20 }}
                color="white"
                fontWeight={500}
                gutterBottom
              >
                track data:
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Grid item md={5} sm={12}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item mt={1.5}>
                          <Typography sx={{ fontSize: 16, fontWeight: "500" }}>
                            total tracks played:
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="h3"
                            component="div"
                            fontWeight={500}
                            sx={{ color: "rgba(29, 79, 145, 0.8)" }}
                          >
                            {data.track_data.total_tracks_played}
                          </Typography>
                        </Grid>
                        <Grid item mt={1.5}>
                          <Typography sx={{ fontSize: 16, fontWeight: "500" }}>
                            average track length:
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="h3"
                            component="div"
                            fontWeight={500}
                            sx={{ color: "rgba(29, 79, 145, 0.8)" }}
                          >
                            {data.track_data.average_track_length}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider />
                      <Grid container spacing={2}>
                        <Grid item>
                          <Typography sx={{ fontSize: 16 }}>
                            shortest track:
                          </Typography>
                          <Typography
                            variant="h5"
                            component="div"
                            fontWeight={500}
                          >
                            {data.track_data.shortest_track_played.title}
                          </Typography>
                          <Typography
                            variant="h5"
                            component="div"
                            fontWeight={500}
                            sx={{ color: "rgba(29, 79, 145, 0.8)" }}
                          >
                            ({data.track_data.shortest_track_played["length"]})
                          </Typography>
                          <Typography sx={{ fontSize: 14, marginTop: 1 }}>
                            - played @{" "}
                            <span
                              style={{ color: "rgba(29, 79, 145, 0.8)", fontWeight: "500" }}
                            >
                              {/* {data.track_data.shortest_track.played_at} */}
                              No Value
                            </span>
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography sx={{ fontSize: 16 }}>
                            longest track:
                          </Typography>
                          <Typography
                            variant="h5"
                            component="div"
                            fontWeight={500}
                          >
                            {data.track_data.longest_track_played.title}
                          </Typography>
                          <Typography
                            variant="h5"
                            component="div"
                            fontWeight={500}
                            sx={{ color: "rgba(29, 79, 145, 0.8)" }}
                          >
                            ({data.track_data.longest_track_played["length"]})
                          </Typography>
                          <Typography sx={{ fontSize: 14, marginTop: 1 }}>
                            - played @{" "}
                            <span
                              style={{ color: "rgba(29, 79, 145, 0.8)", fontWeight: "500" }}
                            >
                              {/* {data.track_data.longest_track.played_at} */}
                              No Value
                            </span>
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Box>
            </div>
            <div className="data-block-two">
              <Typography
                sx={{ fontSize: 20 }}
                color="white"
                fontWeight={500}
                gutterBottom
              >
                bpm data:
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Grid item md={5} sm={12}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item mt={1}>
                          <Typography sx={{ fontSize: 16, fontWeight: "500" }}>
                            bpm range:
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="h4"
                            component="div"
                            fontWeight={500}
                            sx={{ color: "rgba(29, 79, 145, 0.8)" }}
                          >
                            {data.bpm_data.bpm_range.minBPM} -{" "}
                            {data.bpm_data.bpm_range.maxBPM}
                          </Typography>
                        </Grid>
                        <Grid item mt={1}>
                          <Typography sx={{ fontSize: 16, fontWeight: "500" }}>
                            average bpm:
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="h4"
                            component="div"
                            fontWeight={500}
                            sx={{ color: "rgba(29, 79, 145, 0.8)" }}
                          >
                            {data.bpm_data.average_bpm}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider />
                      <Grid container spacing={2}>
                        <Grid item>
                          <Typography sx={{ fontSize: 16 }}>
                            biggest single bpm change:
                          </Typography>
                          <Typography
                            variant="h5"
                            component="div"
                            fontWeight={500}
                            color="rgba(29, 79, 145, 0.8)"
                          >
                            {/* {data.bpm_data.biggest_bpm_change.track_one.bpm} bpm
                            - {data.bpm_data.biggest_bpm_change.track_two.bpm}{" "}
                            bpm */}
                            No Value
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} sx={{ marginTop: 1 }}>
                        <Grid item>
                          <Typography
                            sx={{
                              fontSize: 16,
                              fontWeight: "500",
                              color: "rgba(29, 79, 145, 0.8)",
                            }}
                          >
                            from:
                          </Typography>
                          <Typography
                            variant="h5"
                            component="div"
                            fontWeight={500}
                          >
                            {/* "{data.bpm_data.biggest_bpm_change.track_one.name}" */}
                            No Value
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} sx={{ marginTop: 1 }}>
                        <Grid item>
                          <Typography
                            sx={{
                              fontSize: 16,
                              fontWeight: "500",
                              color: "rgba(29, 79, 145, 0.8)",
                            }}
                          >
                            into:
                          </Typography>
                          <Typography
                            variant="h5"
                            component="div"
                            fontWeight={500}
                          >
                            {/* "{data.bpm_data.biggest_bpm_change.track_two.name}" */}
                            No Value
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography sx={{ fontSize: 14, marginTop: 1 }}>
                        - occurred @{" "}
                        <span style={{ color: "rgba(29, 79, 145, 0.8)", fontWeight: "500" }}>
                          {/* {data.bpm_data.biggest_bpm_change.occurred_at} */}
                          No Value
                        </span>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Box>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default RekordboxPlaylistReport;
