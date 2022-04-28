import { useState, useEffect } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import Papa from 'papaparse'

import './draganddrop.css'
import axios from 'axios'

const fileTypes = ['CSV']

const DragAndDrop = () => {     
  const [parsedCsvData, setParsedCsvData] = useState([])   
  const [file, setFile] = useState(null) 
     
  const handleChange = async (event) => {    
    console.log(event)    
    Papa.parse(event, {
      header: true,
      download: false,
      complete: results => {        
        console.log(results.data)
        setParsedCsvData(...results.data)        
        console.log(parsedCsvData)
      }
    })            
    axios.post('http://localhost:5000/sendFile', parsedCsvData).then((response) => {
      console.log('* * * * * * * * * RESPONSE FROM EXPRESS: ', response)
    })      
  }

  // on handleChange call func that has two funcs in it
  // 1st - handles the File event from user (await csv parse & send to express)
  // 2nd - discards the File event in the browser (useEffect?)

  return (
    <div className='foo'>
      <FileUploader
        className='uploader'
        multiple={false}
        handleChange={handleChange}
        types={fileTypes}     
        name='file'    
        // fileOrFiles={null}     
      />
      {/* <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p> */}
      <p>file name here</p>
    </div>
  )
}

export default DragAndDrop
