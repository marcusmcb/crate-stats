import React, { Fragment } from 'react'
import Titlebar from '../../components/shared/Titlebar'
import './playlists.css'

const Playlists = () => {
  return (
    <Fragment>
      <div className='playlist-pagebody'>
        <Titlebar />
        <div>Playlists</div>
      </div>
    </Fragment>
  )
}

export default Playlists
