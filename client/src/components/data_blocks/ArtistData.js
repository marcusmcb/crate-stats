import React, { Fragment, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ArtistData = (artistData) => {
  return (
    <Fragment>
      <div>
        <Typography
          sx={{ fontSize: 20 }}
          color="#c5e1a5"
          fontWeight={500}
          gutterBottom
        >
          artist data:
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography>unique artists played:</Typography>
                  <Typography
                    variant="h4"
                    component="div"
                    fontWeight={500}
                    sx={{ color: "#558b2f" }}
                  >
                    {artistData.data.unique_artists_played}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography>
                    top three artists in this set:
                  </Typography>
                  {artistData.data.top_three_artists.map((item, i) => (
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
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Fragment>
  );
};

export default ArtistData;
