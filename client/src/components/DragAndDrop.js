import { useState, useEffect, useCallback } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import Papa from 'papaparse'
import axios from 'axios'

import './draganddrop.css'

const fileTypes = ['CSV']

const DragAndDrop = ({ childToParent }) => {

  const [parsedCsvData, setParsedCsvData] = useState([])
  const [file, setFile] = useState(null) 

  const handleChange = (event) => {
    console.log(event.name)
    setFile(event.name)
    Papa.parse(event, {
      header: true,
      download: false,
      complete: (results) => {
        setParsedCsvData(results.data)
      },
    })
  }

  useEffect(() => {
    if (parsedCsvData.length === 0) {
      return
    } else {
      axios
        .post('http://localhost:5000/sendFile', parsedCsvData)
        .then((response) => {
          console.log('* * * * * * * * * RESPONSE FROM EXPRESS ')
          childToParent(response.data)
          setParsedCsvData([])
        })
    }
  })

  return (
    <div className='foo'>
      <FileUploader
        className='uploader'
        multiple={false}
        handleChange={handleChange}
        types={fileTypes}
        name='file'
        fileOrFiles={null}
      />
      <p>{file ? `File name: ${file}` : 'no files uploaded yet'}</p>
    </div>
  )
}

export default DragAndDrop
