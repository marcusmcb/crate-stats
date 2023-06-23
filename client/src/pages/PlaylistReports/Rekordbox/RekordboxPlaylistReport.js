import React, { useState, useRef, useEffect, useCallback } from 'react'
import axios from 'axios'
import Titlebar from '../../../components/shared/Titlebar'
import TextFileInput from '../../../components/shared/TextFileInput'
import DataMissing from '../../../components/shared/DataMissing'

import BPMData from './components/BPMData'
import GenreData from './components/GenreData'
import KeyData from './components/KeyData'
import RatingData from './components/RatingData'
import TrackData from './components/TrackData'
import YearData from './components/YearData'
import BitrateData from './components/BitrateData'
import RekordboxMasterTrackLog from './components/RekordboxMasterTrackLog'
import UploadError from '../../../components/shared/UploadError'
import DemoFileLink from '../../../components/shared/DemoFileLink'
import PreUploadTextPanel from '../../../components/shared/PreUploadTextPanel'

import './style/rekordboxplaylistreport.css'

const COMPONENT_MAP = {
	TrackData: TrackData,
	BPMData: BPMData,
	KeyData: KeyData,
	GenreData: GenreData,
	RatingData: RatingData,
	YearData: YearData,
	BitrateData: BitrateData,
	RekordboxMasterTrackLog: RekordboxMasterTrackLog,
}

const LoadingState = ({ platform }) => {
	return (
		<div className='data-block await-data'>
			<PreUploadTextPanel platform={{ name: platform }} />
			<DemoFileLink platform={{ name: platform }} />
		</div>
	)
}

const ErrorState = ({ value }) => {
	console.log("-----------------")
	console.log("ERROR STATE VALUE: ")
	console.log(value)
	return <DataMissing data={{ value: value }} />
}

const RekordboxPlaylistReport = () => {
	const [data, setData] = useState(null)
	const [hasError, setHasError] = useState(false)
	const [isBusy, setIsBusy] = useState(true)
	const isInitialMount = useRef(true)

	const getDataFromTXT = useCallback((userData) => {
		axios
			.post('/sendRekordboxFile', userData)
			.then((response) => {
				console.log('* * * * * * * * * RESPONSE FROM EXPRESS ')
				console.log(response.data)
				setData(response.data)
			})
			.catch((error) => {
				console.log('Error fetching data: ', error)
				setHasError(true)
			})
	}, [])

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false
		} else {
			setIsBusy(false)
		}
	}, [data])

	const renderDataBlock = (condition, dataType, data, additionalProps = {}) => {
		console.log('--------------')
		console.log("RENDER CHECK: ")
		console.log(condition)
		console.log(dataType)
		console.log(data)
		const Component = COMPONENT_MAP[dataType]
		return (
			<div className='data-block-two'>
				{condition === false ? (
					<ErrorState value={dataType.toLowerCase().slice(0, -4)} />
				) : (
					<Component data={data} {...additionalProps} />
				)}
			</div>
		)
	}

	return (
		<div className='playlistreport-body'>
			<Titlebar />
			<TextFileInput getDataFromTXT={getDataFromTXT} />
			<div>
				{isBusy ? (
					<LoadingState platform='Rekordbox' />
				) : hasError ? (
					<UploadError platform='Rekordbox' />
				) : (
					<div>
						{renderDataBlock(
							data.track_data.has_track_data,
							'TrackData',
							data.track_data
						)}
						{renderDataBlock(
							data.bpm_data.has_bpm_data,
							'BPMData',
							data.bpm_data
						)}
						{renderDataBlock(
							data.key_data.has_key_data,
							'KeyData',
							data.key_data
						)}
						{renderDataBlock(
							data.year_data.has_year_data,
							'YearData',
							data.year_data,
							{ masterTrackLogLength: data.master_track_log.length }
						)}
						{renderDataBlock(
							data.genre_data.has_genre_data,
							'GenreData',
							data.genre_data
						)}
						{renderDataBlock(
							data.bitrate_data.has_bitrate_data,
							'BitrateData',
							data.bitrate_data,
							{ masterTrackLogLength: data.master_track_log.length }
						)}
						{renderDataBlock(
							data.rating_data.has_rating_data,
							'RatingData',
							data.rating_data
						)}
						{renderDataBlock(
							data.rating_data.has_master_track_log,
							'RekordboxMasterTrackLog',
							data.master_track_log
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default RekordboxPlaylistReport
