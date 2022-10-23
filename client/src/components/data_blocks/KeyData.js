import React, { Fragment } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/material/styles'
import { Divider } from 'semantic-ui-react'

import TimesText from '../text_spans/timesText'
import TimeText from '../text_spans/timeText'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const KeyData = (keydata) => {
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
          key data:
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid item xs={12} md={5} sm={12} lg={6}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item sx={3} mt={1}>
                    <Typography>most common key:</Typography>
                  </Grid>
                  <Grid item sx={3}>
                    <Typography
                      variant='h4'
                      component='div'
                      fontWeight={500}
                      sx={{ color: '#558b2f' }}
                    >
                      {keydata.data.most_common_key.key}
                    </Typography>
                  </Grid>
                  <Grid item sx={3} mt={0.5}>
                    <Typography
                      variant='h5'
                      component='div'
                      fontWeight={400}
                      sx={{ color: '#558b2f' }}
                    >
                      (played {keydata.data.most_common_key.times_played} times)
                    </Typography>
                  </Grid>
                  <Grid item sx={3} mt={1}>
                    <Typography>least common key:</Typography>
                  </Grid>
                  <Grid item sx={3}>
                    <Typography
                      variant='h4'
                      component='div'
                      fontWeight={500}
                      sx={{ color: '#558b2f' }}
                    >
                      {keydata.data.least_common_key.key}
                    </Typography>
                  </Grid>
                  <Grid item sx={3} mt={0.5}>
                    <Typography
                      variant='h5'
                      component='div'
                      fontWeight={400}
                      sx={{ color: '#558b2f' }}
                    >
                      (played {keydata.data.least_common_key.times_played}{' '}
                      times)
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <Card sx={{ midWidth: 245 }}>
                <CardActions disableSpacing>
                  <CardContent>tag health</CardContent>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label='show more'
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout='auto' unmountOnExit>
                  <CardContent>
                    <Typography>TAG HEALTH DATA GOES HERE</Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Card>
          </Grid>
        </Box>
      </div>
    </Fragment>
  )
}

export default KeyData
