import React, { Fragment, useState } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Divider } from 'semantic-ui-react'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandMore from '../../../../components/helpers/CardExpander'

const YearData = (props) => {  
  const yearData = props.data
  const masterTrackLogLength = props.masterTrackLogLength
  
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Fragment>
      <Typography
        sx={{ fontSize: 20 }}
        color='white'
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
                  <Typography sx={{ fontSize: 16, fontWeight: '500' }} sm={12}>
                    range of years played:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant='h4'
                    component='div'
                    fontWeight={500}
                    sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                  >
                    {yearData.oldest_tracks.year} -{' '}
                    {yearData.newest_tracks.year}
                  </Typography>
                </Grid>
                <Grid item mt={1}>
                  <Typography sx={{ fontSize: 16, fontWeight: '500' }} sm={12}>
                    average year:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant='h4'
                    component='div'
                    fontWeight={500}
                    sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                  >
                    {yearData.average_year}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid
                container
                spacing={2}
                sx={{ marginTop: 1 }}
                style={{ justifyContent: 'space-around' }}
              >
                <Grid item>
                  <Typography sx={{ fontSize: 16 }}>
                    oldest track ({yearData.oldest_tracks.year}
                    ):
                  </Typography>
                  <Typography variant='h5' component='div' fontWeight={500}>
                    {yearData.oldest_tracks.tracks_played[0].Artist} -{' '}
                    {yearData.oldest_tracks.tracks_played[0].Track_Title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography sx={{ fontSize: 16 }}>
                    playlist percentage from most recent year:{' '}
                  </Typography>
                  <Typography
                    variant='h4'
                    component='div'
                    fontWeight={500}
                    sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                  >
                    <span>{yearData.newest_tracks.playlist_percentage}%</span>{' '}
                    <span style={{ fontSize: '18px' }}>
                      ( played {yearData.newest_tracks.times_played} times)
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <Card sx={{ midWidth: 245 }}>
              <CardActions
                sx={{
                  height: '4vh',
                  backgroundColor: 'rgba(101, 105, 114, 1)',
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
                          sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                        >
                          {Number(
                            yearData.tag_health.percentage_with_year_tags
                          ).toFixed()}
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
                          sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                        >
                          {yearData.tag_health.empty_year_tags}{' '}
                          <span style={{ fontSize: '18px' }}>
                            (of {masterTrackLogLength} total tracks)
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
    </Fragment>
  )
}

export default YearData
