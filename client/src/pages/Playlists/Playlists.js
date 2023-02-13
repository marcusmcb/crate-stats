import React, { Fragment, useState } from 'react'
import Titlebar from '../../components/shared/Titlebar'

import DataMissing from '../../components/shared/DataMissing'
import PlaylistData from '../../components/data_blocks/PlaylistData'
import TrackData from '../../components/data_blocks/TrackData'
import BPMData from '../../components/data_blocks/BPMData'
import YearData from '../../components/data_blocks/YearData'
import GenreData from '../../components/data_blocks/GenreData'
import KeyData from '../../components/data_blocks/KeyData'
import DoublesData from '../../components/data_blocks/DoublesData'
import DeckData from '../../components/data_blocks/DeckData'
import AlbumData from '../../components/data_blocks/AlbumData'
import ArtistData from '../../components/data_blocks/ArtistData'
import MasterTracklog from '../../components/data_blocks/MasterTracklog'

import axios from 'axios'

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'

import './playlists.css'

const Playlists = () => {
  const [userPlaylists, setUserPlaylists] = useState([])
  const [fileSelected, setFileSelected] = useState(null)
  const [fileIndex, setFileIndex] = useState()
  const [hasData, setHasData] = useState(false)

  const getUserPlaylists = () => {
    axios.post('/getPlaylists').then((response) => {
      setUserPlaylists(response.data)
      setHasData(true)
    })
  }
  getUserPlaylists()

  return (
    <Fragment>
      <div className='playlist-pagebody'>
        <Titlebar />
        <Stack
          direction='row'
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography style={{ fontSize: '20px', marginTop: '20px' }}>
            User Playlists
          </Typography>
        </Stack>
        <Stack direction={{ sm: 'row', xs: 'column' }}>
          <CardContent
            style={{
              width: '20%',
            }}
          >
            {hasData ? (
              <div style={{ marginTop: '10px' }}>
                {userPlaylists.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setFileSelected(item)
                      setFileIndex(i)
                      console.log('ITEM: ', item)
                    }}
                    style={{
                      backgroundColor:
                        fileIndex === i ? '#c5e1a5' : 'rgba(54, 72, 69, 255)',
                      color:
                        fileIndex === i ? 'rgba(54, 72, 69, 255)' : 'white',
                      padding: '10px',
                      borderRadius: '5px',
                      marginBottom: '2px',
                      border: fileIndex === i ? '1px solid black' : 'none',
                    }}
                  >
                    <Typography
                      style={{ fontWeight: fileIndex === i ? '600' : '400' }}
                    >
                      {item.playlist_data.title}
                    </Typography>
                  </div>
                ))}
              </div>
            ) : (
              <div>Awaiting Data...</div>
            )}
          </CardContent>
          <CardContent
            style={{
              width: '80%',
            }}
          >
            {fileSelected === null ? (
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '25px',
                }}
              >
                Select a file to view that playlist's Crate Stats report
              </Typography>
            ) : (
              <div>
                <div className='data-block'>
                  {fileSelected.playlist_data.has_playlist_data === false ? (
                    <DataMissing data={{ value: 'playlist' }} />
                  ) : (
                    <PlaylistData data={fileSelected.playlist_data} />
                  )}
                </div>
                <div className='data-block'>
                  {fileSelected.track_data.has_track_data === false ? (
                    <DataMissing data={{ value: 'track' }} />
                  ) : (
                    <TrackData data={fileSelected.track_data} />
                  )}
                </div>
                <div className='data-block'>
                  {fileSelected.bpm_data.has_bpm_data === false ? (
                    <DataMissing data={{ value: 'bpm' }} />
                  ) : (
                    <BPMData data={fileSelected.bpm_data} />
                  )}
                </div>
                <div className='data-block'>
                  {fileSelected.year_data.has_year_data === false ? (
                    <div>
                      <DataMissing data={{ value: 'year' }} />
                    </div>
                  ) : (
                    <YearData
                      data={{
                        yeardata: fileSelected.year_data,
                        mtll: fileSelected.master_track_log.length,
                      }}
                    />
                  )}
                </div>
                <div className='data-block'>
                  {fileSelected.genre_data.has_genre_data === false ? (
                    <DataMissing data={{ value: 'genre' }} />
                  ) : (
                    <GenreData data={fileSelected.genre_data} />
                  )}
                </div>
                <div className='data-block'>
                  {fileSelected.key_data.has_key_data === false ? (
                    <div>
                      <DataMissing data={{ value: 'key' }} />
                    </div>
                  ) : (
                    <KeyData data={fileSelected.key_data} />
                  )}
                </div>
                <div className='data-block'>
                  {fileSelected.doubles_data.has_doubles_data === false ? (
                    <div>
                      <DataMissing data={{ value: 'doubles' }} />
                    </div>
                  ) : (
                    <DoublesData data={fileSelected.doubles_data} />
                  )}
                </div>
                <div className='data-block'>
                  {fileSelected.deck_data.has_deck_data === false ? (
                    <DataMissing data={{ value: 'deck' }} />
                  ) : (
                    <DeckData data={fileSelected.deck_data} />
                  )}
                </div>
                <div className='data-block'>
                  {fileSelected.album_data.has_album_data === false ? (
                    <DataMissing data={{ value: 'album' }} />
                  ) : (
                    <AlbumData
                      data={{
                        albumdata: fileSelected.album_data,
                        mtll: fileSelected.master_track_log.length,
                      }}
                    />
                  )}
                </div>
                <div className='data-block'>
                  {fileSelected.artist_data.has_artist_data === false ? (
                    <DataMissing data={{ value: 'artist' }} />
                  ) : (
                    <ArtistData data={fileSelected.artist_data} />
                  )}
                </div>
                <div className='data-block'>
                  {!fileSelected.master_track_log ? (
                    <DataMissing data={{ value: 'tracklog' }} />
                  ) : (
                    <MasterTracklog data={fileSelected.master_track_log} />
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Stack>
      </div>
    </Fragment>
  )
}

export default Playlists
