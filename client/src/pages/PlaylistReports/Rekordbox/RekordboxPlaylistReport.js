import React, { Fragment, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Titlebar from '../../../components/shared/Titlebar'
import DataMissing from '../../../components/shared/DataMissing'
import TextFileInput from '../../../components/shared/TextFileInput'

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

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import './style/rekordboxplaylistreport.css'

const RekordboxPlaylistReport = () => {
	const [data, setData] = useState(null)
	const [hasError, setHasError] = useState(false)
	const [isBusy, setIsBusy] = useState(true)
	const isInitialMount = useRef(true)

	const getDataFromTXT = (userData) => {
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
				<TextFileInput getDataFromTXT={getDataFromTXT}/>
				<div>
					{isBusy ? (
						<div className='data-block-two await-data'>
							<PreUploadTextPanel platform={{ name: 'Rekordbox '}}/>
							<DemoFileLink platform={{ name: 'Rekordbox' }}/>
						</div>
					) : hasError ? (
						<div className='data-block-two await-data'>
							<UploadError/>
							<DemoFileLink platform={{ name: 'Rekordbox' }}/>
						</div>
					) : (
						<div>
							<div className='data-block-two'>
								{data.track_data.has_track_data === false ? (
									<DataMissing data={{ value: 'track' }} />
								) : (
									<TrackData trackData={data.track_data} />
								)}
							</div>
							<div className='data-block-two'>
								{data.bpm_data.has_bpm_data === false ? (
									<DataMissing data={{ value: 'bpm' }} />
								) : (
									<BPMData bpmData={data.bpm_data} />
								)}
							</div>
							<div className='data-block-two'>
								{data.key_data.has_key_data === false ? (
									<DataMissing data={{ value: 'key' }} />
								) : (
									<KeyData keyData={data.key_data} />
								)}
							</div>
							<div className='data-block-two'>
								{data.year_data.has_year_data === false ? (
									<DataMissing data={{ value: 'year' }} />
								) : (
									<YearData
										yearData={data.year_data}
										masterTrackLogLength={data.master_track_log.length}
									/>
								)}
							</div>
							<div className='data-block-two'>
								{data.genre_data.has_genre_data === false ? (
									<DataMissing data={{ value: 'genre' }} />
								) : (
									<GenreData genreData={data.genre_data} />
								)}
							</div>
							<div className='data-block-two'>
								{data.bitrate_data.has_bitrate_data === false ? (
									<DataMissing data={{ value: 'bitrate' }} />
								) : (
									<BitrateData
										bitrateData={data.bitrate_data}
										masterTrackLogLength={data.master_track_log.length}
									/>
								)}
							</div>
							<div className='data-block-two'>
								{data.rating_data.has_rating_data === false ? (
									<DataMissing data={{ value: 'rating' }} />
								) : (
									<RatingData ratingData={data.rating_data} />
								)}
							</div>
							<div className='data-block-two'>
								{data.rating_data.has_master_track_log === false ? (
									<DataMissing data={{ value: 'master track log' }} />
								) : (
									<RekordboxMasterTrackLog
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

export default RekordboxPlaylistReport
