import { useState, useEffect, Fragment } from 'react'
import { Card, Button, Form, Divider, Container, Grid } from 'semantic-ui-react'
import axios from 'axios'

import parseDay from '../scripts/parseDay'
import parseDisplayName from '../scripts/parseDisplayName'
import Titlebar from './shared/Titlebar'

const LiveReport = () => {
  const [d3Data, setD3Data] = useState([])
  const [isData, setIsData] = useState(false)
  const [url, setUrl] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [playlistDate, setPlaylistDate] = useState([])
  const [playlistData, setPlaylistData] = useState({})
  const [playlistName, setPlaylistName] = useState('')

  const getReport = async (e) => {
    console.log(e)
    e.preventDefault()
    await axios
      .post('http://localhost:5000/liveplaylist', { url: url })
      .then((response) => {
        console.log(response.data)
        setPlaylistData(response.data)
        setD3Data(response.data.trackLengthArray)
        let userName = parseDisplayName(url)
        let dateValue = response.data.playlistDate
        let displayDay = parseDay(response.data.playlistDate)

        if (
          response.data.playlistTitle.charAt(
            response.data.playlistTitle.length - 5
          ) === '/'
        ) {
          setPlaylistName('')
        } else {
          setPlaylistName(response.data.playlistTitle)
        }

        setPlaylistDate([dateValue, displayDay])
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
    <div>
      <Fragment>
        <Titlebar />
        <Divider />
        <Container text textAlign='center'>
          <p>Enter your Serato Live Playlist URL below.</p>
        </Container>
        <Grid padded='vertically'>
          <Grid.Row centered>
            <Grid.Column width={8}>
              <Form size='small' onSubmit={getReport}>
                <Form.Input
                  placeholder='your url here'
                  value={url}
                  onChange={handleChange}
                />
                <Button type='submit'>Get Stats</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {
          isData ? (
            <div>
              <Divider></Divider>
              <Grid padded='vertically'>
                <Grid.Row centered>
                  <Grid.Column>
                    <Container text>Crate Stats</Container>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          ) : (<div>Nope</div>)
        }
      </Fragment>
    </div>
  )
}

export default LiveReport

// add color scaling on stat values to display comparison to aggregate (over/under)
