import React, { useState, Fragment } from "react";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// const fileTypes = ['TXT']

const TraktorFileInput = () => {
  const [file, setFile] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("/sendTraktorFile", formData, {
        headers: {
          "Content-Type": "text/plain",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  return (
    <Fragment>
      <div className="drag-and-drop">
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
        {/* <FileUploader
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
        </Button> */}
      </div>
    </Fragment>
  );
};

export default TraktorFileInput;
