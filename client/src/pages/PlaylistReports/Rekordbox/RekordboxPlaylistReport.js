import React, { Fragment, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Titlebar from '../../../components/shared/Titlebar'
import RekordboxFileInput from '../../../components/shared/RekordboxFileInput'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Divider } from 'semantic-ui-react'

import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandMore from '../../../components/helpers/CardExpander'

import TimeText from '../../../components/shared/text_spans/timeText'
import TimesText from '../../../components/shared/text_spans/timesText'
import './rekordboxplaylistreport.css'

const RekordboxPlaylistReport = () => {
  const [data, setData] = useState(null)
  const [isBusy, setIsBusy] = useState(true)
  const isInitialMount = useRef(true)

  const getDataFromTXT = (userData) => {
    axios.post('/sendRekordboxFile', userData).then((response) => {
      console.log('* * * * * * * * * RESPONSE FROM EXPRESS ')
      console.log(response.data)
      setData(response.data)
    })
  }

  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      setIsBusy(false)
    }
  })

  return (
    <Fragment>
      <Titlebar />
      {/* <DragAndDrop /> */}
      <RekordboxFileInput getDataFromTXT={getDataFromTXT} />
      <div className='playlistreport-body'>
        {isBusy ? (
          <div className='data-block-two await-data'>
            <Box sx={{ flexGrow: 1 }}>
              <Grid>
                <Card>
                  <CardContent>
                    <Grid>
                      <Grid item mt={1.5}>
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: '500',
                          }}
                        >
                          Upload or drop your exported Rekordbox TXT file above
                          to view your CrateStats analysis.
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Box>
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: '14px',
                marginTop: '20px',
                paddingBottom: '15px',
                color: 'white',
              }}
            >
              Don't have Rekordbox? Grab a{' '}
              <span>
                <a
                  style={{ color: 'white', fontWeight: '400' }}
                  href={'/'}
                  download=''
                  target='_blank'
                  rel='noreferrer'
                >
                  test file
                </a>
              </span>{' '}
              to demo this page.
            </Typography>
          </div>
        ) : (
          <div>
            <div className='data-block-two'>
              <Typography
                sx={{ fontSize: 20 }}
                color='white'
                fontWeight={500}
                gutterBottom
              >
                track data:
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Grid item md={5} sm={12}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item mt={1.5}>
                          <Typography sx={{ fontSize: 16, fontWeight: '500' }}>
                            total tracks played:
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant='h3'
                            component='div'
                            fontWeight={500}
                            sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                          >
                            {data.track_data.total_tracks_played}
                          </Typography>
                        </Grid>
                        <Grid item mt={1.5}>
                          <Typography sx={{ fontSize: 16, fontWeight: '500' }}>
                            average track length:
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant='h3'
                            component='div'
                            fontWeight={500}
                            sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                          >
                            {data.track_data.average_track_length}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider />
                      <Grid container spacing={2}>
                        <Grid item>
                          <Typography sx={{ fontSize: 16 }}>
                            shortest track:
                          </Typography>
                          <Typography
                            variant='h5'
                            component='div'
                            fontWeight={500}
                          >
                            {data.track_data.shortest_track_played.title}
                          </Typography>
                          <Typography
                            variant='h5'
                            component='div'
                            fontWeight={500}
                            sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                          >
                            ({data.track_data.shortest_track_played['length']})
                          </Typography>
                          <Typography sx={{ fontSize: 14, marginTop: 1 }}>
                            - played @{' '}
                            <span
                              style={{
                                color: 'rgba(29, 79, 145, 0.8)',
                                fontWeight: '500',
                              }}
                            >
                              {/* {data.track_data.shortest_track.played_at} */}
                              No Value
                            </span>
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography sx={{ fontSize: 16 }}>
                            longest track:
                          </Typography>
                          <Typography
                            variant='h5'
                            component='div'
                            fontWeight={500}
                          >
                            {data.track_data.longest_track_played.title}
                          </Typography>
                          <Typography
                            variant='h5'
                            component='div'
                            fontWeight={500}
                            sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                          >
                            ({data.track_data.longest_track_played['length']})
                          </Typography>
                          <Typography sx={{ fontSize: 14, marginTop: 1 }}>
                            - played @{' '}
                            <span
                              style={{
                                color: 'rgba(29, 79, 145, 0.8)',
                                fontWeight: '500',
                              }}
                            >
                              {/* {data.track_data.longest_track.played_at} */}
                              No Value
                            </span>
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Box>
            </div>
            <div className='data-block-two'>
              <Typography
                sx={{ fontSize: 20 }}
                color='white'
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
                            sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                          >
                            {data.bpm_data.bpm_range.minBPM} -{' '}
                            {data.bpm_data.bpm_range.maxBPM}
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
                            sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                          >
                            {data.bpm_data.average_bpm}
                          </Typography>
                        </Grid>
                      </Grid>
                      {/* <Divider />
                      <Grid container spacing={2}>
                        <Grid item>
                          <Typography sx={{ fontSize: 16 }}>
                            biggest single bpm change:
                          </Typography>
                          <Typography
                            variant="h5"
                            component="div"
                            fontWeight={500}
                            color="rgba(29, 79, 145, 0.8)"
                          >                           
                            No Value
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} sx={{ marginTop: 1 }}>
                        <Grid item>
                          <Typography
                            sx={{
                              fontSize: 16,
                              fontWeight: "500",
                              color: "rgba(29, 79, 145, 0.8)",
                            }}
                          >
                            from:
                          </Typography>
                          <Typography
                            variant="h5"
                            component="div"
                            fontWeight={500}
                          >                            
                            No Value
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} sx={{ marginTop: 1 }}>
                        <Grid item>
                          <Typography
                            sx={{
                              fontSize: 16,
                              fontWeight: "500",
                              color: "rgba(29, 79, 145, 0.8)",
                            }}
                          >
                            into:
                          </Typography>
                          <Typography
                            variant="h5"
                            component="div"
                            fontWeight={500}
                          >                            
                            No Value
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography sx={{ fontSize: 14, marginTop: 1 }}>
                        - occurred @{" "}
                        <span
                          style={{
                            color: "rgba(29, 79, 145, 0.8)",
                            fontWeight: "500",
                          }}
                        >                          
                          No Value
                        </span>
                      </Typography> */}
                    </CardContent>
                  </Card>
                </Grid>
              </Box>
            </div>
            <div className='data-block-two'>
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
                            {data.key_data.most_common_key.key}
                          </Typography>
                        </Grid>
                        <Grid item mt={0.5}>
                          {data.key_data.most_common_key.times_played > 1 ? (
                            <Typography
                              variant='h5'
                              component='div'
                              fontWeight={400}
                              sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                            >
                              (played{' '}
                              {data.key_data.most_common_key.times_played}{' '}
                              <TimesText />)
                            </Typography>
                          ) : (
                            <Typography
                              variant='h5'
                              component='div'
                              fontWeight={400}
                              sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                            >
                              (played{' '}
                              {data.key_data.most_common_key.times_played}{' '}
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
                            {data.key_data.least_common_key.key}
                          </Typography>
                        </Grid>
                        <Grid item mt={0.5}>
                          {data.key_data.least_common_key.times_played > 1 ? (
                            <Typography
                              variant='h5'
                              component='div'
                              fontWeight={400}
                              sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                            >
                              (played{' '}
                              {data.key_data.least_common_key.times_played}{' '}
                              <TimesText />)
                            </Typography>
                          ) : (
                            <Typography
                              variant='h5'
                              component='div'
                              fontWeight={400}
                              sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                            >
                              (played{' '}
                              {data.key_data.least_common_key.times_played}{' '}
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
                                  {
                                    data.key_data.tag_health
                                      .percentage_with_key_tags
                                  }
                                  %
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={12} md={6} sm={12} lg={6}>
                            {data.key_data.tag_health.empty_key_tags === 0 ? (
                              <></>
                            ) : (
                              <Card sx={{ minWidth: 275, boxShadow: 'none' }}>
                                <CardContent>
                                  {/* crate stats card */}
                                  <Typography>
                                    tracks with empty key tags:
                                  </Typography>
                                  <Typography
                                    variant='h4'
                                    component='div'
                                    fontWeight={500}
                                    sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                                  >
                                    {data.key_data.tag_health.empty_key_tags}
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
            </div>
            <div className='data-block-two'>
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
                            sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                          >
                            {data.year_data.oldest_tracks.year} -{' '}
                            {data.year_data.newest_tracks.year}
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
                            sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                          >
                            {data.year_data.average_year}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider />
                      <Grid container spacing={2} sx={{ marginTop: 1 }}>
                        <Grid item>
                          <Typography sx={{ fontSize: 16 }}>
                            oldest track ({data.year_data.oldest_tracks.year}):
                          </Typography>
                          <Typography
                            variant='h5'
                            component='div'
                            fontWeight={500}
                          >
                            {
                              data.year_data.oldest_tracks.tracks_played[0]
                                .Artist
                            }{' '}
                            -{' '}
                            {
                              data.year_data.oldest_tracks.tracks_played[0]
                                .Track_Title
                            }
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
                            <span>
                              {data.year_data.newest_tracks.playlist_percentage}
                              %
                            </span>{' '}
                            <span style={{ fontSize: '18px' }}>
                              ( played{' '}
                              {data.year_data.newest_tracks.times_played} times)
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
                                <Typography>
                                  percentage with year tags:
                                </Typography>
                                <Typography
                                  variant='h4'
                                  component='div'
                                  fontWeight={500}
                                  sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                                >
                                  {
                                    data.year_data.tag_health
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
                                <Typography>
                                  tracks with empty year tags:
                                </Typography>
                                <Typography
                                  variant='h4'
                                  component='div'
                                  fontWeight={500}
                                  sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                                >
                                  {data.year_data.tag_health.empty_year_tags}{' '}
                                  <span style={{ fontSize: '18px' }}>
                                    of {data.mtll_} total tracks
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
            <div className='data-block-two'>
              <Typography
                sx={{ fontSize: 20 }}
                color='white'
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
                          sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                        >
                          {data.genre_data.unique_genres_played}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={12} sm={12} lg={12}>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Typography>
                          top three genre tags from this set:
                        </Typography>
                        {data.genre_data.top_three_genres.map((item, i) => (
                          <Typography
                            component='div'
                            fontWeight={500}
                            sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
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
                                  sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                                >
                                  {
                                    data.genre_data.tag_health
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
                                        handleOpen()
                                      }}
                                    />
                                  </span>
                                </Typography>

                                <Typography
                                  variant='h4'
                                  component='div'
                                  fontWeight={500}
                                  sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                                >
                                  {
                                    data.genre_data.tag_health
                                      .percentage_with_other_as_genre
                                  }
                                  %
                                </Typography>
                                <Modal
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby='modal-modal-title'
                                  aria-describedby='modal-modal-description'
                                >
                                  <Box sx={style}>
                                    <Typography
                                      id='modal-modal-title'
                                      variant='h6'
                                      component='h2'
                                      style={{ color: 'rgba(29, 79, 145, 0.8)' }}
                                    >
                                      What this means...
                                    </Typography>
                                    <Typography
                                      id='modal-modal-description'
                                      sx={{ mt: 2 }}
                                    >
                                      Of the tracks you played in this set that
                                      have genre tags,{' '}
                                      <span
                                        style={{
                                          color: 'rgba(29, 79, 145, 0.8)',
                                          fontWeight: '500',
                                        }}
                                      >
                                        {
                                          data.genre_data.tag_health
                                            .percentage_with_other_as_genre
                                        }
                                      </span>
                                      % of those tracks have 'Other' as their
                                      main genre.
                                    </Typography>
                                  </Box>
                                </Modal>
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
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default RekordboxPlaylistReport
