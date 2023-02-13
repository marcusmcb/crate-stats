import React, { Fragment, useState } from 'react'
import Titlebar from '../../components/shared/Titlebar'
import axios from 'axios'

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'

import './playlists.css'

const Playlists = () => {
  const [userPlaylists, setUserPlaylists] = useState([])
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
            { hasData ? (<div>
              {
                userPlaylists.map((item, i) => (
                  <Typography>
                    {item.playlist_data.title}
                  </Typography>
                ))
              }
            </div>) : (<></>) }
          </CardContent>
          <CardContent
            style={{
              backgroundColor: 'rgba(235, 235, 235, 0.8)',
              width: '80%',
            }}
          >
            Data Display
          </CardContent>
        </Stack>
      </div>
    </Fragment>
  )
}

export default Playlists
