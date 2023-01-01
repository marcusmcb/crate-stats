import { Fragment, useState, useRef, useEffect } from "react";
import Titlebar from "../../../components/shared/Titlebar";
import TraktorFileInput from "../../../components/shared/TraktorFileInput";
import DragAndDrop from "../../../components/shared/DragAndDrop";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Divider } from "semantic-ui-react";

import TimeText from "../../../components/shared/text_spans/timeText";
import TimesText from "../../../components/shared/text_spans/timesText";
import "./traktorplaylistreport.css";

const TraktorPlaylistReport = () => {
  const [data, setData] = useState(null);
  const [isBusy, setIsBusy] = useState(true);
  const isInitialMount = useRef(true);

  const getDataFromTXT = (userData) => {
    axios.post("/sendTraktorFile", userData).then((response) => {
      console.log("* * * * * TRAKTOR RESPONSE FROM EXPRESS ");
      console.log(response);
      setData(response.data);
    });
  };

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
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
      <TraktorFileInput getDataFromTXT={getDataFromTXT} />
      <div className="playlistreport-body">
        {isBusy ? (
          <div className="data-block await-data">
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
                          Upload or drop your exported Traktor TXT file above to
                          view your CrateStats analysis.
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
              Don't have Traktor? Grab a{" "}
              <span>
                <a
                  style={{ color: "rgba(61, 37, 23, 0.8)", fontWeight: "400" }}
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
                            (
                            {data.track_data.shortest_track_played[
                              "length"
                            ].slice(1)}
                            )
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
                            (
                            {data.track_data.longest_track_played[
                              "length"
                            ].slice(1)}
                            )
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Box>
            </div>
            <div className='data-block-two'>
              <Typography
                sx={{ fontSize: 20 }}
                color='white'
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
                          <Typography sx={{ fontSize: 16, fontWeight: '500' }}>
                            bpm range:
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant='h4'
                            component='div'
                            fontWeight={500}
                            sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                          >
                            {data.bpm_data.bpm_range.minBPM} -{' '}
                            {data.bpm_data.bpm_range.maxBPM}
                          </Typography>
                        </Grid>
                        <Grid item mt={1}>
                          <Typography sx={{ fontSize: 16, fontWeight: '500' }}>
                            average bpm:
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant='h4'
                            component='div'
                            fontWeight={500}
                            sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                          >
                            {data.bpm_data.average_bpm}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider />
                      <Grid container spacing={2}>
                        <Grid item mt={1}>
                          <Typography>most common bpm:</Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant='h4'
                            component='div'
                            fontWeight={500}
                            sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                          >
                            {data.bpm_data.most_common_bpm.value}{' '}
                            <span style={{ fontSize: '18px', color: 'black' }}>
                              (played{' '}
                              {data.bpm_data.most_common_bpm.times_played} times
                              in this set)
                            </span>
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider />
                      <Grid container spacing={2}>
                        <Grid item mt={1}>
                          <div style={{ marginBottom: '15px' }}>
                            <Typography
                              style={{ fontSize: '18px', fontWeight: '600' }}
                            >
                              biggest single bpm change:
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant='h4'
                            component='div'
                            fontWeight={500}
                            sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                          >
                            {new Number(
                              data.bpm_data.biggest_bpm_change.from_track.bpm
                            ).toFixed()}{' '}
                            -->{' '}
                            {new Number(
                              data.bpm_data.biggest_bpm_change.to_track.bpm
                            ).toFixed()}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item>
                          <Typography sx={{ fontSize: 16 }}>from:</Typography>
                          <Typography
                            variant='h5'
                            component='div'
                            fontWeight={500}
                          >
                            {data.bpm_data.biggest_bpm_change.from_track.title}
                          </Typography>
                          <Typography
                            variant='h5'
                            component='div'
                            fontWeight={500}
                            sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                          >
                            {new Number(
                              data.bpm_data.biggest_bpm_change.from_track.bpm
                            ).toFixed()}{' '}
                            BPM
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography sx={{ fontSize: 16 }}>to:</Typography>
                          <Typography
                            variant='h5'
                            component='div'
                            fontWeight={500}
                          >
                            {data.bpm_data.biggest_bpm_change.to_track.title}
                          </Typography>
                          <Typography
                            variant='h5'
                            component='div'
                            fontWeight={500}
                            sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                          >
                            {new Number(
                              data.bpm_data.biggest_bpm_change.to_track.bpm
                            ).toFixed()}{' '}
                            BPM
                          </Typography>
                        </Grid>
                      </Grid>                      
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

export default TraktorPlaylistReport;
