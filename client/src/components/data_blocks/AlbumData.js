import React, { Fragment } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandMore from '../helpers/CardExpander'

const AlbumData = (albumData) => {
  const [expanded, setExpanded] = React.useState(false)

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
          album data:
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography>unique albums played:</Typography>
                  <Typography
                    variant='h4'
                    component='div'
                    fontWeight={500}
                    sx={{ color: '#558b2f' }}
                  >
                    {albumData.data.albumdata.unique_albums_played}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography>
                    top three albums/collections in this set:
                  </Typography>
                  {albumData.data.albumdata.top_three_albums.map((item, i) => (
                    <Typography
                      component='div'
                      fontWeight={500}
                      sx={{ color: '#558b2f' }}
                      key={i}
                      fontSize={22}
                    >
                      {item}{' '}
                    </Typography>
                  ))}
                </CardContent>
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
                          <Typography>percentage with album tags:</Typography>
                          <Typography
                            variant='h4'
                            component='div'
                            fontWeight={500}
                            sx={{ color: '#558b2f' }}
                          >
                            {
                              albumData.data.albumdata.tag_health
                                .percentage_with_album_tags
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
                          <Typography>tracks with empty album tags:</Typography>
                          <Typography
                            variant='h4'
                            component='div'
                            fontWeight={500}
                            sx={{ color: '#558b2f' }}
                          >
                            {
                              albumData.data.albumdata.tag_health
                                .empty_album_tags
                            }{' '}
                            <span style={{ fontSize: '18px' }}>
                              of {albumData.data.mtll} total tracks
                            </span>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Collapse>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Fragment>
  )
}

export default AlbumData
