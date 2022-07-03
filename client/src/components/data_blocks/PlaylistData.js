import React from 'react'

import MinutesText from '../text_spans/minutesText'
import SecondsText from '../text_spans/secondsText'
import MinuteText from '../text_spans/minuteText'
import SecondText from '../text_spans/secondText'
import HoursText from '../text_spans/hoursText'
import HourText from '../text_spans/hourText'

const PlaylistData = (playlistData) => {
  return (
    <div>
      {/* ****************************************** */}
      {/* *********** PLAYLIST DATA **************** */}
      {/* ****************************************** */}
      <div className='data-block-title'>Playlist Data</div>
      <div className='data-block-toprow'>
        <div className='toprow-container'>
          <div className='data-block-primary'>
            {/* ****************************************** */}
            {/* *********** TOTAL TRACKS PLAYED ********** */}
            {/* ****************************************** */}
            <div className='data-block-primary-header'>
              {playlistData.data.has_artist === false ? (
                <h3>No Artist Data</h3>
              ) : (
                <h3>{playlistData.data.title}</h3>
              )}
            </div>
            <div className='data-block-primary-value-main'>
              {playlistData.data.has_playlist_length === false ? (
                <h3>No Playlist Data</h3>
              ) : (
                <h3>
                  {playlistData.data.start_time_formatted.day},{' '}
                  {playlistData.data.start_time_formatted.month}{' '}
                  {playlistData.data.start_time_formatted.dateday}
                </h3>
              )}
            </div>
          </div>
          <div className='data-block-secondary'>
            <div className='secondary-container'>
              {/* ****************************************** */}
              {/* ************* SET START TIME ************* */}
              {/* ****************************************** */}
              <div className='secondary-container-header'>Set Length:</div>
              {playlistData.data.has_playlist_length === false ? (
                <h3>Has No Playlist Length</h3>
              ) : playlistData.data.playlist_length_formatted.hours > 1 ? (
                playlistData.data.playlist_length_formatted.minutes > 1 ? (
                  <h3>Hours And Minutes</h3>
                ) : (
                  <h3>Hours And Minute</h3>
                )
              ) : playlistData.data.playlist_length_formatted.hours === 1 ? (
                playlistData.data.playlist_length_formatted.minutes > 1 ? (
                  <h3>Hour And Minutes</h3>
                ) : (
                  <h3>Hour And Minute</h3>
                )
              ) : playlistData.data.playlist_length_formatted.minutes > 1 ? (
                <h3>Minutes</h3>
              ) : (
                <h3>Minute</h3>
              )}

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
              <div className='tertiary-item-header'>Longest Track:</div>
              <div className='timer-line'>
                {/* {trackdata.data.longest_track.play_time.split(":")[0] > 1 ? (
                  <div>
                    {parseInt(
                      trackdata.data.longest_track.play_time.split(":")[0],
                      10
                    )}{" "}
                    <span className="minutes-text">
                      <MinutesText />,
                    </span>
                  </div>
                ) : (
                  <div>
                    {parseInt(
                      trackdata.data.longest_track.play_time.split(":")[0],
                      10
                    )}{" "}
                    <span className="minutes-text">
                      <MinuteText />,
                    </span>
                  </div>
                )}
                {trackdata.data.longest_track.play_time.split(":")[1] > 1 ? (
                  <div>
                    {parseInt(
                      trackdata.data.longest_track.play_time.split(":")[1],
                      10
                    )}{" "}
                    <span className="minutes-text">
                      <SecondsText />
                    </span>
                  </div>
                ) : (
                  <div>
                    {parseInt(
                      trackdata.data.longest_track.play_time.split(":")[1],
                      10
                    )}{" "}
                    <span className="minutes-text">
                      <SecondText />
                    </span>
                  </div>
                )} */}
              </div>
              <div className='tertiary-item-value'>
                {/* {trackdata.data.longest_track.name} (
                {trackdata.data.longest_track.play_time}) */}
              </div>
              <div className='tertiary-item-caption'>
                played at{' '}
                <span className='tertiary-item-timestamp'>
                  {/* {trackdata.data.longest_track.played_at} */}
                </span>
              </div>
            </div>
            <div className='tertiary-item'>
              {/* ****************************************** */}
              {/* ************** SHORTEST TRACK DATA ******* */}
              {/* ****************************************** */}
              <div className='tertiary-item-header'>Shortest Track:</div>
              <div className='timer-line'>
                {/* {trackdata.data.shortest_track.play_time.split(":")[0] > 1 ? (
                  <div>
                    {parseInt(
                      trackdata.data.shortest_track.play_time.split(":")[0],
                      10
                    )}{" "}
                    <span className="minutes-text">
                      <MinutesText />,
                    </span>
                  </div>
                ) : trackdata.data.shortest_track.play_time.split(":")[0] === 1 ? (
                  <div>
                    {parseInt(
                      trackdata.data.shortest_track.play_time.split(":")[0],
                      10
                    )}{" "}
                    <span className="minutes-text">
                      <MinuteText />,
                    </span>
                  </div>
                ) : (
                  <span />
                )}
                {trackdata.data.shortest_track.play_time.split(":")[1] > 1 ? (
                  <div>
                    {parseInt(
                      trackdata.data.shortest_track.play_time.split(":")[1],
                      10
                    )}{" "}
                    <span className="minutes-text">
                      <SecondsText />
                    </span>
                  </div>
                ) : (
                  <div>
                    {parseInt(
                      trackdata.data.shortest_track.play_time.split(":")[1],
                      10
                    )}{" "}
                    <span className="minutes-text">
                      <SecondText />
                    </span>
                  </div>
                )} */}
              </div>
              <div className='tertiary-item-value'>
                {/* {trackdata.data.shortest_track.name} (
                {trackdata.data.shortest_track.play_time}) */}
              </div>
              <div className='tertiary-item-caption'>
                played at{' '}
                <span className='tertiary-item-timestamp'>
                  {/* {trackdata.data.shortest_track.played_at} */}
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
  )
}

export default PlaylistData
