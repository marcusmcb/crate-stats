import { useState, useEffect, Fragment } from 'react'
import { Form, FormGroup, Input } from 'reactstrap'
import axios from 'axios'

import Titlebar from './Titlebar'
import './cratestats.css'

const CrateStats = () => {
  let url

  const getReport = async (e) => {
    e.preventDefault()
    await axios
      .post('http://localhost:5000/createReport', { url: url })
      .then((response) => {
        console.log(response.data)
      })
  }

  const handleChange = (e) => {
    url = e.target.value
  }

  return (
    <div>
      <Titlebar />
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
      </Fragment>
    </div>
  )
}

export default CrateStats
