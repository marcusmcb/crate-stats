import React, { useState } from 'react'
import axios from 'axios'
import Papa from 'papaparse'
import { FileUploader } from 'react-drag-drop-files'
import './style/draganddrop.css'

const fileTypes = ['TXT']

const TraktorFileInput = () => {
  const [file, setFile] = useState('')

  const onChange = (event) => {
    setFile(event.name)
    Papa.parse(event, {
      header: true,
      download: false,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          await axios
            .post('/sendTraktorFile', results.data)
            .then((response) => {
              console.log(response.data)
            })
        } catch (err) {
          console.log(err)
        }
      },
    })
  }

  return (
    <div className='drag-and-drop'>
      <FileUploader
        className='uploader'
        multiple={false}
        handleChange={onChange}
        types={fileTypes}
        name='file'
        fileOrFiles={null}
      />
      <p className='drag-and-drop-label'>
        {file ? `File name: ${file}` : 'no files uploaded yet'}
      </p>
    </div>
  )
}
export default TraktorFileInput
