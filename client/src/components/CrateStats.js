import { useState, useEffect, Fragment } from 'react'
import axios from 'axios'

import Titlebar from './Titlebar'
import './cratestats.css'

const CrateStats = () => {
  const [songData, setSongData] = useState({})
  const [isBusy, setIsBusy] = useState(true)
  const [tracks, setTracks] = useState([])

  let trackList = []

  useEffect(() => {
    const getStats = async () => {
      let reportData
      await axios
        .get('http://localhost:5000/createReport')
        .then((response) => {
          console.log(response.data)
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
          <div>Your Report:</div>
        </Fragment>
                 
      )}
    </div>
  )
}

export default CrateStats
