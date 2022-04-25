import { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import Papa from 'papaparse'

import './draganddrop.css'
import axios from 'axios'

const fileTypes = ['CSV']

const DragAndDrop = () => {
  
  const [parsedCsvData, setParsedCsvData] = useState([])

  const handleChange = (event) => {    
    console.log(event)
    Papa.parse(event, {
      header: true,
      complete: results => {
        setParsedCsvData(results.data)
      }
    })    
    console.log(parsedCsvData)
    axios.post('http://localhost:5000/sendFile', parsedCsvData).then((response) => {
      console.log('* * * * * * * * * RESPONSE FROM EXPRESS: ', response)
    })
  }

  return (
    <div className='foo'>
      <FileUploader
        multiple={false}
        handleChange={handleChange}
        name='file'
        types={fileTypes}
      />
      {/* <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p> */}
      <p>file name here</p>
    </div>
  )
}

export default DragAndDrop
