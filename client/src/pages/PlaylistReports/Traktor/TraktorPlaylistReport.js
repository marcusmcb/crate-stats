import { Fragment, useState, useRef, useEffect } from 'react'
import Titlebar from '../../../components/shared/Titlebar'
import TraktorFileInput from '../../../components/shared/TraktorFileInput'
import TrackData from './components/TrackData'
import BPMData from './components/BPMData'
import KeyData from './components/KeyData'
import GenreData from './components/GenreData'
import DataMissing from '../../../components/shared/DataMissing'

import axios from 'axios'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Modal from '@mui/material/Modal'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandMore from '../../../components/helpers/CardExpander'

import './traktorplaylistreport.css'

import CrateStatsSample from '../../../data/rekordbox_sample_03.txt'

const TraktorPlaylistReport = () => {
  const [data, setData] = useState(null)
  const [isBusy, setIsBusy] = useState(true)
  const isInitialMount = useRef(true)

  const getDataFromTXT = (userData) => {
    axios.post('/sendTraktorFile', userData).then((response) => {
      console.log('* * * * * TRAKTOR RESPONSE FROM EXPRESS ')
      console.log(response.data)
      setData(response.data)
    })
  }

  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const [open, setOpen] = useState(false)
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
      <div className='playlistreport-body'>
        <Titlebar />
        {/* <DragAndDrop /> */}
        <TraktorFileInput getDataFromTXT={getDataFromTXT} />
        <div>
          {isBusy ? (
            <div className='data-block await-data'>
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
                            Upload or drop your exported Traktor TXT file above
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
                Don't have Traktor? Grab a{' '}
                <span>
                  <a
                    style={{ color: 'white', fontWeight: '400' }}
                    href={CrateStatsSample}
                    download='traktor_sample.txt'
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
                {data.track_data.has_track_data ? (
                  <DataMissing data={{ value: 'track' }} />
                ) : (
                  <TrackData trackData={data.track_data} />
                )}
              </div>
              <div className='data-block-two'>
                {data.bpm_data.has_bpm_data ? (
                  <DataMissing data={{ value: 'bpm' }} />
                ) : (
                  <BPMData bpmData={data.bpm_data} />
                )}
              </div>
              <div className='data-block-two'>
                {data.key_data.has_key_data ? (
                  <DataMissing data={{ value: 'key' }} />
                ) : (
                  <KeyData keyData={data.key_data} />
                )}
              </div>
              <div className='data-block-two'>
                {data.genre_data.has_genre_data ? (
                  <DataMissing data={{ value: 'genre' }} />
                ) : (
                  <GenreData genreData={data.genre_data} />
                )}
              </div>
              
              
              
              <div className='data-block-two'>
                <Typography
                  sx={{ fontSize: 20 }}
                  color='white'
                  fontWeight={500}
                  gutterBottom
                >
                  track rating data:
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                      <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                          <Typography>five-star tracks played:</Typography>
                          <Typography
                            variant='h4'
                            component='div'
                            fontWeight={500}
                            sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                          >
                            {data.rating_data.five_star_tracks.length}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                      <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                          <Typography>
                            five star tracks played during this set:
                          </Typography>
                          {data.rating_data.five_star_tracks.map((item, i) => (
                            <Typography
                              component='div'
                              fontWeight={500}
                              sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                              key={i}
                              fontSize={22}
                            >
                              {item.artist} - {item.title}
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
                                    percentage of tracks played with ratings:
                                  </Typography>
                                  <Typography
                                    variant='h4'
                                    component='div'
                                    fontWeight={500}
                                    sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
                                  >
                                    {new Number(
                                      data.rating_data.tag_health.percentage_with_ratings
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
                                  <Typography>
                                    <span>
                                      percentage of playlist with a five star
                                      rating:
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
                                    {new Number(
                                      data.rating_data.tag_health.percentage_with_five_star_ratings
                                    ).toFixed()}
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
                                        style={{
                                          color: 'rgba(29, 79, 145, 0.8)',
                                        }}
                                      >
                                        What this means...
                                      </Typography>
                                      <Typography
                                        id='modal-modal-description'
                                        sx={{ mt: 2 }}
                                      >
                                        Of the tracks you played in this set
                                        that have ratings,{' '}
                                        <span
                                          style={{
                                            color: 'rgba(29, 79, 145, 0.8)',
                                            fontWeight: '500',
                                          }}
                                        >
                                          {new Number(
                                            data.rating_data.tag_health.percentage_with_five_star_ratings
                                          ).toFixed()}
                                        </span>
                                        % of those tracks you have rated as five
                                        stars.
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
      </div>
    </Fragment>
  )
}

export default TraktorPlaylistReport
