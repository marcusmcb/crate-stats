import { useState, useEffect, Fragment } from 'react'
import { Form, FormGroup, Input } from 'reactstrap'
import axios from 'axios'

import Titlebar from './Titlebar'
import './cratestats.css'

const CrateStats = () => {
  const [songData, setSongData] = useState({})
  const [isBusy, setIsBusy] = useState(true)
  const [tracks, setTracks] = useState([])

  let url

  const getReport = (e, url) => {
    e.preventDefault()
    console.log('HERE')
    console.log(url)
  }

  const handleChange = (e) => {    
    url = e.target.value
    return url    
  }

  let trackList = []

  useEffect(() => {
    const getStats = async () => {
      let reportData
      await axios
        .get('http://localhost:5000/createReport')
        .then((response) => {
          reportData = response.data
        })
        .catch((error) => {
          console.log(error)
        })
      return reportData
    }
    getStats().then((data) => {
      for (let i = 0; i < data.trackLog.length; i++) {
        trackList.push(data.trackLog[i].trackId)
      }
      console.log(data)
      setTracks(trackList)
      setSongData(data)
      setIsBusy(false)
    })
  }, [])

  return (
    <div>
      <Titlebar />
      {isBusy ? (
        <p>Loading...</p>
      ) : (
        <Fragment>
          <Form onSubmit={getReport}>
            <FormGroup>
              <Input
                type='text'
                name='url'
                value={url}
                onChange={handleChange}
                placeholder='your Serato playlist URL'
                bsSize='sm'
              />
            </FormGroup>
            <button type='submit'>Submit</button>
          </Form>
          <hr />
          <div>Your Report:</div>
        </Fragment>
      )}
    </div>
  )
}

export default CrateStats
