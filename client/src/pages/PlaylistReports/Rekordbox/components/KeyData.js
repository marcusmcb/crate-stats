import React, { Fragment } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TimesText from '../../../../components/shared/text_spans/timesText'
import TimeText from '../../../../components/shared/text_spans/timeText'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandMore from '../../../../components/helpers/CardExpander'

const KeyData = ({ keyData }) => {
  const [expanded, setExpanded] = React.useState(false)

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
        key data:
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid item xs={12} md={5} sm={12} lg={6}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item mt={1}>
                  <Typography>most common key:</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant='h4'
                    component='div'
                    fontWeight={500}
                    sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                  >
                    {keyData.most_common_key.key}
                  </Typography>
                </Grid>
                <Grid item mt={0.5}>
                  {keyData.most_common_key.times_played > 1 ? (
                    <Typography
                      variant='h5'
                      component='div'
                      fontWeight={400}
                      sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                    >
                      (played {keyData.most_common_key.times_played}{' '}
                      <TimesText />)
                    </Typography>
                  ) : (
                    <Typography
                      variant='h5'
                      component='div'
                      fontWeight={400}
                      sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                    >
                      (played {keyData.most_common_key.times_played}{' '}
                      <TimeText />)
                    </Typography>
                  )}
                </Grid>
                <Grid item mt={1}>
                  <Typography>least common key:</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant='h4'
                    component='div'
                    fontWeight={500}
                    sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                  >
                    {keyData.least_common_key.key}
                  </Typography>
                </Grid>
                <Grid item mt={0.5}>
                  {keyData.least_common_key.times_played > 1 ? (
                    <Typography
                      variant='h5'
                      component='div'
                      fontWeight={400}
                      sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                    >
                      (played {keyData.least_common_key.times_played}{' '}
                      <TimesText />)
                    </Typography>
                  ) : (
                    <Typography
                      variant='h5'
                      component='div'
                      fontWeight={400}
                      sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                    >
                      (played {keyData.least_common_key.times_played}{' '}
                      <TimeText />)
                    </Typography>
                  )}
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
                        <Typography>
                          percentage of tracks played with key tags:
                        </Typography>
                        <Typography
                          variant='h4'
                          component='div'
                          fontWeight={500}
                          sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                        >
                          {keyData.tag_health.percentage_with_key_tags}%
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6} sm={12} lg={6}>
                    {keyData.tag_health.empty_key_tags === 0 ? (
                      <></>
                    ) : (
                      <Card sx={{ minWidth: 275, boxShadow: 'none' }}>
                        <CardContent>
                          {/* crate stats card */}
                          <Typography>tracks with empty key tags:</Typography>
                          <Typography
                            variant='h4'
                            component='div'
                            fontWeight={500}
                            sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                          >
                            {keyData.tag_health.empty_key_tags}
                          </Typography>
                        </CardContent>
                      </Card>
                    )}
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

export default KeyData
