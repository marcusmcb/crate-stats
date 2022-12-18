import React, { useState, Fragment } from 'react'
import axios from 'axios'
import { FileUploader } from 'react-drag-drop-files'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const fileTypes = ['TXT']

const TraktorFileInput = () => {
  const [file, setFile] = useState(null)

  const handleChange = (event) => {
    setFile(event)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    try {
      await axios.post('/sendTraktorFile', formData).then(response => console.log(response))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Fragment>
      <div className='drag-and-drop'>
        <FileUploader
          multiple={false}
          handleChange={handleChange}
          types={fileTypes}
          name='file'
          fileOrFiles={null}
        />
        <p className='drag-and-drop-label'>
          {file ? `File name: ${file.name}` : 'no files uploaded yet'}
        </p>
        <Button type='submit' onClick={handleSubmit}>
          Get Data
        </Button>
      </div>
    </Fragment>
  )
}

export default TraktorFileInput
