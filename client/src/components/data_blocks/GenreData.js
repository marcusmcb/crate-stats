import React, { Fragment, useState } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandMore from '../helpers/CardExpander'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

const GenreData = (genreData) => {
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
          genre data:
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography>unique genres played:</Typography>
                  <Typography
                    variant='h4'
                    component='div'
                    fontWeight={500}
                    sx={{ color: '#558b2f' }}
                  >
                    {genreData.data.unique_genres_played}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography>top three genre tags from this set:</Typography>
                  {genreData.data.top_three_genres.map((item, i) => (
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
                          <Typography>
                            percentage of tracks played with genre tags:
                          </Typography>
                          <Typography
                            variant='h4'
                            component='div'
                            fontWeight={500}
                            sx={{ color: '#558b2f' }}
                          >
                            {
                              genreData.data.tag_health
                                .percentage_with_genre_tags
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
                          <Typography>
                            <span>
                              ...with "other" as their main genre:{' '}
                              <HelpOutlineIcon
                                onClick={() => {
                                  console.log('clicked')
                                }}
                              />
                            </span>
                          </Typography>

                          <Typography
                            variant='h4'
                            component='div'
                            fontWeight={500}
                            sx={{ color: '#558b2f' }}
                          >
                            {
                              genreData.data.tag_health
                                .percentage_with_other_as_genre
                            }
                            %
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

export default GenreData

// check calcs on tag health - percentage w/other as genre
