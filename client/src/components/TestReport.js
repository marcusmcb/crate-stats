import React, { Fragment, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Titlebar from './Titlebar'

import DragAndDrop from './DragAndDrop'
import MinutesText from './spantext/minutesText'
import SecondsText from './spantext/secondsText'
// import MinuteText from './spantext/minuteText'
// import SecondText from './spantext/secondText'
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
        <div className='data-block'>
          <div className='data-block-toprow'>
            <div className='toprow-container'>
              <div className='data-block-primary'>
                <div className='data-block-primary-header'>
                  Total Tracks Played
                </div>
                {isBusy === true ? (
                  <div className='data-block-primary-value-main'>
                    Not yet...
                  </div>
                ) : (
                  <div className='data-block-primary-value-main'>
                    {data.track_data.total_tracks_played}
                  </div>
                )}
              </div>
              <div className='data-block-secondary'>
                <div className='secondary-container'>
                  <div className='secondary-container-header'>
                    Average Track Length
                  </div>
                  {isBusy === true ? (
                    <div className='secondary-container-value'>Waiting</div>
                  ) : (
                    <div className='secondary-container-value'>
                      {data.track_data.average_track_length}
                    </div>
                  )}

                  <div className='secondary-container-header'>
                    Average Tracks Per Hour
                  </div>
                  <div className='secondary-container-value'>21</div>
                </div>
              </div>
            </div>

            <div className='data-block-third'>
              <div className='tertiary-container'>
                <div className='tertiary-item'>
                  <div className='tertiary-item-header'>Longest Track:</div>
                  <div className='timer-line'>
                    4{' '}
                    <span className='minutes-text'>
                      <MinutesText />
                    </span>
                    , 43{' '}
                    <span className='minutes-text'>
                      <SecondsText />
                    </span>
                  </div>
                  <div className='tertiary-item-value'>
                    Your Mom Is A Cab Driver (4:43)
                  </div>
                  <div className='tertiary-item-caption'>
                    (played at{' '}
                    <span className='tertiary-item-timestamp'>8:32 PM</span>)
                  </div>
                </div>
                <div className='tertiary-item'>
                  <div className='tertiary-item-header'>Shortest Track:</div>
                  <div className='timer-line'>
                    4{' '}
                    <span className='minutes-text'>
                      <MinutesText />
                    </span>
                    , 43{' '}
                    <span className='minutes-text'>
                      <SecondsText />
                    </span>
                  </div>
                  <div className='tertiary-item-value'>
                    Your Dad Eats Cashews (2:21)
                  </div>
                  <div className='tertiary-item-caption'>
                    (played at{' '}
                    <span className='tertiary-item-timestamp'>10:14 PM</span>)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='data-block-bottomrow'>
            {/* <BarChart width={600} height={250} data={data} /> */}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default TestReport
