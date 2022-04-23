import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import * as csv from 'csvtojson'

import "./draganddrop.css";
import axios from "axios";

const fileTypes = ["CSV"];

const DragAndDrop = () => {
  const [csvFile, setCsvFile] = useState(null)
  const handleChange = (file) => {
    setCsvFile(file)
    axios.post('http://localhost:5000/sendFile', file)
      .then((response) => {
        console.log(response)
      })
  };
  return (
    <div className="foo">      
      <FileUploader
        multiple={false}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      {/* <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p> */}
      <p>file name here</p>
    </div>
  );
}

export default DragAndDrop