import React, { useState } from 'react'
import Papa from 'papaparse'
import { FileUploader } from 'react-drag-drop-files'
import PropTypes from 'prop-types'

import './style/fileinput.css'

const fileTypes = ['TXT']

const TextFileInput = ({ getDataFromTXT }) => {
	const [file, setFile] = useState('')

	const onChange = (event) => {
		setFile(event.name)
		Papa.parse(event, {
			header: true,
			download: false,
			skipEmptyLines: true,
			complete: (results) => {
				getDataFromTXT(results.data)
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

TextFileInput.propTypes = {
	getDataFromTXT: PropTypes.func.isRequired,
}

export default TextFileInput
