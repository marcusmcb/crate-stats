import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import Papa from 'papaparse';
import PropTypes from 'prop-types';

import './style/fileinput.css';

const fileTypes = ['CSV'];

const CSVFileInput = ({ getDataFromCSV }) => {
  const [file, setFile] = useState('');

  const handleChange = (file) => {
    setFile(file.name);
    Papa.parse(file, {
      header: true,
      download: false,
      complete: (results) => {
        getDataFromCSV(results.data);
      },
    });
  };

  return (
    <div className='drag-and-drop'>
      <FileUploader
        className='uploader'
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
  );
};

CSVFileInput.propTypes = {
  getDataFromCSV: PropTypes.func.isRequired,
};

export default CSVFileInput;
