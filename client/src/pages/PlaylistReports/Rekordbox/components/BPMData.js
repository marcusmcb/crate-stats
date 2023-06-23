import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

const BPMItem = ({ title, value }) => (
  <Grid item md={6} sm={12}>
    <Grid container spacing={2}>
      <Grid item>
        <Typography sx={{ fontSize: 16, fontWeight: '500' }}>{title}:</Typography>
      </Grid>
      <Grid item>
        <Typography variant='h4' component='div' fontWeight={500} sx={{ color: 'rgba(29, 79, 145, 0.8)' }}>
          {value}
        </Typography>
      </Grid>
    </Grid>
  </Grid>
)

const BPMChangeInfo = ({ title, track }) => (
  <Grid item md={6} sm={12}>
    <Typography sx={{ fontSize: 16 }}>{title}:</Typography>
    <Typography variant='h5' component='div' fontWeight={500}>
      {track?.title}
    </Typography>
    <Typography variant='h5' component='div' fontWeight={500} sx={{ color: 'rgba(29, 79, 145, 0.8)' }}>
      {Number(track?.bpm).toFixed()} BPM
    </Typography>
  </Grid>
)

const BPMData = ({ data: bpmData = {} }) => {
  const { bpm_range, average_bpm, most_common_bpm, biggest_bpm_change } = bpmData;
  return (
    <React.Fragment>
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
                <BPMItem title='bpm range' value={`${bpm_range?.minBPM} - ${bpm_range?.maxBPM}`} />
                <BPMItem title='average bpm' value={average_bpm} />
                <Grid item md={12} sm={12}>
                  <Typography>most common bpm:</Typography>
                  <Typography
                    variant='h4'
                    component='div'
                    fontWeight={500}
                    sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                  >
                    {most_common_bpm?.value}{' '}
                    <span style={{ fontSize: '18px', color: 'black' }}>
                      (played {most_common_bpm?.times_played} times in
                      this set)
                    </span>
                  </Typography>
                </Grid>
              </Grid>
              <Divider style={{ margin: '15px 0px 15px 0px'}}/>
              <Grid container spacing={2}>
                <Grid item md={12} sm={12}>
                  <div style={{ marginBottom: '15px' }}>
                    <Typography style={{ fontSize: '18px', fontWeight: '600' }}>
                      biggest single bpm change:
                    </Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <BPMChangeInfo title='from' track={biggest_bpm_change?.from_track} />
                <BPMChangeInfo title='to' track={biggest_bpm_change?.to_track} />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </React.Fragment>
  )
}

export default BPMData
