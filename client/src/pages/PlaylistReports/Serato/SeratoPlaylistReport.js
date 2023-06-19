import React, { Fragment, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Titlebar from '../../../components/shared/Titlebar'
import DataMissing from '../../../components/shared/DataMissing'
import CSVFileInput from '../../../components/shared/CSVFileInput'

import TrackData from './components/TrackData/TrackData'
// import TrackData2 from './components/TrackData/TrackData2'
import BPMData from './components/BPMData'
import YearData from './components/YearData'
import GenreData from './components/GenreData'
import KeyData from './components/KeyData'
import DoublesData from './components/DoublesData'
import DeckData from './components/DeckData'
import AlbumData from './components/AlbumData'
import ArtistData from './components/ArtistData'
import MasterTracklog from './components/MasterTracklog'
import PlaylistData from './components/PlaylistData'
import UploadError from '../../../components/shared/UploadError'
import DemoFileLink from '../../../components/shared/DemoFileLink'
import PreUploadTextPanel from '../../../components/shared/PreUploadTextPanel'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import './style/seratoplaylistreport.css'

const SeratoPlaylistReport = () => {
	const [data, setData] = useState(null)
	const [hasError, setHasError] = useState(false)
	const [isBusy, setIsBusy] = useState(true)
	const isInitialMount = useRef(true)

	const getDataFromCSV = (userData) => {
		axios
			.post('/sendSeratoFile', userData)
			.then((response) => {
				console.log('* * * * * * * * * RESPONSE FROM EXPRESS ')
				console.log(response.data)
				// console.log(formatDate(response.data.date_created))
				setData(response.data)
			})
			.catch((error) => {
				console.log('Error fetching data: ', error)
				setHasError(true)
			})
	}

	const addPlaylistToCollection = (data) => {
		axios.post('/addPlaylist', data).then((response) => {
			console.log(response)
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
				<CSVFileInput getDataFromCSV={getDataFromCSV} />
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '15px',
						marginBottom: '15px',
					}}
				>
					{data ? (
						<Button
							sx={{ backgroundColor: 'rgba(54, 72, 69, 255)' }}
							variant='contained'
							onClick={async () => {
								await addPlaylistToCollection(data)
							}}
						>
							Add To Collection
						</Button>
					) : (
						<></>
					)}
				</div>
				<div>
					{isBusy === true ? (
						<div className='data-block await-data'>
							<PreUploadTextPanel platform={{ name: 'Serato' }} />
							<DemoFileLink platform={{ name: 'Serato' }} />
						</div>
					) : hasError ? (
						<div className='data-block await-data'>
							<UploadError />
							<DemoFileLink platform={{ name: 'Serato' }} />
						</div>
					) : (
						<div>
							{/* <div className='data-block'>
              <Summary/>
            </div> */}
							<div className='data-block'>
								{data.playlist_data.has_playlist_data === false ? (
									<DataMissing data={{ value: 'playlist' }} />
								) : (
									<PlaylistData playlistData={data.playlist_data} />
								)}
							</div>
							<div className='data-block'>
								{data.track_data.has_track_data === false ? (
									<DataMissing data={{ value: 'track' }} />
								) : (
									<TrackData trackData={data.track_data} />
								)}
							</div>
							{/* <div>
								{data.track_data.has_track_data === false ? (
									<DataMissing data={{ value: 'track' }} />
								) : (
									<TrackData2
										trackData={data.track_data}
										setStartTime={data.playlist_data.start_time}
										setEndTime={data.playlist_data.end_time}
									/>
								)}
							</div> */}
							<div className='data-block'>
								{data.bpm_data.has_bpm_data === false ? (
									<DataMissing data={{ value: 'bpm' }} />
								) : (
									<BPMData bpmData={data.bpm_data} />
								)}
							</div>
							<div className='data-block'>
								{data.year_data.has_year_data === false ? (
									<div>
										<DataMissing data={{ value: 'year' }} />
									</div>
								) : (
									<YearData
										yearData={data.year_data}
										masterTrackLogLength={data.master_track_log.length}
									/>
								)}
							</div>
							<div className='data-block'>
								{data.genre_data.has_genre_data === false ? (
									<DataMissing data={{ value: 'genre' }} />
								) : (
									<GenreData genreData={data.genre_data} />
								)}
							</div>
							<div className='data-block'>
								{data.key_data.has_key_data === false ? (
									<div>
										<DataMissing data={{ value: 'key' }} />
									</div>
								) : (
									<KeyData keyData={data.key_data} />
								)}
							</div>
							<div className='data-block'>
								{data.doubles_data.has_doubles_data === false ? (
									<div>
										<DataMissing data={{ value: 'doubles' }} />
									</div>
								) : (
									<DoublesData doublesData={data.doubles_data} />
								)}
							</div>
							<div className='data-block'>
								{data.deck_data.has_deck_data === false ? (
									<DataMissing data={{ value: 'deck' }} />
								) : (
									<DeckData deckData={data.deck_data} />
								)}
							</div>
							<div className='data-block'>
								{data.album_data.has_album_data === false ? (
									<DataMissing data={{ value: 'album' }} />
								) : (
									<AlbumData
										albumData={data.album_data}
										masterTrackLogLength={data.master_track_log.length}
									/>
								)}
							</div>
							<div className='data-block'>
								{data.artist_data.has_artist_data === false ? (
									<DataMissing data={{ value: 'artist' }} />
								) : (
									<ArtistData artistData={data.artist_data} />
								)}
							</div>
							<div className='data-block'>
								{!data.master_track_log ? (
									<DataMissing data={{ value: 'tracklog' }} />
								) : (
									<MasterTracklog masterTrackLog={data.master_track_log} />
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</Fragment>
	)
}

export default SeratoPlaylistReport
