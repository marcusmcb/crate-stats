import React, { Fragment } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Divider } from 'semantic-ui-react'

import MinutesText from '../text_spans/minutesText'
import SecondsText from '../text_spans/secondsText'
import MinuteText from '../text_spans/minuteText'
import SecondText from '../text_spans/secondText'

const TrackData = (trackdata) => {
  return (
    <Fragment>
      <div>
        {/* track data header */}
        <Typography
          sx={{ fontSize: 20 }}
          color='#c5e1a5'
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
                  <Grid item sx={3} mt={1.5}>
                    <Typography sx={{ fontSize: 16, fontWeight: '500' }}>
                      total tracks played:
                    </Typography>
                  </Grid>
                  <Grid item sx={3}>
                    <Typography
                      variant='h3'
                      component='div'
                      fontWeight={500}
                      sx={{ color: '#558b2f' }}
                    >
                      {trackdata.data.total_tracks_played}
                    </Typography>
                  </Grid>
                  <Grid item sx={3} mt={1.5}>
                    <Typography sx={{ fontSize: 16, fontWeight: '500' }}>
                      average track length:
                    </Typography>
                  </Grid>
                  <Grid item sx={3}>
                    <Typography
                      variant='h3'
                      component='div'
                      fontWeight={500}
                      sx={{ color: '#558b2f' }}
                    >
                      {trackdata.data.average_track_length.slice(1)}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container spacing={2} sx={{ marginTop: 1 }}>
                  <Grid item sx={4}>
                    <Typography sx={{ fontSize: 16 }}>
                      shortest track:
                    </Typography>
                    <Typography variant='h5' component='div' fontWeight={500}>
                      {trackdata.data.shortest_track.name}
                    </Typography>
                    <Typography
                      variant='h5'
                      component='div'
                      fontWeight={500}
                      sx={{ color: '#558b2f' }}
                    >
                      ({trackdata.data.shortest_track.play_time.slice(1)})
                    </Typography>
                    <Typography sx={{ fontSize: 14, marginTop: 1 }}>
                      - played @{' '}
                      <span style={{ color: '#1b5e20', fontWeight: '500' }}>
                        {trackdata.data.shortest_track.played_at}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: 0 }}>
                  <Grid item sx={4}>
                    <Typography sx={{ fontSize: 16 }}>
                      longest track:
                    </Typography>
                    <Typography variant='h5' component='div' fontWeight={500}>
                      {trackdata.data.longest_track.name}
                    </Typography>
                    <Typography
                      variant='h5'
                      component='div'
                      fontWeight={500}
                      sx={{ color: '#558b2f' }}
                    >
                      ({trackdata.data.longest_track.play_time.slice(1)})
                    </Typography>
                    <Typography sx={{ fontSize: 14, marginTop: 1 }}>
                      - played @{' '}
                      <span style={{ color: '#1b5e20', fontWeight: '500' }}>
                        {trackdata.data.longest_track.played_at}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </div>
    </Fragment>
  )
}

export default TrackData

// DEV NOTES FOR TRACKDATA.JS
// -----------------------------
//
// add export for average tracks per hours for UI viz
