import React, { Fragment } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Divider } from 'semantic-ui-react'

const BPMData = (bpmdata) => {
  return (
    <Fragment>
      <div>
        <Typography
          sx={{ fontSize: 20 }}
          color='#c5e1a5'
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
                      sx={{ color: '#558b2f' }}
                    >
                      {bpmdata.data.bpm_range.minimum} -{' '}
                      {bpmdata.data.bpm_range.maximum}
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
                      sx={{ color: '#558b2f' }}
                    >
                      {bpmdata.data.average_bpm}
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
                      variant='h5'
                      component='div'
                      fontWeight={500}
                      color='#558b2f'
                    >
                      {bpmdata.data.biggest_bpm_change.track_one.bpm} bpm -{' '}
                      {bpmdata.data.biggest_bpm_change.track_two.bpm} bpm
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: 1 }}>
                  <Grid item>
                    <Typography
                      sx={{ fontSize: 16, fontWeight: '500', color: '#558b2f' }}
                    >
                      from:
                    </Typography>
                    <Typography variant='h5' component='div' fontWeight={500}>
                      "{bpmdata.data.biggest_bpm_change.track_one.name}"
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: 1 }}>
                  <Grid item>
                    <Typography
                      sx={{ fontSize: 16, fontWeight: '500', color: '#558b2f' }}
                    >
                      into:
                    </Typography>
                    <Typography variant='h5' component='div' fontWeight={500}>
                      "{bpmdata.data.biggest_bpm_change.track_two.name}"
                    </Typography>
                  </Grid>
                </Grid>
                <Typography sx={{ fontSize: 14, marginTop: 1 }}>
                  - occurred @{' '}
                  <span style={{ color: '#1b5e20', fontWeight: '500' }}>
                    {bpmdata.data.biggest_bpm_change.occurred_at}
                  </span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </div>
    </Fragment>
  )
}

export default BPMData

// DEV NOTES FOR BPMDATA.JS
// ------------------------
//
// add D3 UI for BPM graph
// add data export for BPM ranges by hour
