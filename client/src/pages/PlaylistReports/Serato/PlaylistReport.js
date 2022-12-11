import React, { Fragment, useEffect, useState, useRef } from 'react'
import Titlebar from '../../../components/shared/Titlebar'
import DataMissing from '../../../components/shared/DataMissing'
import TrackData from '../../../components/data_blocks/TrackData'
import BPMData from '../../../components/data_blocks/BPMData'
import PlaylistData from '../../../components/data_blocks/PlaylistData'
import KeyData from '../../../components/data_blocks/KeyData'
import YearData from '../../../components/data_blocks/YearData'
import DeckData from '../../../components/data_blocks/DeckData'
import DoublesData from '../../../components/data_blocks/DoublesData'
import GenreData from '../../../components/data_blocks/GenreData'
import ArtistData from '../../../components/data_blocks/ArtistData'
import AlbumData from '../../../components/data_blocks/AlbumData'
import MasterTracklog from '../../../components/data_blocks/MasterTracklog'
import DragAndDrop from '../../../components/shared/DragAndDrop'
import Summary from '../../../components/data_blocks/Summary'

import axios from 'axios'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import './playlistreport.css'

import CrateStatsSample from '../../../data/cinco_de_mayo.csv'

const PlaylistReport = () => {
  const [data, setData] = useState(null)
  const [isBusy, setIsBusy] = useState(true)
  const isInitialMount = useRef(true)

  const getDataFromCSV = (userData) => {
    axios.post('/sendFile', userData).then((response) => {
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
      <Titlebar />
      <DragAndDrop getDataFromCSV={getDataFromCSV} />
      <div className='playlistreport-body'>
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
                          Upload or drop your exported Serato CSV above to view
                          your CrateStats analysis.
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
                <PlaylistData data={data.playlist_data} />
              )}
            </div>
            <div className='data-block'>
              {data.track_data.has_track_data === false ? (
                <DataMissing data={{ value: 'track' }} />
              ) : (
                <TrackData data={data.track_data} />
              )}
            </div>
            <div className='data-block'>
              {data.bpm_data.has_bpm_data === false ? (
                <DataMissing data={{ value: 'bpm' }} />
              ) : (
                <BPMData data={data.bpm_data} />
              )}
            </div>
            <div className='data-block'>
              {data.year_data.has_year_data === false ? (
                <div>
                  <DataMissing data={{ value: 'year' }} />
                </div>
              ) : (
                <YearData
                  data={{
                    yeardata: data.year_data,
                    mtll: data.master_track_log.length,
                  }}
                />
              )}
            </div>
            <div className='data-block'>
              {data.genre_data.has_genre_data === false ? (
                <DataMissing data={{ value: 'genre' }} />
              ) : (
                <GenreData data={data.genre_data} />
              )}
            </div>
            <div className='data-block'>
              {data.key_data.has_key_data === false ? (
                <div>
                  <DataMissing data={{ value: 'key' }} />
                </div>
              ) : (
                <KeyData data={data.key_data} />
              )}
            </div>
            <div className='data-block'>
              {data.doubles_data.has_doubles_data === false ? (
                <div>
                  <DataMissing data={{ value: 'doubles' }} />
                </div>
              ) : (
                <DoublesData data={data.doubles_data} />
              )}
            </div>
            <div className='data-block'>
              {data.deck_data.has_deck_data === false ? (
                <DataMissing data={{ value: 'deck' }} />
              ) : (
                <DeckData data={data.deck_data} />
              )}
            </div>
            <div className='data-block'>
              {data.album_data.has_album_data === false ? (
                <DataMissing data={{ value: 'album' }} />
              ) : (
                <AlbumData
                  data={{
                    albumdata: data.album_data,
                    mtll: data.master_track_log.length,
                  }}
                />
              )}
            </div>
            <div className='data-block'>
              {data.artist_data.has_artist_data === false ? (
                <DataMissing data={{ value: 'artist' }} />
              ) : (
                <ArtistData data={data.artist_data} />
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
    </Fragment>
  )
}

export default PlaylistReport
