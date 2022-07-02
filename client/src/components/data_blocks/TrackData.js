import React from 'react'
import MinutesText from '../spantext/minutesText'
import SecondsText from '../spantext/secondsText'
import MinuteText from '../spantext/minuteText'
import SecondText from '../spantext/secondText'

const TrackData = (data) => {
  console.log(data)
  return (
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
            <div className='data-block-primary-header'>Total Tracks Played</div>
            <div className='data-block-primary-value-main'>
              {data.data.total_tracks_played}
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
                {data.data.average_track_length.substring(1)}
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
              <div className='tertiary-item-header'>Longest Track:</div>
              <div className='timer-line'>
                {data.data.longest_track.play_time.split(':')[0] > 1 ? (
                  <div>
                    {parseInt(
                      data.data.longest_track.play_time.split(':')[0],
                      10
                    )}{' '}
                    <span className='minutes-text'>
                      <MinutesText />,
                    </span>
                  </div>
                ) : (
                  <div>
                    {parseInt(
                      data.data.longest_track.play_time.split(':')[0],
                      10
                    )}{' '}
                    <span className='minutes-text'>
                      <MinuteText />,
                    </span>
                  </div>
                )}
                {data.data.longest_track.play_time.split(':')[1] > 1 ? (
                  <div>
                    {parseInt(
                      data.data.longest_track.play_time.split(':')[1],
                      10
                    )}{' '}
                    <span className='minutes-text'>
                      <SecondsText />
                    </span>
                  </div>
                ) : (
                  <div>
                    {parseInt(
                      data.data.longest_track.play_time.split(':')[1],
                      10
                    )}{' '}
                    <span className='minutes-text'>
                      <SecondText />
                    </span>
                  </div>
                )}
              </div>
              <div className='tertiary-item-value'>
                {data.data.longest_track.name} (
                {data.data.longest_track.play_time})
              </div>
              <div className='tertiary-item-caption'>
                played at{' '}
                <span className='tertiary-item-timestamp'>
                  {data.data.longest_track.played_at}
                </span>
              </div>
            </div>
            <div className='tertiary-item'>
              {/* ****************************************** */}
              {/* ************** SHORTEST TRACK DATA ******* */}
              {/* ****************************************** */}
              <div className='tertiary-item-header'>Shortest Track:</div>
              <div className='timer-line'>
                {data.data.shortest_track.play_time.split(':')[0] > 1 ? (
                  <div>
                    {parseInt(
                      data.data.shortest_track.play_time.split(':')[0],
                      10
                    )}{' '}
                    <span className='minutes-text'>
                      <MinutesText />,
                    </span>
                  </div>
                ) : data.data.shortest_track.play_time.split(':')[0] === 1 ? (
                  <div>
                    {parseInt(
                      data.data.shortest_track.play_time.split(':')[0],
                      10
                    )}{' '}
                    <span className='minutes-text'>
                      <MinuteText />,
                    </span>
                  </div>
                ) : (
                  <span />
                )}
                {data.data.shortest_track.play_time.split(':')[1] > 1 ? (
                  <div>
                    {parseInt(
                      data.data.shortest_track.play_time.split(':')[1],
                      10
                    )}{' '}
                    <span className='minutes-text'>
                      <SecondsText />
                    </span>
                  </div>
                ) : (
                  <div>
                    {parseInt(
                      data.data.shortest_track.play_time.split(':')[1],
                      10
                    )}{' '}
                    <span className='minutes-text'>
                      <SecondText />
                    </span>
                  </div>
                )}
              </div>
              <div className='tertiary-item-value'>
                {data.data.shortest_track.name} (
                {data.data.shortest_track.play_time})
              </div>
              <div className='tertiary-item-caption'>
                played at{' '}
                <span className='tertiary-item-timestamp'>
                  {data.data.shortest_track.played_at}
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

export default TrackData
