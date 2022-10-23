import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Divider } from 'semantic-ui-react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'

import Collapse from '@mui/material/Collapse'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandMore from '../components/helpers/CardExpander'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Titlebar from '../components/shared/Titlebar'
import './style/pageselect.css'

const PageSelect = () => {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  return (
    <Fragment>
      <div className='pagebody'>
        <Titlebar />
        <Divider />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Card sx={{ minWidth: 275, boxShadow: 'none' }}>
                <CardHeader title='Live Playlist Analysis' />
                <CardMedia
                  component='img'
                  height='194'
                  image='https://media.istockphoto.com/photos/and-a-concept-yellow-question-mark-glowing-amid-black-question-marks-picture-id1305169776?b=1&k=20&m=1305169776&s=612x612&w=0&h=_6uT3hmXDsfxspEAzAsXhg8AXhpvypKIOMxerPW5-Q0='
                  alt='Paella dish'
                />
                <CardContent>
                  <Typography color='text.secondary'>
                    Enter the URL for your Serato Live Playlist link to get real
                    time analytics for your DJ set or stream.
                  </Typography>
                </CardContent>
                <Button
                  type='submit'
                  variant='contained'
                  sx={{
                    backgroundColor: '#558b2f',
                    ':hover': { backgroundColor: '#9ccc65' },
                  }}
                  component={Link}
                  to={'/livereport'}
                >
                  GO
                </Button>
                <CardActions disableSpacing>
                  <Typography>Learn More</Typography>
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
                    <Typography>Additional info goes here</Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Card sx={{ minWidth: 275, boxShadow: 'none' }}>
                <CardHeader title='Post DJ Set Analysis' />

                <CardMedia
                  component='img'
                  height='194'
                  image='https://media.istockphoto.com/photos/and-a-concept-yellow-question-mark-glowing-amid-black-question-marks-picture-id1305169776?b=1&k=20&m=1305169776&s=612x612&w=0&h=_6uT3hmXDsfxspEAzAsXhg8AXhpvypKIOMxerPW5-Q0='
                  alt='Paella dish'
                />
                <CardContent>
                  <Typography color='text.secondary'>
                    Export your Serato DJ playlist as a CSV and use it to get
                    your Crate Stats set list analysis.
                  </Typography>
                </CardContent>
                <Button
                  type='submit'
                  variant='contained'
                  sx={{
                    backgroundColor: '#558b2f',
                    ':hover': { backgroundColor: '#9ccc65' },
                  }}
                  component={Link}
                  to={'/playlistreport'}
                >
                  GO
                </Button>
                <CardActions disableSpacing>
                  <Typography>Learn More</Typography>
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
                    <Typography>Additional info goes here</Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Fragment>
  )
}

export default PageSelect
