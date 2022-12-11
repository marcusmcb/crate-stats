import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Divider } from 'semantic-ui-react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'

import Collapse from '@mui/material/Collapse'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandMore from '../../components/helpers/CardExpander'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Titlebar from '../../components/shared/Titlebar'
import './pageselect.css'

import LivePlaylistImageTwo from '../../images/liveplaylist_02.png'
import LivePlaylistImageThree from '../../images/liveplaylist_03.png'
import CSVExportImageOne from '../../images/csvexport_01.png'
import CSVExportImageTwo from '../../images/csvexport_02.png'

const PageSelect = () => {
  const [expandedL, setExpandedL] = React.useState(false)
  const [expandedR, setExpandedR] = React.useState(false)

  const handleExpandLClick = () => {
    setExpandedL(!expandedL)
  }

  const handleExpandRClick = () => {
    setExpandedR(!expandedR)
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
                  height='300'
                  image='https://media-exp1.licdn.com/dms/image/C4D12AQHDoCsY44zQaA/article-cover_image-shrink_600_2000/0/1630855319553?e=2147483647&v=beta&t=yTZKBwHvKf9gfmaPwoTQ-yLk_FPY07VCNdO-XoX6JtI'
                  alt='Pioneer dj equipment in a dj booth'
                />
                <CardContent>
                  <Typography color='text.secondary'>
                    Enter the URL for your Serato© Live Playlist link to get
                    real time analytics for your DJ set or stream.
                  </Typography>
                </CardContent>
                <Button
                  type='submit'
                  variant='contained'
                  sx={{
                    backgroundColor: '#1b5e20',
                    ':hover': { backgroundColor: '#7cb342', color: 'white' },
                  }}
                  component={Link}
                  to={'/livereport'}
                >
                  GO
                </Button>
                <CardActions disableSpacing>
                  <Typography sx={{ fontWeight: '500' }}>
                    Tell me more
                  </Typography>
                  <ExpandMore
                    expand={expandedL}
                    onClick={handleExpandLClick}
                    aria-expanded={expandedL}
                    aria-label='show more'
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expandedL} timeout='auto' unmountOnExit>
                  <CardContent sx={{ backgroundColor: '#c5e1a5' }}>
                    <Typography gutterBottom variant='h5' component='div'>
                      Crate Stats for Serato Live Playlists
                    </Typography>
                    <Divider />
                    <Typography variant='body2' fontSize={14}>
                      This feature allows you to enter the link from any of your
                      Serato© Live Playlists into Crate Stats for a quick
                      analysis of your set.
                    </Typography>
                    <br />
                    <Typography variant='body2' fontSize={14}>
                      After logging into your{' '}
                      <a
                        href='https://id.Serato©.com/en/login'
                        style={{ textDecoration: 'none', color: '#33691e' }}
                      >
                        Serato©
                      </a>{' '}
                      account you can find the links to your live playlists in
                      the menu under your avatar.
                    </Typography>
                    <br />
                    <Typography variant='body2' fontSize={14}>
                      Select any of your live playlists and, once open, copy the
                      url from your browser.
                    </Typography>
                    <br />
                    <Typography>
                      You'll need to make sure that the playlist you've selected
                      is set to public - they're set to "private" by default. If
                      you scroll to the bottom of your live playlist page,
                      you'll see an option to the edit its details.
                    </Typography>
                    <br />
                    <CardMedia
                      component='img'
                      alt='green iguana'
                      image={LivePlaylistImageTwo}
                    />
                    <CardContent></CardContent>
                    <Typography>
                      After selecting "edit details" you'll see an option to set
                      your playlist's visibility. Select "Public" and save. Your
                      live playlist is now ready for Crate Stats analysis!
                    </Typography>
                    <br />
                    <CardMedia
                      component='img'
                      alt='green iguana'
                      image={LivePlaylistImageThree}
                    />
                    <CardContent></CardContent>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Card sx={{ minWidth: 275, boxShadow: 'none' }}>
                <CardHeader title='DJ Playlist Analysis' />

                <CardMedia
                  component='img'
                  height='300'
                  image='https://media.istockphoto.com/photos/glowing-lights-from-dj-mixer-music-remote-buttons-picture-id1173145186?k=20&m=1173145186&s=612x612&w=0&h=PC_IKnFl14TCpytJzYHG89NeX6hbtVpfase6if2ks0Q='
                  alt='Pioneer DJ equipment in a dj booth'
                />
                <CardContent>
                  <Typography color='text.secondary'>
                    Export your Serato© DJ playlist as a CSV and use it to get
                    your Crate Stats playlist analysis.
                  </Typography>
                </CardContent>
                <Button
                  type='submit'
                  variant='contained'
                  sx={{
                    backgroundColor: '#1b5e20',
                    ':hover': { backgroundColor: '#7cb342', color: 'white' },
                  }}
                  component={Link}
                  to={'/playlistreport'}
                >
                  GO
                </Button>
                <CardActions disableSpacing>
                  <Typography sx={{ fontWeight: '500' }}>
                    Tell Me More
                  </Typography>
                  <ExpandMore
                    expand={expandedR}
                    onClick={handleExpandRClick}
                    aria-expanded={expandedR}
                    aria-label='show more'
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expandedR} timeout='auto' unmountOnExit>
                  <CardContent sx={{ backgroundColor: '#c5e1a5' }}>
                    <Typography gutterBottom variant='h5' component='div'>
                      Crate Stats for Serato DJ Playlists
                    </Typography>
                    <Divider />
                    <Typography variant='body2' fontSize={14}>
                      This is the full Serato© DJ playlist analysis from Crate
                      Stats. You may use this tool to run an analysis on any
                      playlist history you export from the software.
                    </Typography>
                    <br />
                    <Typography variant='body2' fontSize={14}>
                      To do this, open your Serato© DJ software and select the
                      "history" option. You should see a panel that looks
                      something like this.
                    </Typography>
                    <br />
                    <CardMedia
                      component='img'
                      alt='green iguana'
                      image={CSVExportImageOne}
                    />
                    <br />
                    <Typography>
                      From here, you can select any individual set list that
                      you'd like to analyze. Make sure the format option is set
                      to 'csv' and select 'Export' to save the file to your
                      laptop.
                    </Typography>
                    <br />
                    <Typography>
                      You can then select the Post DJ Set Analysis option above
                      and use the file created to get your Crate Stats!
                    </Typography>
                    <br />
                    <Typography gutterBottom variant='h5' component='div'>
                      A few tips...
                    </Typography>
                    <br />
                    <Typography>
                      Serato© gives each playlist a default name of the date on
                      which it was played. You can double-click this in the
                      history view to rename it.
                    </Typography>
                    <br />
                    <CardMedia
                      component='img'
                      alt='green iguana'
                      image={CSVExportImageTwo}
                    />
                    <br />
                    <Typography>
                      If you right-click the history panel's header, you'll be
                      given a list of options to add to the history view.
                    </Typography>
                    <br />
                    <Typography>
                      The values present in the panel will be exported in your
                      csv file. Crate Stats currently runs analysis on the
                      following values so be sure to include them in your
                      exported file:
                    </Typography>
                    <Divider />
                    <Typography>
                      <li>name</li>
                      <li>artist</li>
                      <li>start/end times</li>
                      <li>playtime</li>
                      <li>deck</li>
                      <li>bpm</li>
                      <li>genre</li>
                      <li>year</li>
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          </Grid>
          <Typography
            sx={{
              marginTop: '50px',
              textAlign: 'center',
              color: '#1b5e20',
              fontWeight: '500',
              fontSize: '16px',
            }}
          >
            Crate Stats 2022
          </Typography>
          <Typography
            sx={{ textAlign: 'center', fontSize: '12px', marginTop: '5px' }}
          >
            Errors or issues?{' '}
            <a style={{ color: 'black' }} href='mailto:cratestats@gmail.com'>
              cratestats@gmail.com
            </a>
          </Typography>
          <br />
        </Box>
      </div>
    </Fragment>
  )
}

export default PageSelect
