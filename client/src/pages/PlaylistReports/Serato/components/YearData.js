import React, { Fragment, useState } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandMore from '../../../../components/helpers/CardExpander'
import { Divider } from 'semantic-ui-react'

const YearData = (yeardata) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  
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
                  <Grid item mt={1}>
                    <Typography
                      sx={{ fontSize: 16, fontWeight: '500' }}
                      sm={12}
                    >
                      range of years played:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant='h4'
                      component='div'
                      fontWeight={500}
                      sx={{ color: '#558b2f' }}
                    >
                      {yeardata.data.yeardata.oldest_track.year} -{' '}
                      {yeardata.data.yeardata.newest_track.year}
                    </Typography>
                  </Grid>
                  <Grid item mt={1}>
                    <Typography
                      sx={{ fontSize: 16, fontWeight: '500' }}
                      sm={12}
                    >
                      average year:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant='h4'
                      component='div'
                      fontWeight={500}
                      sx={{ color: '#558b2f' }}
                    >
                      {yeardata.data.yeardata.average_year}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container spacing={2} sx={{ marginTop: 1 }}>
                  <Grid item>
                    <Typography sx={{ fontSize: 16 }}>
                      oldest track ({yeardata.data.yeardata.oldest_track.year}):
                    </Typography>
                    <Typography variant='h5' component='div' fontWeight={500}>
                      {yeardata.data.yeardata.oldest_track.artist} -{' '}
                      {yeardata.data.yeardata.oldest_track.name}
                    </Typography>
                    <Typography sx={{ fontSize: 14, marginTop: 0.5 }}>
                      - played @{' '}
                      <span style={{ color: '#1b5e20', fontWeight: '500' }}>
                        {yeardata.data.yeardata.oldest_track.occurred_at}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ fontSize: 16 }}>
                      playlist percentage from most recent year (
                      {yeardata.data.yeardata.newest_track.year}):
                    </Typography>
                    <Typography
                      variant='h4'
                      component='div'
                      fontWeight={500}
                      sx={{ color: '#558b2f' }}
                    >
                      {
                        yeardata.data.yeardata.newest_track.playlist_percentage.split(
                          '.'
                        )[0]
                      }
                      %{' '}
                      <span style={{ fontSize: '22px' }}>
                        ({yeardata.data.yeardata.newest_track.tracks.length}{' '}
                        tracks)
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <Card sx={{ midWidth: 245 }}>
                <CardActions
                  sx={{
                    height: '4vh',
                    backgroundColor: '#616161',
                    color: 'white',
                  }}
                >
                  <CardContent>tag health</CardContent>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label='show more'
                  >
                    <ExpandMoreIcon sx={{ color: 'white' }} />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout='auto' unmountOnExit>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6} sm={12} lg={6}>
                      <Card sx={{ minWidth: 275, boxShadow: 'none' }}>
                        <CardContent>
                          {/* crate stats card */}
                          <Typography>percentage with year tags:</Typography>
                          <Typography
                            variant='h4'
                            component='div'
                            fontWeight={500}
                            sx={{ color: '#558b2f' }}
                          >
                            {
                              yeardata.data.yeardata.tag_health
                                .percentage_with_year_tags
                            }
                            %
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6} sm={12} lg={6}>
                      <Card sx={{ minWidth: 275, boxShadow: 'none' }}>
                        <CardContent>
                          {/* crate stats card */}
                          <Typography>tracks with empty year tags:</Typography>
                          <Typography
                            variant='h4'
                            component='div'
                            fontWeight={500}
                            sx={{ color: '#558b2f' }}
                          >
                            {yeardata.data.yeardata.tag_health.empty_year_tags}{' '}
                            <span style={{ fontSize: '18px' }}>
                              of {yeardata.data.mtll} total tracks
                            </span>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Collapse>
              </Card>
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
