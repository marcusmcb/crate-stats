import React, { Fragment } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Divider } from 'semantic-ui-react'

const TrackData = (trackData) => {    
  return (
    <Fragment>
      <Typography
        sx={{ fontSize: 20 }}
        color='white'
        fontWeight={500}
        gutterBottom
      >
        track data:
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid item md={5} sm={12}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item mt={1.5}>
                  <Typography sx={{ fontSize: 16, fontWeight: '500' }}>
                    total tracks played:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant='h3'
                    component='div'
                    fontWeight={500}
                    sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                  >
                    {trackData.trackData.total_tracks_played}
                  </Typography>
                </Grid>
                <Grid item mt={1.5}>
                  <Typography sx={{ fontSize: 16, fontWeight: '500' }}>
                    average track length:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant='h3'
                    component='div'
                    fontWeight={500}
                    sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                  >
                    {trackData.trackData.average_track_length}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid container spacing={4}>
                <Grid item>
                  <Typography sx={{ fontSize: 16 }}>shortest track:</Typography>
                  <Typography variant='h5' component='div' fontWeight={500}>
                    {trackData.trackData.shortest_track_played.title}
                  </Typography>
                  <Typography
                    variant='h5'
                    component='div'
                    fontWeight={500}
                    sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                  >
                    ({trackData.trackData.shortest_track_played['length'].slice(1)})
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography sx={{ fontSize: 16 }}>longest track:</Typography>
                  <Typography variant='h5' component='div' fontWeight={500}>
                    {trackData.trackData.longest_track_played.title}
                  </Typography>
                  <Typography
                    variant='h5'
                    component='div'
                    fontWeight={500}
                    sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                  >
                    ({trackData.trackData.longest_track_played['length'].slice(1)})
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </Fragment>
  )
}

export default TrackData
