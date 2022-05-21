import { useState, useEffect, useCallback } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import Papa from 'papaparse'

import './draganddrop.css'
import axios from 'axios'

const fileTypes = ['CSV']

const DragAndDrop = () => {
  const [parsedCsvData, setParsedCsvData] = useState([]) 
  const [file, setFile] = useState(null) 
  
  const handleChange = (event) => {
    console.log(event.name)
    setFile(event.name)
    console.log(event)
    Papa.parse(event, {
      header: true,
      download: false,
      complete: (results) => {        
        setParsedCsvData(results.data)
      }
    })    
  }  

  useEffect(() => {
    if (parsedCsvData.length === 0) {
      console.log('NOTHING')
    } else {
      // console.log(parsedCsvData)
      axios
        .post('http://localhost:5000/sendFile', parsedCsvData)
        .then((response) => {
          console.log('* * * * * * * * * RESPONSE FROM EXPRESS ')
          console.log(response.data)
          // useEffect not clearing previous csv from console when loading a new one
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
      <p>{file ? `File name: ${file}` : "no files uploaded yet"}</p>      
    </div>
  )
}

export default DragAndDrop
