import React, { Fragment } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

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
                  <Grid item sx={3}>
                    <Typography sx={{ fontSize: 16 }}>
                      total tracks played:
                    </Typography>
                  </Grid>
                  <Grid item sx={3}>
                    <Typography variant='h4' component='div' fontWeight={500} sx={{ color: '#558b2f'}}>
                      {trackdata.data.total_tracks_played}
                    </Typography>
                  </Grid>
                  <Grid item sx={3}>
                    <Typography sx={{ fontSize: 16 }}>
                      average track length:
                    </Typography>
                  </Grid>
                  <Grid item sx={3}>
                    <Typography variant='h4' component='div' fontWeight={500} sx={{ color: '#558b2f'}}>
                      {trackdata.data.average_track_length.slice(1)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: 1 }}>
                  <Grid item sx={4}>
                    <Typography sx={{ fontSize: 16 }}>
                      shortest track played:
                    </Typography>
                  </Grid>
                  <Grid item sx={8}>
                    <Typography variant='h5' component='div' fontWeight={500}>
                      {trackdata.data.shortest_track.name} - {trackdata.data.shortest_track.play_time}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: 0 }}>
                  <Grid item sx={4}>
                    <Typography sx={{ fontSize: 16 }}>
                      longest track played:
                    </Typography>
                  </Grid>
                  <Grid item sx={8}>
                    <Typography variant='h5' component='div' fontWeight={500}>
                      {trackdata.data.longest_track.name} - {trackdata.data.longest_track.play_time}
                    </Typography>
                  </Grid>
                </Grid>
                {/* <CardContent>                
                <Typography>total tracks played:</Typography>
                <Typography variant='h4' component='div' fontWeight={500}>
                  {trackdata.data.total_tracks_played}
                </Typography>
                <Typography sx={{ marginTop: '10px' }} color='text.secondary'>
                  average track length:
                </Typography>
                <Typography variant='h4' component='div' fontWeight={500}>
                  {trackdata.data.average_track_length.substring(1)}
                </Typography>
              </CardContent> */}
              </CardContent>
            </Card>
          </Grid>
        </Box>

        <div>
          {/* ****************************************** */}
          {/* *********** TRACK DATA ******************* */}
          {/* ****************************************** */}
          <div className='data-block-title'>Track Data</div>
          <div className='data-block-toprow'>
            <div className='toprow-container'>
              <div className='data-block-primary'>
                {/* ****************************************** */}
                {/* *********** TOTAL TRACKS PLAYED ********** */}
                {/* ****************************************** */}
                <div className='data-block-primary-header'>
                  Total Tracks Played
                </div>
                <div className='data-block-primary-value-main'>
                  {trackdata.data.total_tracks_played}
                </div>
              </div>
              <div className='data-block-secondary'>
                <div className='secondary-container'>
                  {/* ****************************************** */}
                  {/* ************* AVERAGE TRACK LENGTH ******* */}
                  {/* ****************************************** */}
                  <div className='secondary-container-header'>
                    Average Track Length
                  </div>
                  <div className='secondary-container-value'>
                    {trackdata.data.average_track_length.substring(1)}
                  </div>
                  {/* <div className='secondary-container-header'>
                          Average Tracks Per Hour
                        </div>
                        <div className='secondary-container-value'>21</div> */}
                </div>
              </div>
            </div>

            <div className='data-block-third'>
              <div className='tertiary-container'>
                <div className='tertiary-item'>
                  {/* ****************************************** */}
                  {/* *************** LONGEST TRACK DATA ******* */}
                  {/* ****************************************** */}
                  <div className='tertiary-item-header'>Longest Track:</div>
                  <div className='timer-line'>
                    {trackdata.data.longest_track.play_time.split(':')[0] >
                    1 ? (
                      <div>
                        {parseInt(
                          trackdata.data.longest_track.play_time.split(':')[0],
                          10
                        )}{' '}
                        <span className='minutes-text'>
                          <MinutesText />
                          {', '}
                        </span>
                      </div>
                    ) : (
                      <div>
                        {parseInt(
                          trackdata.data.longest_track.play_time.split(':')[0],
                          10
                        )}{' '}
                        <span className='minutes-text'>
                          <MinuteText />
                          {', '}
                        </span>
                      </div>
                    )}
                    {trackdata.data.longest_track.play_time.split(':')[1] >
                    1 ? (
                      <div>
                        {parseInt(
                          trackdata.data.longest_track.play_time.split(':')[1],
                          10
                        )}{' '}
                        <span className='minutes-text'>
                          <SecondsText />
                        </span>
                      </div>
                    ) : (
                      <div>
                        {parseInt(
                          trackdata.data.longest_track.play_time.split(':')[1],
                          10
                        )}{' '}
                        <span className='minutes-text'>
                          <SecondText />
                        </span>
                      </div>
                    )}
                  </div>
                  <div className='tertiary-item-value'>
                    {trackdata.data.longest_track.name} (
                    {trackdata.data.longest_track.play_time})
                  </div>
                  <div className='tertiary-item-caption'>
                    played at{' '}
                    <span className='tertiary-item-timestamp'>
                      {trackdata.data.longest_track.played_at}
                    </span>
                  </div>
                </div>
                <div className='tertiary-item'>
                  {/* ****************************************** */}
                  {/* ************** SHORTEST TRACK DATA ******* */}
                  {/* ****************************************** */}
                  <div className='tertiary-item-header'>Shortest Track:</div>
                  <div className='timer-line'>
                    {trackdata.data.shortest_track.play_time.split(':')[0] >
                    1 ? (
                      <div>
                        {parseInt(
                          trackdata.data.shortest_track.play_time.split(':')[0],
                          10
                        )}{' '}
                        <span className='minutes-text'>
                          <MinutesText />
                          {', '}
                        </span>
                      </div>
                    ) : trackdata.data.shortest_track.play_time.split(
                        ':'
                      )[0] === 1 ? (
                      <div>
                        {parseInt(
                          trackdata.data.shortest_track.play_time.split(':')[0],
                          10
                        )}{' '}
                        <span className='minutes-text'>
                          <MinuteText />
                          {', '}
                        </span>
                      </div>
                    ) : (
                      <span />
                    )}
                    {trackdata.data.shortest_track.play_time.split(':')[1] >
                    1 ? (
                      <div>
                        {parseInt(
                          trackdata.data.shortest_track.play_time.split(':')[1],
                          10
                        )}{' '}
                        <span className='minutes-text'>
                          <SecondsText />
                        </span>
                      </div>
                    ) : (
                      <div>
                        {parseInt(
                          trackdata.data.shortest_track.play_time.split(':')[1],
                          10
                        )}{' '}
                        <span className='minutes-text'>
                          <SecondText />
                        </span>
                      </div>
                    )}
                  </div>
                  <div className='tertiary-item-value'>
                    {trackdata.data.shortest_track.name} (
                    {trackdata.data.shortest_track.play_time})
                  </div>
                  <div className='tertiary-item-caption'>
                    played at{' '}
                    <span className='tertiary-item-timestamp'>
                      {trackdata.data.shortest_track.played_at}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='data-block-bottomrow'>
            {/* <BarChart width={600} height={250} data={data} /> */}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default TrackData

// DEV NOTES FOR TRACKDATA.JS
// -----------------------------
//
// add export for average tracks per hours for UI viz
