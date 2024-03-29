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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import QueueMusicOutlinedIcon from '@mui/icons-material/QueueMusicOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'

import './style/playlists.css'

const Playlists = () => {
	const [userPlaylists, setUserPlaylists] = useState([])
	const [fileSelected, setFileSelected] = useState(null)
	const [fileIndex, setFileIndex] = useState()
	const [hasData, setHasData] = useState(false)

	const playlistCollections = [
		{ type: 'bars & clubs', count: 16 },
		{ type: 'weddings', count: 8 },
		{ type: 'corporate', count: 13 },
	]

	const deleteUserPlaylist = async (fileID) => {
		console.log(fileID)
		axios.post('/deletePlaylist', { file_id: fileID }).then((response) => {
			console.log(response)
		})
	}

	const getUserPlaylists = async () => {
		axios.post('/getPlaylists').then((response) => {
			console.log(response.data)
			setUserPlaylists(response.data)
			setHasData(true)
		})
	}

	const formatDate = (timestamp) => {
		let date = new Date(timestamp)
		let day = String(date.getDate()).padStart(2, '0')
		let month = String(date.getMonth() + 1) // Months are 0-11, so we need to add 1
		let year = String(date.getFullYear()).substr(2)
		return `${month}/${day}/${year}`
	}

	useEffect(() => {
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
										Playlists ({userPlaylists.length} total)
									</Typography>
								</div>

								<List
									sx={{
										bgColor: 'background.paper',
									}}
								>
									{userPlaylists.map((item, i) => (
										<ListItem
											style={{
												border: fileIndex === i ? '.5px solid black' : 'none',
												backgroundColor: fileIndex === i ? '#c5e1a5' : 'white',
											}}
											key={i}
											onClick={() => {
												setFileSelected(item)
												setFileIndex(i)
												console.log('ITEM: ', item)
											}}
										>
											<ListItemAvatar>
												<Avatar>
													<QueueMusicOutlinedIcon />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary={
													<span
														style={{
															fontWeight: fileIndex === i ? '600' : '400',
														}}
													>
														{item.data.playlist_data.title}
													</span>
												}
												secondary={
													item.data.date_created
														? `created: ${formatDate(item.data.date_created)}`
														: ''
												}
												style={{
													padding: '5px',
													borderRadius: '5px',
													marginBottom: '2px',
													fontWeight: fileIndex === i ? '600' : '400',
												}}
											/>

											<DeleteOutlineIcon
												onClick={async () => {
													await deleteUserPlaylist(item.id)
													await getUserPlaylists()
												}}
											/>
										</ListItem>
									))}
								</List>								
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
										Collections ({playlistCollections.length} total)
									</Typography>
								</div>
								{playlistCollections.map((item, i) => (
									<ListItem key={i}>
										<ListItemAvatar>
											<Avatar>
												<FolderOutlinedIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={<span>{item.type}</span>}
											secondary={`${item.count} playlists`}
											style={{
												padding: '5px',
												borderRadius: '5px',
												marginBottom: '2px',
												fontWeight: fileIndex === i ? '600' : '400',
											}}
										/>

										<DeleteOutlineIcon />
									</ListItem>
								))}
							</div>
						) : (
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
									Awaiting data...
								</Typography>
							</div>
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
										<MasterTracklog
											masterTrackLog={fileSelected.data.master_track_log}
										/>
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
