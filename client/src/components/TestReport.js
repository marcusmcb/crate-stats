import React, { Fragment, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Titlebar from './Titlebar'

import DragAndDrop from './DragAndDrop'
import MinutesText from './spantext/minutesText'
import SecondsText from './spantext/secondsText'
import MinuteText from './spantext/minuteText'
import SecondText from './spantext/secondText'
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
                <div>
                  {/* ****************************************** */}
                  {/* *********** TRACK DATA ******************* */}
                  {/* ****************************************** */}
                  <div className='data-block-toprow'>
                    <div className='toprow-container'>
                      <div className='data-block-primary'>
                        {/* ****************************************** */}
                        {/* *********** TOTAL TRACKS PLAYED ********** */}
                        {/* ****************************************** */}
                        <div className='data-block-primary-header'>
                          Total Tracks Played
                        </div>
                        <div className='data-block-primary-value-main'>
                          {data.track_data.total_tracks_played}
                        </div>
                      </div>
                      <div className='data-block-secondary'>
                        <div className='secondary-container'>
                          {/* ****************************************** */}
                          {/* ************* AVERAGE TRACK LENGTH ******* */}
                          {/* ****************************************** */}
                          <div className='secondary-container-header'>
                            Average Track Length
                          </div>
                          <div className='secondary-container-value'>
                            {data.track_data.average_track_length}
                          </div>
                          {/* <div className='secondary-container-header'>
                          Average Tracks Per Hour
                        </div>
                        <div className='secondary-container-value'>21</div> */}
                        </div>
                      </div>
                    </div>

                    <div className='data-block-third'>
                      <div className='tertiary-container'>
                        <div className='tertiary-item'>
                          {/* ****************************************** */}
                          {/* *************** LONGEST TRACK DATA ******* */}
                          {/* ****************************************** */}
                          <div className='tertiary-item-header'>
                            Longest Track:
                          </div>
                          <div className='timer-line'>
                            {data.track_data.longest_track.play_time.split(
                              ':'
                            )[0] > 1 ? (
                              <div>
                                {parseInt(
                                  data.track_data.longest_track.play_time.split(
                                    ':'
                                  )[0],
                                  10
                                )}{' '}
                                <span className='minutes-text'>
                                  <MinutesText />,
                                </span>
                              </div>
                            ) : (
                              <div>
                                {parseInt(
                                  data.track_data.longest_track.play_time.split(
                                    ':'
                                  )[0],
                                  10
                                )}{' '}
                                <span className='minutes-text'>
                                  <MinuteText />,
                                </span>
                              </div>
                            )}
                            {data.track_data.longest_track.play_time.split(
                              ':'
                            )[1] > 1 ? (
                              <div>
                                {parseInt(
                                  data.track_data.longest_track.play_time.split(
                                    ':'
                                  )[1],
                                  10
                                )}{' '}
                                <span className='minutes-text'>
                                  <SecondsText />
                                </span>
                              </div>
                            ) : (
                              <div>
                                {parseInt(
                                  data.track_data.longest_track.play_time.split(
                                    ':'
                                  )[1],
                                  10
                                )}{' '}
                                <span className='minutes-text'>
                                  <SecondText />
                                </span>
                              </div>
                            )}
                          </div>
                          <div className='tertiary-item-value'>
                            {data.track_data.longest_track.name} (
                            {data.track_data.longest_track.play_time})
                          </div>
                          <div className='tertiary-item-caption'>
                            played at{' '}
                            <span className='tertiary-item-timestamp'>
                              {data.track_data.longest_track.played_at}
                            </span>
                          </div>
                        </div>
                        <div className='tertiary-item'>
                          {/* ****************************************** */}
                          {/* ************** SHORTEST TRACK DATA ******* */}
                          {/* ****************************************** */}
                          <div className='tertiary-item-header'>
                            Shortest Track:
                          </div>
                          <div className='timer-line'>
                            {data.track_data.shortest_track.play_time.split(
                              ':'
                            )[0] > 1 ? (
                              <div>
                                {parseInt(
                                  data.track_data.shortest_track.play_time.split(
                                    ':'
                                  )[0],
                                  10
                                )}{' '}
                                <span className='minutes-text'>
                                  <MinutesText />,
                                </span>
                              </div>
                            ) : data.track_data.shortest_track.play_time.split(
                                ':'
                              )[0] === 1 ? (
                              <div>
                                {parseInt(
                                  data.track_data.shortest_track.play_time.split(
                                    ':'
                                  )[0],
                                  10
                                )}{' '}
                                <span className='minutes-text'>
                                  <MinuteText />,
                                </span>
                              </div>
                            ) : (
                              <span />
                            )}
                            {data.track_data.shortest_track.play_time.split(
                              ':'
                            )[1] > 1 ? (
                              <div>
                                {parseInt(
                                  data.track_data.shortest_track.play_time.split(
                                    ':'
                                  )[1],
                                  10
                                )}{' '}
                                <span className='minutes-text'>
                                  <SecondsText />
                                </span>
                              </div>
                            ) : (
                              <div>
                                {parseInt(
                                  data.track_data.shortest_track.play_time.split(
                                    ':'
                                  )[1],
                                  10
                                )}{' '}
                                <span className='minutes-text'>
                                  <SecondText />
                                </span>
                              </div>
                            )}
                          </div>
                          <div className='tertiary-item-value'>
                            {data.track_data.shortest_track.name} (
                            {data.track_data.shortest_track.play_time})
                          </div>
                          <div className='tertiary-item-caption'>
                            played at{' '}
                            <span className='tertiary-item-timestamp'>
                              {data.track_data.shortest_track.played_at}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='data-block-bottomrow'>
                    {/* <BarChart width={600} height={250} data={data} /> */}
                  </div>
                </div>
              )}
            </div>
            <div className='data-block'>
              {data.bpm_data.has_bpm_data === false ? (
                <h3 className='no-data'>No BPM Data</h3>
              ) : (
                <div className='data-block-toprow'>
                  <div className='toprow-container'>
                    <div className='data-block-primary'>
                      <div className='data-block-primary-header'>
                        Average BPM
                      </div>
                      <div className='data-block-primary-value-main'>
                        {data.bpm_data.average_bpm}
                      </div>
                    </div>
                    <div className='data-block-secondary'>
                      <div className='secondary-container'>
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
