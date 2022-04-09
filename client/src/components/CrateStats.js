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
                <Row className='stats-row-left g-0'>
                  <Col>
                    <div className='stats-label-djname'>{displayName}</div>
                  </Col>
                  <Col className='set-time-values'>
                    <div className='stats-value'>
                      {playlistDate[1]}, {playlistDate[0]}
                    </div>
                    <div className='stats-label'>
                      Set start time:{' '}
                      <span className='stats-value-time'>
                        {playlistData.setStartTime}
                      </span>
                    </div>
                  </Col>
                </Row>
                <Row className='stats-row-left stats-row-left-divider g-0'>
                  <div className='stats-row-left-text'>Set Length:</div>
                  <div className='stats-row-left-text'>
                    {playlistData.setLength.setlengthhours === '0' ? (
                      <div className='stats-row-left-text'>
                        {playlistData.setLength.setlengthminutes} Minutes,{' '}
                        {playlistData.setLength.setlengthseconds} Seconds
                      </div>
                    ) : playlistData.setLength.setlengthhours === '1' ? (
                      <div className='stats-row-left-text'>
                        {playlistData.setLength.setlengthhours} Hour,{' '}
                        {playlistData.setLength.setlengthminutes} Minutes
                      </div>
                    ) : (
                      <div className='stats-row-left-text'>
                        {playlistData.setLength.setlengthhours} Hours,{' '}
                        {playlistData.setLength.setlengthminutes} Minutes
                      </div>
                    )}
                  </div>
                </Row>
                <Row className='stats-row-left g-0'>
                  <div className='stats-row-left-text'>
                    Total Tracks Played:
                  </div>
                  <div className='stats-row-left-text'>
                    {playlistData.totalTracksPlayed}
                  </div>
                </Row>
                <Row className='stats-row-left g-0'>
                  <div className='stats-row-left-text'>
                    Average Track Length:
                  </div>
                  {playlistData.avgTrackLength.minutes == '0' ? (
                    <div className='stats-row-left-text'>
                      {playlistData.avgTrackLength.seconds} Seconds
                    </div>
                  ) : playlistData.avgTrackLength.minutes == '1' ? (
                    <div className='stats-row-left-text'>
                      {playlistData.avgTrackLength.minutes} Minute,{' '}
                      {playlistData.avgTrackLength.seconds} Seconds
                    </div>
                  ) : (
                    <div className='stats-row-left-text'>
                      {playlistData.avgTrackLength.minutes} Minutes,{' '}
                      {playlistData.avgTrackLength.seconds} Seconds
                    </div>
                  )}
                </Row>
                <Row className='stats-row-left g-0'>
                  <div className='stats-row-left-text'>Shortest Track:</div>
                  {playlistData.shortestTrack.minutes == '0' ? (
                    <div className='stats-row-left-text'>
                      {playlistData.shortestTrack.seconds} Seconds
                    </div>
                  ) : playlistData.shortestTrack.minutes == '1' ? (
                    <div className='stats-row-left-text'>
                      {playlistData.shortestTrack.minutes} Minute,{' '}
                      {playlistData.shortestTrack.seconds} Seconds
                    </div>
                  ) : (
                    <div className='stats-row-left-text'>
                      {playlistData.shortestTrack.minutes} Minutes,{' '}
                      {playlistData.shortestTrack.seconds} Seconds
                    </div>
                  )}
                </Row>
                <Row className='stats-row-left g-0'>
                  <div className='stats-row-left-text'>Longest Track:</div>
                  {playlistData.longestTrack.minutes == '0' ? (
                    <div className='stats-row-left-text'>
                      {playlistData.longestTrack.seconds} Seconds
                    </div>
                  ) : playlistData.longestTrack.minutes == '1' ? (
                    <div className='stats-row-left-text'>
                      {playlistData.longestTrack.minutes} Minute,{' '}
                      {playlistData.longestTrack.seconds} Seconds
                    </div>
                  ) : (
                    <div className='stats-row-left-text'>
                      {playlistData.longestTrack.minutes} Minutes,{' '}
                      {playlistData.longestTrack.seconds} Seconds
                    </div>
                  )}
                </Row>
              </Col>

              <Col className='data-ui-column-right'>
                <Row className='stats-row-right g-0'>
                  {playlistData.longestTrack.lengthValue.length === 3 ? (
                    <div className='stats-label'>
                      Longest Track: (
                      {playlistData.longestTrack.minutes +
                        ':0' +
                        playlistData.longestTrack.lengthValue.slice(-1)}
                      )
                    </div>
                  ) : (
                    <div className='stats-label'>
                      Longest Track ({playlistData.longestTrack.lengthValue})
                    </div>
                  )}
                  <div className='stats-value'>
                    {playlistData.longestTrack.name}
                  </div>
                </Row>
                <Row className='stats-row-right g-0'>
                  {playlistData.shortestTrack.lengthValue.length === 3 ? (
                    <div className='stats-label'>
                      Shortest Track: (
                      {'0:0' + playlistData.shortestTrack.lengthValue.slice(-1)}
                      )
                    </div>
                  ) : (
                    <div className='stats-label'>
                      Shortest Track ({playlistData.shortestTrack.lengthValue})
                    </div>
                  )}
                  <div className='stats-value'>
                    {playlistData.shortestTrack.name}
                  </div>
                </Row>
                <Row className='stats-row-right g-0'>
                  <div className='stats-label'>First Track:</div>
                  <div className='stats-value'>
                    {playlistData.trackLog[0].trackId}
                  </div>
                </Row>
                <Row className='stats-row-right g-0'>
                  <div className='stats-label'>Final Track:</div>
                  <div className='stats-value'>
                    {
                      playlistData.trackLog[playlistData.trackLog.length - 1]
                        .trackId
                    }
                  </div>
                </Row>
                {playlistData.doublesPlayed.length != 0 ? (
                  <Col className='doubles-data-title doubles-data'>
                    <div>
                      Doubles Played ({playlistData.doublesPlayed.length})
                    </div>
                    {playlistData.doublesPlayed.map((item, i) => (
                      <div className='doubles-data-values' key={i}>
                        {item.name}
                      </div>
                    ))}
                  </Col>
                ) : (
                  <Col className='doubles-data double-data-values no-doubles'>
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
