import React, { Fragment } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Divider } from 'semantic-ui-react'

const BPMData = (bpmData) => {
  return (
    <Fragment>
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
              <Grid container spacing={3}>
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
                    {bpmData.bpmData.bpm_range.minBPM} -{' '}
                    {bpmData.bpmData.bpm_range.maxBPM}
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
                    {bpmData.bpmData.average_bpm}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid container spacing={3}>
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
                    {bpmData.bpmData.most_common_bpm.value}{' '}
                    <span style={{ fontSize: '18px', color: 'black' }}>
                      (played {bpmData.bpmData.most_common_bpm.times_played} times
                      in this set)
                    </span>
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid container spacing={3}>
                <Grid item mt={1}>
                  <div style={{ marginBottom: '15px' }}>
                    <Typography style={{ fontSize: '18px', fontWeight: '600' }}>
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
                      bpmData.bpmData.biggest_bpm_change.from_track.bpm
                    ).toFixed()}{' '}
                    --{' '}
                    {new Number(
                      bpmData.bpmData.biggest_bpm_change.to_track.bpm
                    ).toFixed()}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                <Grid item>
                  <Typography sx={{ fontSize: 16 }}>from:</Typography>
                  <Typography variant='h5' component='div' fontWeight={500}>
                    {bpmData.bpmData.biggest_bpm_change.from_track.title}
                  </Typography>
                  <Typography
                    variant='h5'
                    component='div'
                    fontWeight={500}
                    sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                  >
                    {new Number(
                      bpmData.bpmData.biggest_bpm_change.from_track.bpm
                    ).toFixed()}{' '}
                    BPM
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography sx={{ fontSize: 16 }}>to:</Typography>
                  <Typography variant='h5' component='div' fontWeight={500}>
                    {bpmData.bpmData.biggest_bpm_change.to_track.title}
                  </Typography>
                  <Typography
                    variant='h5'
                    component='div'
                    fontWeight={500}
                    sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                  >
                    {new Number(
                      bpmData.bpmData.biggest_bpm_change.to_track.bpm
                    ).toFixed()}{' '}
                    BPM
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

export default BPMData

