import React, { Fragment, useEffect, useState, useRef } from 'react'
import Titlebar from '../../../components/shared/Titlebar'
import DataMissing from '../../../components/shared/DataMissing'
import TrackData from './components/TrackData'
import TrackData2 from './components/TrackData2'
import BPMData from './components/BPMData'
import YearData from './components/YearData'
import GenreData from './components/GenreData'
import KeyData from './components/KeyData'
import DoublesData from './components/DoublesData'
import DeckData from './components/DeckData'
import AlbumData from './components/AlbumData'
import ArtistData from './components/ArtistData'
import MasterTracklog from './components/MasterTracklog'
import PlaylistData from './components/PlaylistData'
import DragAndDrop from '../../../components/shared/DragAndDrop'

import axios from 'axios'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import './style/seratoplaylistreport.css'

import CrateStatsSample from '../../../data/cinco_de_mayo.csv'

const SeratoPlaylistReport = () => {
  const [data, setData] = useState(null)
  const [isBusy, setIsBusy] = useState(true)
  const isInitialMount = useRef(true)

  const getDataFromCSV = (userData) => {
    axios.post('/sendSeratoFile', userData).then((response) => {
      console.log('* * * * * * * * * RESPONSE FROM EXPRESS ')
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
        <DragAndDrop getDataFromCSV={getDataFromCSV} />
        <div>
          {isBusy === true ? (
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
                            Upload or drop your exported Serato CSV above to
                            view your CrateStats analysis.
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
                Don't have Serato? Grab a{' '}
                <span>
                  <a
                    style={{ color: '#c5e1a5', fontWeight: '400' }}
                    href={CrateStatsSample}
                    download='crate_stats_sample.csv'
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
              {/* <div className='data-block'>
              <Summary/>
            </div> */}
              <div className='data-block'>
                {data.playlist_data.has_playlist_data === false ? (
                  <DataMissing data={{ value: 'playlist' }} />
                ) : (
                  <PlaylistData playlistData={data.playlist_data} />
                )}
              </div>
              <div className='data-block'>
                {data.track_data.has_track_data === false ? (
                  <DataMissing data={{ value: 'track' }} />
                ) : (
                  <TrackData trackData={data.track_data} />
                )}
              </div>
              <div>
                {data.track_data.has_track_data === false ? (
                  <DataMissing data={{ value: 'track' }} />
                ) : (
                  <TrackData2 trackData={data.track_data} />
                )}
              </div>
              <div className='data-block'>
                {data.bpm_data.has_bpm_data === false ? (
                  <DataMissing data={{ value: 'bpm' }} />
                ) : (
                  <BPMData bpmData={data.bpm_data} />
                )}
              </div>
              <div className='data-block'>
                {data.year_data.has_year_data === false ? (
                  <div>
                    <DataMissing data={{ value: 'year' }} />
                  </div>
                ) : (
                  <YearData                    
                    yearData={data.year_data}
                    masterTrackLogLength={data.master_track_log.length}
                  />
                )}
              </div>
              <div className='data-block'>
                {data.genre_data.has_genre_data === false ? (
                  <DataMissing data={{ value: 'genre' }} />
                ) : (
                  <GenreData genreData={data.genre_data} />
                )}
              </div>
              <div className='data-block'>
                {data.key_data.has_key_data === false ? (
                  <div>
                    <DataMissing data={{ value: 'key' }} />
                  </div>
                ) : (
                  <KeyData keyData={data.key_data} />
                )}
              </div>
              <div className='data-block'>
                {data.doubles_data.has_doubles_data === false ? (
                  <div>
                    <DataMissing data={{ value: 'doubles' }} />
                  </div>
                ) : (
                  <DoublesData doublesData={data.doubles_data} />
                )}
              </div>
              <div className='data-block'>
                {data.deck_data.has_deck_data === false ? (
                  <DataMissing data={{ value: 'deck' }} />
                ) : (
                  <DeckData deckData={data.deck_data} />
                )}
              </div>
              <div className='data-block'>
                {data.album_data.has_album_data === false ? (
                  <DataMissing data={{ value: 'album' }} />
                ) : (
                  <AlbumData                    
                    albumData={data.album_data}
                    masterTrackLogLength={data.master_track_log.length}
                  />
                )}
              </div>
              <div className='data-block'>
                {data.artist_data.has_artist_data === false ? (
                  <DataMissing data={{ value: 'artist' }} />
                ) : (
                  <ArtistData artistData={data.artist_data} />
                )}
              </div>
              <div className='data-block'>
                {!data.master_track_log ? (
                  <DataMissing data={{ value: 'tracklog' }} />
                ) : (
                  <MasterTracklog data={data.master_track_log} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default SeratoPlaylistReport
