import { useState, useEffect, Fragment } from 'react'
import { Row, Col, Form, Input } from 'reactstrap'
import axios from 'axios'

import parseDisplayDate from '../scripts/parseDisplayDate'
import Titlebar from './Titlebar'
import './cratestats.css'

const CrateStats = () => {
  const [isData, setIsData] = useState(false)
  const [url, setUrl] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [playlistDate, setPlaylistDate] = useState([])
  const [playlistData, setPlaylistData] = useState({})

  const getReport = async (e) => {
    e.preventDefault()
    await axios
      .post('http://localhost:5000/createReport', { url: url })
      .then((response) => {
        console.log(response.data)
        setPlaylistData(response.data)
        let parts = url.split('/')
        let userString = parts[4]
        let userName = userString.replaceAll('_', ' ')
        let dateString = parts[5]
        let dateValue = parseDisplayDate(dateString)
        setPlaylistDate(dateValue)
        setDisplayName(userName)
        setIsData(true)
      })
      .catch((error) => {
        console.log(error)
      })
    setUrl('')
  }

  const handleChange = (e) => {
    setUrl(e.target.value)
  }

  return (
    <div className='cratestats'>
      <Titlebar />
      <Fragment>
        <div className='title-text'>Enter your Serato Playlist link below.</div>
        <Form className='url-form' onSubmit={getReport}>
          <Input
            className='w-50'
            type='text'
            name='url'
            value={url}
            onChange={handleChange}
          />
          <button type='submit'>Get Stats</button>
        </Form>
        <hr />
        {isData ? (
          <div className='data-ui'>
            {/* <p className='data-ui-maintitle'>Your Stats:</p> */}
            <Row className='data-ui-main-panel g-0'>
              <Col className='data-ui-column-left'>
                <Row className='data-ui-playlist-panel g-0'>
                  <Col className='data-ui-playlist-title'>
                    {/* <p>CrateStats for</p> */}
                    <p>{displayName}</p>
                  </Col>
                  <Col className='data-ui-playlist-date'>
                    <p>
                      {playlistDate[1]}, {playlistDate[0]}
                    </p>
                    <p>Set began @ {playlistData.setStartTime}</p>
                  </Col>
                </Row>
                <Row className='data-ui-playlist-stats g-0'>
                  {playlistData.setLength.setlengthhours === '0' ? (
                    <Fragment>
                      <div className='playlist-stats-row'>
                        <div>Set Length:</div>
                        <div>
                          {playlistData.setLength.setlengthminutes} Minutes,{' '}
                          {playlistData.setLength.setlengthseconds} Seconds
                        </div>
                      </div>
                    </Fragment>
                  ) : playlistData.setLength.setlengthhours === '1' ? (
                    <Fragment>
                      <div className='playlist-stats-row'>
                        <div>Set Length:</div>
                        <div>
                          {playlistData.setLength.setlengthhours} Hour,{' '}
                          {playlistData.setLength.setlengthminutes} Minutes
                        </div>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <div className='playlist-stats-row'>
                        <div>Set Length:</div>
                        <div>
                          {playlistData.setLength.setlengthhours} Hours,{' '}
                          {playlistData.setLength.setlengthminutes} Minutes
                        </div>
                      </div>
                    </Fragment>
                  )}
                </Row>
                <Row className='data-ui-playlist-stats g-0'>
                  <div className='playlist-stats-row'>
                    <div>Total Tracks Played:</div>
                    <div>{playlistData.totalTracksPlayed}</div>
                  </div>
                </Row>
                <Row className='data-ui-playlist-stats g-0'>
                  {playlistData.avgTrackLength.seconds == '0' ? (
                    <Fragment>
                      <div className='playlist-stats-row'>
                        <div>Average Track Length:</div>
                        <div>{playlistData.avgTrackLength.minutes} Minutes</div>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <div className='playlist-stats-row'>
                        <div>Average Track Length:</div>
                        <div>
                          {playlistData.avgTrackLength.minutes} Minutes,{' '}
                          {playlistData.avgTrackLength.seconds} Seconds
                        </div>
                      </div>
                    </Fragment>
                  )}
                </Row>
                <Row className='data-ui-playlist-stats g-0'>
                  {playlistData.shortestTrack.minutes == '0' ? (
                    <Fragment>
                      <div className='playlist-stats-row'>
                        <div>Shortest Track Played:</div>
                        <div>{playlistData.shortestTrack.seconds} Seconds</div>
                      </div>
                    </Fragment>
                  ) : playlistData.shortestTrack.minutes == '1' ? (
                    <Fragment>
                      <div className='playlist-stats-row'>
                        <div>Shortest Track Played:</div>
                        <div>
                          {playlistData.shortestTrack.minutes} Minute,{' '}
                          {playlistData.shortestTrack.seconds} Seconds
                        </div>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <div className='playlist-stats-row'>
                        <div>Shortest Track Played:</div>
                        <div>
                          {playlistData.shortestTrack.minutes} Minutes,{' '}
                          {playlistData.shortestTrack.seconds} Seconds
                        </div>
                      </div>
                    </Fragment>
                  )}
                </Row>
                <Row className='data-ui-playlist-stats g-0'>
                  {playlistData.longestTrack.minutes == '0' ? (
                    <Fragment>
                      <div className='playlist-stats-row'>
                      <div>Longest Track Played:</div>
                      <div>{playlistData.longestTrack.seconds} Seconds</div>
                      </div>
                    </Fragment>
                  ) : playlistData.longestTrack.minutes == '1' ? (
                    <Fragment>
                      <div className='playlist-stats-row'>
                        <div>Longest Track Played:</div>
                        <div>
                          {playlistData.longestTrack.minutes} Minute,{' '}
                          {playlistData.longestTrack.seconds} Seconds
                        </div>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <div className='playlist-stats-row'>
                        <div>Longest Track Played:</div>
                        <div>
                          {playlistData.longestTrack.minutes} Minutes,{' '}
                          {playlistData.longestTrack.seconds} Seconds
                        </div>
                      </div>
                    </Fragment>
                  )}
                </Row>
              </Col>

              <Col className='data-ui-column-right'>
                <Row className='stats-row-right g-0'>
                  <div>Longest Track:</div>
                  <div>{playlistData.longestTrack.name}</div>
                </Row>
                <Row className='stats-row-right g-0'>
                  <div>Shortest Track:</div>
                  <div>{playlistData.shortestTrack.name}</div>
                </Row>
                <Row className='stats-row-right g-0'>
                  <div>First Track:</div>
                  <div>{playlistData.trackLog[0].trackId}</div>
                </Row>
                <Row className='stats-row-right g-0'>
                  <div>Final Track:</div>
                  <div>
                    {
                      playlistData.trackLog[playlistData.trackLog.length - 1]
                        .trackId
                    }
                  </div>
                </Row>
                {playlistData.doublesPlayed.length != 0 ? (
                  <Col className='doubles-data'>
                    <div>
                      Doubles Played: {playlistData.doublesPlayed.length}
                    </div>
                    {playlistData.doublesPlayed.map((item, i) => (
                      <div key={i}>{item.name}</div>
                    ))}
                  </Col>
                ) : (
                  <Col className='doubles-data'>
                    <div>No doubles detected in this set.</div>
                  </Col>
                )}
              </Col>
            </Row>
          </div>
        ) : (
          <p></p>
        )}
      </Fragment>
    </div>
  )
}

export default CrateStats

// add color scaling on stat values to display comparison to aggregate (over/under)
