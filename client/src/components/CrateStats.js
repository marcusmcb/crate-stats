import { useState, useEffect, Fragment } from 'react'
import { Row, Col, Form, Input } from 'reactstrap'
import axios from 'axios'

import Titlebar from './Titlebar'
import './cratestats.css'

const CrateStats = () => {
  let url

  useEffect(() => {}, [])

  const [isData, setIsData] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [playlistDate, setPlaylistDate] = useState('')
  const [playlistData, setPlaylistData] = useState({})

  const parseDisplayDate = (dateString) => {
    let x = new Date(dateString)
    var normalizedDate = new Date(x.getTime() - x.getTimezoneOffset() * -60000)
    var formattedDate = normalizedDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    return formattedDate
  }

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
  }

  const handleChange = (e) => {
    url = e.target.value
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
            placeholder='your Serato playlist URL'
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
                    <p>CrateStats for</p>
                    <p>{displayName}</p>
                  </Col>
                  <Col className='data-ui-playlist-date'>
                    <p>{playlistDate}</p>
                    <p>Start Time: {playlistData.setStartTime}</p>
                  </Col>
                </Row>
                <Row className='data-ui-playlist-stats'>                  
                  {playlistData.setLength.setlengthhours === '0' ? (
                    <p>
                      Set Length: {playlistData.setLength.setlengthminutes}{' '}
                      Minutes, {playlistData.setLength.setlengthseconds} Seconds
                    </p>
                  ) : playlistData.setLength.setlengthhours === '1' ? (
                    <p>
                      Set Length: {playlistData.setLength.setlengthhours} Hour,{' '}
                      {playlistData.setLength.setlengthminutes} Minutes
                    </p>
                  ) : (
                    <p>
                      Set Length: {playlistData.setLength.setlengthhours} Hours,{' '}
                      {playlistData.setLength.setlengthminutes} Minutes
                    </p>
                  )}
                </Row>
                <Row className='data-ui-playlist-stats'>
                  <p>Total Tracks Played: {playlistData.totalTracksPlayed}</p>
                </Row>
                <Row className='data-ui-playlist-stats'>
                  {playlistData.avgTrackLength.seconds === '00' ? (
                    <p>
                      Average Track Length:{' '}
                      {playlistData.avgTrackLength.minutes} Minutes
                    </p>
                  ) : (
                    <p>
                      Average Track Length:{' '}
                      {playlistData.avgTrackLength.minutes} Minutes,{' '}
                      {playlistData.avgTrackLength.seconds} Seconds
                    </p>
                  )}
                </Row>
                <Row className='data-ui-playlist-stats'>
                  
                  {/* <p>
                    Shortest Track Played:{' '}
                    {playlistData.shortestTrack.length
                      .split(':')[1]
                      .substring(1)}{' '}
                    Seconds
                  </p> */}
                  {
                    // console.log("HERE", playlistData.shortestTrack.length.split(':')[1].charAt(0))                    
                    // console.log("HERE", playlistData.shortestTrack.length.split(':')[1])                    
                    playlistData.shortestTrack.length.split(':')[0] === '0' && playlistData.shortestTrack.length.split(':')[1].charAt(0) === '0'
                    ?
                    <p>
                      Shortest Track Played: {playlistData.shortestTrack.length.split(':')[1].charAt(1)} Seconds
                    </p>
                    :
                    playlistData.shortestTrack.length.split(':')[0] === '0'
                    ?
                    <p>
                      Shortest Track Played: {playlistData.shortestTrack.length.split(':')[1]} Seconds
                    </p>
                    :
                    <p></p>
                  }
                </Row>
                <Row className='data-ui-playlist-stats'>
                  {}
                  <p>
                    Longest Track Played: {playlistData.longestTrack.length}
                  </p>
                </Row>
              </Col>

              <Col className='data-ui-column-right'>
                <Row className='stats-row-right g-0'>
                  <p>Longest Track:</p>
                  <p>{playlistData.longestTrack.name}</p>
                </Row>
                <Row className='stats-row-right g-0'>
                  <p>Shortest Track:</p>
                  <p>{playlistData.shortestTrack.name}</p>
                </Row>
                <Row className='stats-row-right g-0'>
                  <p>First Track:</p>
                  <p>{playlistData.trackLog[0].trackId}</p>
                </Row>
                <Row className='stats-row-right g-0'>
                  <p>Final Track:</p>
                  <p>
                    {
                      playlistData.trackLog[playlistData.trackLog.length - 1]
                        .trackId
                    }
                  </p>
                </Row>
                <Col className='doubles-data'>
                  {playlistData.doublesPlayed ? <p>Yep</p> : <p>Nope</p>}
                </Col>
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
