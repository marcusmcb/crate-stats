import React, { Fragment, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Titlebar from './Titlebar'
import TrackData from './data_blocks/TrackData'

import DragAndDrop from './DragAndDrop'
// import BarChart from "./d3/basicchart";

import './TestPage.css'

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
              {data.track_data.has_track_data === false ? (
                <h3 className='no-data'>No Track Data</h3>
              ) : (
                <TrackData data={data.track_data}/>                
              )}
            </div>
            <div className='data-block'>
              {data.bpm_data.has_bpm_data === false ? (
                <h3 className='no-data'>No BPM Data</h3>
              ) : (
                <div className='data-block-toprow'>
                  {/* ****************************************** */}
                  {/* ************* BPM DATA ******************* */}
                  {/* ****************************************** */}
                  <div className='toprow-container'>
                    <div className='data-block-primary'>
                      {/* ****************************************** */}
                      {/* *********** AVERAGE BPM ****************** */}
                      {/* ****************************************** */}
                      <div className='data-block-primary-header'>
                        Average BPM
                      </div>
                      <div className='data-block-primary-value-main'>
                        {data.bpm_data.average_bpm}
                      </div>
                    </div>
                    <div className='data-block-secondary'>
                      <div className='secondary-container'>
                        {/* ****************************************** */}
                        {/* ************ BPM RANGE ******************* */}
                        {/* ****************************************** */}
                        <div className='secondary-container-header'>
                          BPM Range
                        </div>
                        <div className='secondary-container-value'>
                          {data.bpm_data.bpm_range.minimum} -{' '}
                          {data.bpm_data.bpm_range.maximum}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='data-block-third'>
                    <div className='tertiary-container'>
                      <div className='tertiary-item'>
                        {/* ****************************************** */}
                        {/* *********** BIGGEST BPM CHANGE *********** */}
                        {/* ****************************************** */}
                        <div className='tertiary-item-header'>
                          Biggest BPM Change:{' '}
                          {data.bpm_data.biggest_bpm_change.track_one.bpm} -{' '}
                          {data.bpm_data.biggest_bpm_change.track_two.bpm}
                        </div>
                        <div className='timer-line'>
                          "{data.bpm_data.biggest_bpm_change.track_one.name}"
                          into "
                          {data.bpm_data.biggest_bpm_change.track_two.name}"
                        </div>
                        <div className='tertiary-item-caption'>
                          occurred at{' '}
                          <span className='tertiary-item-timestamp'>
                            {data.bpm_data.biggest_bpm_change.occurred_at}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default TestReport
