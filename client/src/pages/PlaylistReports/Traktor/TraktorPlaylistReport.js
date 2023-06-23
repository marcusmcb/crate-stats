import React, { useState, useRef, useEffect, useCallback } from 'react'
import axios from 'axios'
import Titlebar from '../../../components/shared/Titlebar'
import TextFileInput from '../../../components/shared/TextFileInput'
import DataMissing from '../../../components/shared/DataMissing'

import TrackData from './components/TrackData'
import BPMData from './components/BPMData'
import KeyData from './components/KeyData'
import GenreData from './components/GenreData'
import RatingData from './components/RatingData'
import TraktorMasterTrackLog from './components/TraktorMasterTrackLog'
import UploadError from '../../../components/shared/UploadError'
import DemoFileLink from '../../../components/shared/DemoFileLink'
import PreUploadTextPanel from '../../../components/shared/PreUploadTextPanel'

import './style/traktorplaylistreport.css'

const COMPONENT_MAP = {
	TrackData: TrackData,
	BPMData: BPMData,
	KeyData: KeyData,
	GenreData: GenreData,
	RatingData: RatingData,
	TraktorMasterTrackLog: TraktorMasterTrackLog,
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
	return <DataMissing data={{ value: value }} />
}

const TraktorPlaylistReport = () => {
	const [data, setData] = useState(null)
	const [hasError, setHasError] = useState(false)
	const [isBusy, setIsBusy] = useState(true)
	const isInitialMount = useRef(true)

	const getDataFromTXT = useCallback((userData) => {
		axios
			.post('/sendTraktorFile', userData)
			.then((response) => {
				console.log('* * * * * TRAKTOR RESPONSE FROM EXPRESS ')
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

	const renderDataBlock = (condition, dataType, data) => {
		console.log("CONDITION: ", condition)
		const Component = COMPONENT_MAP[dataType]
		return (
			<div className='data-block-two'>
				{condition ? (
					<ErrorState value={dataType} />
				) : (
					<Component data={data} />
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
					<LoadingState platform='Traktor' />
				) : hasError ? (
					<UploadError platform='Traktor' />
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
							data.genre_data.has_genre_data,
							'GenreData',
							data.genre_data
						)}
						{renderDataBlock(
							data.rating_data.has_rating_data,
							'RatingData',
							data.rating_data
						)}
						{renderDataBlock(
							data.rating_data.has_master_track_log,
							'TraktorMasterTrackLog',
							data.master_track_log
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default TraktorPlaylistReport
