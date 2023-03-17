import React, { Fragment, useState } from "react";

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

const GenreData = (genreData) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [open, setOpen] = React.useState(false);
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

  return (
    <Fragment>
      <div>
        <Typography
          sx={{ fontSize: 20 }}
          color="#c5e1a5"
          fontWeight={500}
          gutterBottom
        >
          genre data:
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography>unique genres played:</Typography>
                  <Typography
                    variant="h4"
                    component="div"
                    fontWeight={500}
                    sx={{ color: "#558b2f" }}
                  >
                    {genreData.data.unique_genres_played}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography>top three genre tags from this set:</Typography>
                  {genreData.data.top_three_genres.map((item, i) => (
                    <Typography
                      component="div"
                      fontWeight={500}
                      sx={{ color: "#558b2f" }}
                      key={i}
                      fontSize={22}
                    >
                      {item}{" "}
                    </Typography>
                  ))}
                </CardContent>
                <CardActions
                  sx={{
                    height: "4vh",
                    backgroundColor: "#616161",
                    color: "white",
                  }}
                >
                  <CardContent>tag health</CardContent>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon sx={{ color: "white" }} />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6} sm={12} lg={6}>
                      <Card sx={{ minWidth: 275, boxShadow: "none" }}>
                        <CardContent>
                          {/* crate stats card */}
                          <Typography>
                            percentage of tracks played with genre tags:
                          </Typography>
                          <Typography
                            variant="h4"
                            component="div"
                            fontWeight={500}
                            sx={{ color: "#558b2f" }}
                          >
                            {
                              genreData.data.tag_health
                                .percentage_with_genre_tags
                            }
                            %
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6} sm={12} lg={6}>
                      <Card sx={{ minWidth: 275, boxShadow: "none" }}>
                        <CardContent>
                          {/* crate stats card */}
                          <Typography>
                            <span>
                              ...with "other" as their main genre:{" "}
                              <HelpOutlineIcon
                                onClick={() => {                                  
                                  handleOpen();
                                }}
                              />
                            </span>
                          </Typography>

                          <Typography
                            variant="h4"
                            component="div"
                            fontWeight={500}
                            sx={{ color: "#558b2f" }}
                          >
                            {
                              genreData.data.tag_health
                                .percentage_with_other_as_genre
                            }
                            %
                          </Typography>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                style={{ color: "#558b2f" }}
                              >
                                What this means...
                              </Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                Of the tracks you played in this set that have
                                genre tags,{" "}
                                <span style={{ color: '#558b2f', fontWeight: '500' }}>{
                                  genreData.data.tag_health
                                    .percentage_with_other_as_genre
                                }</span>
                                % of those tracks have 'Other' as their main
                                genre.
                              </Typography>
                            </Box>
                          </Modal>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Collapse>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Fragment>
  );
};

export default GenreData;

// check calcs on tag health - percentage w/other as genre
