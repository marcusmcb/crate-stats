import React, { Fragment } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Divider } from 'semantic-ui-react'

const YearData = (yeardata) => {
  return (
    <Fragment>
      <div>
        <Typography
          sx={{ fontSize: 20 }}
          color='#c5e1a5'
          fontWeight={500}
          gutterBottom
        >
          year data:
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid item md={5} sm={12}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item sx={3} mt={1}>
                    <Typography sx={{ fontSize: 16, fontWeight: '500' }} sm={12}>
                      range of years played:
                    </Typography>
                  </Grid>
                  <Grid item sx={3}>
                    <Typography
                      variant='h4'
                      component='div'
                      fontWeight={500}
                      sx={{ color: '#558b2f' }}
                    >
                      {yeardata.data.oldest_track.year} -{' '}
                      {yeardata.data.newest_track.year}
                    </Typography>
                  </Grid>
                  <Grid item sx={3} mt={1}>
                    <Typography sx={{ fontSize: 16, fontWeight: '500' }} sm={12}>
                      average year:
                    </Typography>
                  </Grid>
                  <Grid item sx={3}>
                    <Typography
                      variant='h4'
                      component='div'
                      fontWeight={500}
                      sx={{ color: '#558b2f' }}
                    >
                      {yeardata.data.average_year}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container spacing={2} sx={{ marginTop: 1 }}>
                  <Grid item sx={4}>
                    <Typography sx={{ fontSize: 16 }}>oldest track:</Typography>
                    <Typography variant='h5' component='div' fontWeight={500}>
                      {yeardata.data.oldest_track.artist} - {yeardata.data.oldest_track.name}
                    </Typography>
                  </Grid>
                  <Grid item sx={4}>
                    <Typography sx={{ fontSize: 16 }}>playlist percentage from most recent year:</Typography>                    
                    <Typography
                      variant='h5'
                      component='div'
                      fontWeight={600}
                      sx={{ color: '#558b2f' }}
                    >
                      {yeardata.data.newest_track.playlist_percentage.split('.')[0]}% ({yeardata.data.newest_track.tracks.length} tracks)
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

export default YearData

// DEV NOTES FOR YEARDATA.JS
//
// add top 5 "newest" tracks in return from serato report
// horiztonal row for oldest track with row for top 5 beneath it
// average track year to the left of both
