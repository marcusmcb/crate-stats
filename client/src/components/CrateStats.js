import { useState, useEffect, Fragment } from 'react'
import { Form, FormGroup, Input } from 'reactstrap'
import axios from 'axios'

import Titlebar from './Titlebar'
import './cratestats.css'

const CrateStats = () => {
  let url

  useEffect(() => {

  }, [])

  const [isData, setIsData] = useState(false)
  const [dummyData, setDummyData] = useState({})

  const getReport = async (e) => {
    e.preventDefault()
    await axios
      .post('http://localhost:5000/createReport', { url: url })
      .then((response) => {
        console.log(response.data)
        setDummyData(response.data)
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
    <div>
      <Titlebar />
      <Fragment>
        <Form className='url-form' onSubmit={getReport}>
          <FormGroup>
            <Input 
              type='text'
              name='url'              
              value={url}
              onChange={handleChange}
              placeholder='your Serato playlist URL'                          
            />
          </FormGroup>
          <button type='submit'>Submit</button>
        </Form>
        {isData ? (
          <div>
            <h2>Here's Your Data</h2>
            <p>...dummy data...</p>
          </div>
        ) : (
          <p>Waiting...</p>
        )}
      </Fragment>
    </div>
  )
}

export default CrateStats
