import React, { useState, Fragment } from 'react'
import axios from 'axios'
import { FileUploader } from 'react-drag-drop-files'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const fileTypes = ['TXT']

const TraktorFileInput = () => {
  const [file, setFile] = useState(null)

  const handleChange = (event) => {
    console.log(event)
    setFile(event.name)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    console.log('FILE? ', file)
    fetch('/sendTraktorFile', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
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
          {file ? `File name: ${file}` : 'no files uploaded yet'}
        </p>
      </div>
    </Fragment>
  )
}

export default TraktorFileInput
