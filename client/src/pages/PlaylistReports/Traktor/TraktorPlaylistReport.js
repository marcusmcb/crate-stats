import { Fragment, useState, useRef, useEffect } from 'react'
import Titlebar from '../../../components/shared/Titlebar'
import TraktorFileInput from '../../../components/shared/TraktorFileInput'
import TrackData from './components/TrackData'
import BPMData from './components/BPMData'
import KeyData from './components/KeyData'
import GenreData from './components/GenreData'
import RatingData from './components/RatingData'
import DataMissing from '../../../components/shared/DataMissing'

import axios from 'axios'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

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
                {data.rating_data.has_rating_data ? (
                  <DataMissing data={{ value: 'rating' }} />
                ) : (
                  <RatingData ratingData={data.rating_data} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default TraktorPlaylistReport
