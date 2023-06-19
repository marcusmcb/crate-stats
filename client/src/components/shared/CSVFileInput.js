import { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import Papa from 'papaparse'

import './style/fileinput.css'

const fileTypes = ['CSV']

const CSVFileInput = ({ getDataFromCSV }) => {
	const [file, setFile] = useState(null)

	const handleChange = (event) => {
		// append file size to results data and send w/API call
		// use later to avoid duplicate playlist uploads to firestore
		setFile(event.name)
		Papa.parse(event, {
			header: true,
			download: false,
			complete: (results) => {
				getDataFromCSV(results.data)
			},
		})
	}

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
	)
}

export default CSVFileInput
