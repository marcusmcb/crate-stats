import React, { Fragment, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Titlebar from './shared/Titlebar'
import DataMissing from './shared/DataMissing'
import TrackData from './data_blocks/TrackData'
import BPMData from './data_blocks/BPMData'
import PlaylistData from './data_blocks/PlaylistData'
import KeyData from './data_blocks/KeyData'
import YearData from './data_blocks/YearData'
import DeckData from './data_blocks/DeckData'
import DoublesData from './data_blocks/DoublesData'
import DragAndDrop from './DragAndDrop'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import './testreport.css'

const TestReport = () => {
  const [data, setData] = useState(null)
  const [isBusy, setIsBusy] = useState(true)
  const isInitialMount = useRef(true)

  const getDataFromCSV = (userData) => {
    axios.post('http://localhost:5000/sendFile', userData).then((response) => {
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
      <div className='testpage-body'>
        {isBusy === true ? (
          <div className='data-block loading'>Awaiting data...</div>
        ) : (
          <div>
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
                <YearData data={data.year_data} />
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
                <h3 className='no-data'>No Deck Data</h3>
              ) : (
                <DeckData data={data.deck_data} />
              )}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default TestReport
