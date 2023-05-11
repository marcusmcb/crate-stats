import React, { Fragment, useState, useEffect } from 'react'
import Titlebar from '../../components/shared/Titlebar'

import DataMissing from '../../components/shared/DataMissing'
import PlaylistData from '../PlaylistReports/Serato/components/PlaylistData'

import TrackData from '../PlaylistReports/Serato/components/TrackData/TrackData'

import BPMData from '../PlaylistReports/Serato/components/BPMData'
import YearData from '../PlaylistReports/Serato/components/YearData'
import GenreData from '../PlaylistReports/Serato/components/GenreData'
import KeyData from '../PlaylistReports/Serato/components/KeyData'
import DoublesData from '../PlaylistReports/Serato/components/DoublesData'
import DeckData from '../PlaylistReports/Serato/components/DeckData'
import AlbumData from '../PlaylistReports/Serato/components/AlbumData'
import ArtistData from '../PlaylistReports/Serato/components/ArtistData'
import MasterTracklog from '../PlaylistReports/Serato/components/MasterTracklog'

import axios from 'axios'

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'

import './playlists.css'

const Playlists = () => {
	const [userPlaylists, setUserPlaylists] = useState([])
	const [fileSelected, setFileSelected] = useState(null)
	const [fileIndex, setFileIndex] = useState()
	const [hasData, setHasData] = useState(false)

	useEffect(() => {
		const getUserPlaylists = () => {
			axios.post('/getPlaylists').then((response) => {
				console.log(response.data)
				setUserPlaylists(response.data)
				setHasData(true)
			})
		}
		getUserPlaylists()
	}, [])

	return (
		<Fragment>
			<div className='playlist-pagebody'>
				<Titlebar />
				<Stack
					direction='row'
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				></Stack>
				<Stack direction={{ sm: 'row', xs: 'column' }}>
					<CardContent
						style={{
							width: '20%',
						}}
					>
						{hasData ? (
							<div style={{ marginTop: '10px' }}>
								<div
									style={{
										backgroundColor: 'white',
										padding: '10px',
										borderRadius: '5px',
										marginBottom: '10px',
										border: '1px solid black',
									}}
								>
									<Typography
										style={{
											fontWeight: '600',
										}}
									>
										Playlist Collection
									</Typography>
								</div>
								{userPlaylists.map((item, i) => (
									<div
										key={i}
										onClick={() => {
											setFileSelected(item)
											setFileIndex(i)
											console.log('ITEM: ', item.data.playlist_data.title)
										}}
										style={{
											backgroundColor:
												fileIndex === i ? '#c5e1a5' : 'rgba(54, 72, 69, 255)',
											color:
												fileIndex === i ? 'rgba(54, 72, 69, 255)' : 'white',
											padding: '10px',
											borderRadius: '5px',
											marginBottom: '2px',
											border: fileIndex === i ? '1px solid black' : 'none',
										}}
									>
										<Typography
											style={{ fontWeight: fileIndex === i ? '600' : '400' }}
										>
											{item.data.playlist_data.title}
										</Typography>
									</div>
								))}
							</div>
						) : (
							<div>Awaiting Data...</div>
						)}
					</CardContent>
					<CardContent
						style={{
							width: '80%',
						}}
					>
						{fileSelected === null ? (
							<Typography
								style={{
									display: 'flex',
									justifyContent: 'center',
									fontSize: '25px',
									marginTop: '50px',
								}}
							>
								Select a file to view that playlist's Crate Stats report
							</Typography>
						) : (
							<div>
								<div className='data-block'>
									{fileSelected.data.playlist_data.has_playlist_data ===
									false ? (
										<DataMissing data={{ value: 'playlist' }} />
									) : (
										<PlaylistData
											playlistData={fileSelected.data.playlist_data}
										/>
									)}
								</div>
								<div className='data-block'>
									{fileSelected.data.track_data.has_track_data === false ? (
										<DataMissing data={{ value: 'track' }} />
									) : (
										<TrackData trackData={fileSelected.data.track_data} />
									)}
								</div>
								<div className='data-block'>
									{fileSelected.data.bpm_data.has_bpm_data === false ? (
										<DataMissing data={{ value: 'bpm' }} />
									) : (
										<BPMData bpmData={fileSelected.data.bpm_data} />
									)}
								</div>
								<div className='data-block'>
									{fileSelected.data.year_data.has_year_data === false ? (
										<div>
											<DataMissing data={{ value: 'year' }} />
										</div>
									) : (
										<YearData
											yearData={fileSelected.data.year_data}
											masterTrackLogLength={
												fileSelected.data.master_track_log.length
											}
										/>
									)}
								</div>
								<div className='data-block'>
									{fileSelected.data.genre_data.has_genre_data === false ? (
										<DataMissing data={{ value: 'genre' }} />
									) : (
										<GenreData genreData={fileSelected.data.genre_data} />
									)}
								</div>
								<div className='data-block'>
									{fileSelected.data.key_data.has_key_data === false ? (
										<div>
											<DataMissing data={{ value: 'key' }} />
										</div>
									) : (
										<KeyData keyData={fileSelected.data.key_data} />
									)}
								</div>
								<div className='data-block'>
									{fileSelected.data.doubles_data.has_doubles_data === false ? (
										<div>
											<DataMissing data={{ value: 'doubles' }} />
										</div>
									) : (
										<DoublesData doublesData={fileSelected.data.doubles_data} />
									)}
								</div>
								<div className='data-block'>
									{fileSelected.data.deck_data.has_deck_data === false ? (
										<DataMissing data={{ value: 'deck' }} />
									) : (
										<DeckData deckData={fileSelected.data.deck_data} />
									)}
								</div>
								<div className='data-block'>
									{fileSelected.data.album_data.has_album_data === false ? (
										<DataMissing data={{ value: 'album' }} />
									) : (
										<AlbumData
											albumData={fileSelected.data.album_data}
											masterTrackLogLength={
												fileSelected.data.master_track_log.length
											}
										/>
									)}
								</div>
								<div className='data-block'>
									{fileSelected.data.artist_data.has_artist_data === false ? (
										<DataMissing data={{ value: 'artist' }} />
									) : (
										<ArtistData artistData={fileSelected.data.artist_data} />
									)}
								</div>
								<div className='data-block'>
									{!fileSelected.data.master_track_log ? (
										<DataMissing data={{ value: 'tracklog' }} />
									) : (
										<MasterTracklog data={fileSelected.data.master_track_log} />
									)}
								</div>
							</div>
						)}
					</CardContent>
				</Stack>
			</div>
		</Fragment>
	)
}

export default Playlists
