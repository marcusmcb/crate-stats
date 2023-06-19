import React, { Fragment, useState, useRef, useEffect } from 'react'
import axios from 'axios'
import Titlebar from '../../../components/shared/Titlebar'
import DataMissing from '../../../components/shared/DataMissing'
import TextFileInput from '../../../components/shared/TextFileInput'

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

const TraktorPlaylistReport = () => {
	const [data, setData] = useState(null)
	const [hasError, setHasError] = useState(false)
	const [isBusy, setIsBusy] = useState(true)
	const isInitialMount = useRef(true)

	const getDataFromTXT = (userData) => {
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
	}

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false
		} else {
			setIsBusy(false)
		}
	})

	return (
		<Fragment>
			<div className='playlistreport-body'>
				<Titlebar />
				<TextFileInput getDataFromTXT={getDataFromTXT} />
				<div>
					{isBusy ? (
						<div className='data-block await-data'>
							<PreUploadTextPanel platform={{ name: 'Traktor' }} />
							<DemoFileLink platform={{ name: 'Traktor' }} />
						</div>
					) : hasError ? (
						<div className='data-block await-data'>
							<UploadError />
							<DemoFileLink platform={{ name: 'Traktor' }} />
						</div>
					) : (
						<div>
							<div className='data-block-two'>
								{data.track_data.has_track_data ? (
									<DataMissing data={{ value: 'track' }} />
								) : (
									<TrackData trackData={data.track_data} />
								)}
							</div>
							<div className='data-block-two'>
								{data.bpm_data.has_bpm_data ? (
									<DataMissing data={{ value: 'bpm' }} />
								) : (
									<BPMData bpmData={data.bpm_data} />
								)}
							</div>
							<div className='data-block-two'>
								{data.key_data.has_key_data ? (
									<DataMissing data={{ value: 'key' }} />
								) : (
									<KeyData keyData={data.key_data} />
								)}
							</div>
							<div className='data-block-two'>
								{data.genre_data.has_genre_data ? (
									<DataMissing data={{ value: 'genre' }} />
								) : (
									<GenreData genreData={data.genre_data} />
								)}
							</div>
							<div className='data-block-two'>
								{data.rating_data.has_rating_data ? (
									<DataMissing data={{ value: 'rating' }} />
								) : (
									<RatingData ratingData={data.rating_data} />
								)}
							</div>
							<div className='data-block-two'>
								{data.rating_data.has_master_track_log ? (
									<DataMissing data={{ value: 'master track log' }} />
								) : (
									<TraktorMasterTrackLog
										masterTrackLog={data.master_track_log}
									/>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</Fragment>
	)
}

export default TraktorPlaylistReport
