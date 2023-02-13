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
  const [hasData, setHasData] = useState(false)

  const getUserPlaylists = async () => {
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
          <Typography style={{ fontSize: '20px', padding: '15px' }}>
            Playlists
          </Typography>
        </Stack>
        <Stack direction={{ sm: 'row', xs: 'column' }}>
          <CardContent
            style={{
              backgroundColor: 'rgba(217, 217, 217, 0.8)',
              width: '20%',
            }}
          >
            {hasData ? (
              <div>
                {userPlaylists.map((item, i) => (
                  <Typography key={i} onClick={() => {
                    setFileSelected(item)
                    console.log("ITEM: ", item)
                  }}>{item.playlist_data.title}</Typography>
                ))}
              </div>
            ) : (
              <div>Awaiting Data...</div>
            )}
          </CardContent>
          <CardContent
            style={{
              backgroundColor: 'rgba(235, 235, 235, 0.8)',
              width: '80%',
            }}
          >
            {
              fileSelected === null ? (<div>Select A File To Get Started</div>) : (<div>                
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
              </div>)
            }
          </CardContent>
        </Stack>
      </div>
    </Fragment>
  )
}

export default Playlists
