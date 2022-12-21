import React, { useState } from "react";
import axios from "axios";
import Papa from "papaparse";

const TraktorFileInput = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const textData = Papa.parse(file, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          await axios
            .post("/sendTraktorFile", results.data)
            .then((response) => {
              console.log(response.data);
            });
        } catch (err) {
          console.log(err);
        }
      },
    });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
          </div>
        </div>
      ) : null}
    </>
  );
};
export default TraktorFileInput;
