import React, { useState, Fragment } from 'react'
import axios from 'axios'

import Titlebar from '../../components/shared/Titlebar'
import HoursText from '../../components/shared/text_spans/hoursText'
import HourText from '../../components/shared/text_spans/hourText'
import MinutesText from '../../components/shared/text_spans/minutesText'
import MinuteText from '../../components/shared/text_spans/minuteText'
import SecondsText from '../../components/shared/text_spans/secondsText'
import SecondText from '../../components/shared/text_spans/secondText'

import { Divider, Input } from 'semantic-ui-react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { OutlinedInput } from '@mui/material'

import parseDay from '../../scripts/parseDay'

import './seratolivereport.css'

const SeratoLiveReport = () => {
	const [isData, setIsData] = useState(false)
	const [isPrivate, setIsPrivate] = useState(false)
	const [isBusy, setIsBusy] = useState(false)
	const [url, setUrl] = useState('')
	const [displayName, setDisplayName] = useState('')
	const [playlistDate, setPlaylistDate] = useState([])
	const [playlistData, setPlaylistData] = useState({})
	const [playlistName, setPlaylistName] = useState('')
	const [trackLengthArray, setTrackLengthArray] = useState([])
	const [searchQuery, setSearchQuery] = useState('')

	const getSeratoLiveReport = async () => {
		setIsBusy(true)
		await axios
			.post('/liveplaylist', { url: url })
			.then((response) => {
				// check if playlist url is set to private
				if (response.data === '') {
					setIsPrivate(true)
					setIsBusy(false)
				} else {
					setPlaylistData(response.data)
					console.log(response.data)
					let userName = response.data.dj_name
					let dateValue = response.data.playlist_date
					let displayDay = parseDay(response.data.playlist_date)
					// check for playlist title
					if (
						response.data.playlist_title.charAt(
							response.data.playlist_title.length - 5
						) === '/'
					) {
						setPlaylistName(response.data.playlist_title)
					} else {
						setPlaylistName(response.data.playlist_title)
					}
					setPlaylistDate([dateValue, displayDay])
					setDisplayName(userName)
					setTrackLengthArray(response.data.track_length_array)
					setIsData(true)
					setIsBusy(false)
				}
			})
			.catch((error) => {
				console.log(error)
			})
		// setUrl('')
	}

	const checkIfLivePlaylist = (url) => {
		return url.includes('/live')
	}

	const handleChange = (e) => {
		setIsData(false)
		setIsPrivate(false)
		setUrl(e.target.value)
	}

	const getSeratoLiveUpdateReport = () => {
		setInterval(() => {
			console.log('-- updated --')
			getSeratoLiveReport()
		}, 5000)
	}

	const handleSendReport = (e) => {
		e.preventDefault()
		checkIfLivePlaylist(url)
			? getSeratoLiveUpdateReport()
			: getSeratoLiveReport()
		console.log(checkIfLivePlaylist(url))
		getSeratoLiveReport()
	}

	let filteredTrackLog = []
	if (playlistData && playlistData.track_log) {
		filteredTrackLog = playlistData.track_log.filter((item) => {
			return item.trackId.toLowerCase().includes(searchQuery.toLowerCase())
		})
	}

	const convertTime = (timestamp) => {
		let date = new Date(timestamp)
		let hours = date.getUTCHours()
		let minutes = date.getUTCMinutes()
		let hours12 = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours
		let minutesString = minutes < 10 ? '0' + minutes : minutes
		let ampm = hours >= 12 ? 'PM' : 'AM'
		return hours12 + ':' + minutesString + ' ' + ampm
	}

	function formatMillisToMinutesSeconds(millis) {
		let minutes = Math.floor(millis / 60000)
		let seconds = ((millis % 60000) / 1000).toFixed(0)
		return (
			(minutes < 10 ? '0' : '') +
			minutes +
			':' +
			(seconds < 10 ? '0' : '') +
			seconds
		)
	}

	console.log(playlistData)

	return (
		<div className='pagebody'>
			<Fragment>
				<Titlebar />
				<Divider />
				<Box sx={{ flexGrow: 1, textAlign: 'center' }}>
					<Grid item>
						<Card sx={{ midWidth: 275, boxShadow: 'none' }}>
							<CardContent>
								<Grid>
									<Typography sx={{ fontWeight: 500, fontSize: 16 }}>
										Enter your public Serato Live Playlist URL below
									</Typography>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				</Box>
				<Box component='form' sx={{ flexGrow: 1, textAlign: 'center' }}>
					<FormControl sx={{ width: '40vw' }}>
						<OutlinedInput
							placeholder='your URL goes here'
							value={url}
							onChange={handleChange}
						/>
						<Button
							type='submit'
							variant='outlined'
							onClick={handleSendReport}
							sx={{
								maxWidth: '100px',
								marginTop: '20px',
								marginBottom: '10px',
								alignSelf: 'center',
								borderColor: 'black',
								color: 'black',
							}}
						>
							Get Stats
						</Button>
					</FormControl>
				</Box>
				{isData ? (
					<div className='data-block'>
						<div className='livereport-main-panel'>
							<div className='livereport-title-row'>
								CrateStats Live - {playlistData.dj_name}
							</div>
							<div className='livereport-stat-row'>
								<span className='livereport-span-label'>Set Date: </span>
								<span className='livereport-span-text'>
									{playlistDate[1]} {playlistDate[0]}
								</span>
							</div>
							<div className='livereport-stat-row'>
								<span className='livereport-span-label'>Start Time: </span>
								<span className='livereport-span-text'>
									{playlistData.set_start_time}
								</span>
							</div>
							<Divider />
							<div className='livereport-multistat-row'>
								<div>
									<div className='livereport-span-label'>Set Length:</div>
									<div className='livereport-span-text'>
										{playlistData.set_length.hours > 1 ? (
											<>
												{playlistData.set_length.hours} <HoursText />,{' '}
											</>
										) : playlistData.set_length.hours === 1 ? (
											<>
												{playlistData.set_length.hours} <HourText />,{' '}
											</>
										) : (
											<></>
										)}
										{playlistData.set_length.minutes > 1 ? (
											<>
												{playlistData.set_length.minutes} <MinutesText />
											</>
										) : playlistData.set_length.minutes === 1 ? (
											<>
												{playlistData.set_length.minutes} <MinuteText />
											</>
										) : (
											<></>
										)}

										{playlistData.set_length.hours === 0 ? (
											playlistData.set_length.seconds > 1 ? (
												<>
													, {playlistData.set_length.seconds} <SecondsText />
												</>
											) : playlistData.set_length.seconds === 1 ? (
												<>
													, {playlistData.set_length.seconds} <SecondText />
												</>
											) : (
												<></>
											)
										) : (
											<></>
										)}
									</div>
								</div>
								<div>
									<div className='livereport-span-label'>
										Total Tracks Played:{' '}
									</div>
									<div className='livereport-span-text'>
										{playlistData.track_log.length}
									</div>
								</div>
								<div>
									<div className='livereport-span-label'>
										Average Track Length:{' '}
									</div>
									<div className='livereport-span-text'>
										{playlistData.average_track_length}
									</div>
								</div>
							</div>
							<Divider />
							<div className='livereport-stat-row'>
								<span className='livereport-span-label'>Current Track:</span>{' '}
								<span className='livereport-span-text'>
									{
										playlistData.track_log[playlistData.track_log.length - 1]
											.trackId
									}
								</span>
							</div>
							<div className='livereport-stat-row'>
								<span className='livereport-span-label'>Previous Track:</span>{' '}
								<span className='livereport-span-text'>
									{
										playlistData.track_log[playlistData.track_log.length - 2]
											.trackId
									}
								</span>
							</div>
							<Divider />
							<div className='livereport-stat-row'>
								<span className='livereport-span-label'>Shortest Track:</span>
								<span className='livereport-span-text'>
									{playlistData.shortest_track.name} -{' '}
									{playlistData.shortest_track.length_value}
								</span>
							</div>
							<div className='livereport-stat-row'>
								<span className='livereport-span-label'>Longest Track:</span>
								<span className='livereport-span-text'>
									{playlistData.longest_track.name} -{' '}
									{playlistData.longest_track.length_value}
								</span>
							</div>
							<Divider />
							<div className='livereport-stat-row'>
								{playlistData.doubles_played.length >= 1 ? (
									<>
										<div className='livereport-span-label'>
											Doubles Played: {playlistData.doubles_played.length}
										</div>
										{playlistData.doubles_played.map((item, i) => (
											<div className='livereport-span-text' key={i}>
												{item.name}
											</div>
										))}
									</>
								) : (
									<></>
								)}
							</div>
							<Divider />
							<Box sx={{ flexGrow: 1 }}>
								<Grid container spacing={1}>
									<Grid item xs={12} md={12} sm={12} lg={12}>
										<Card sx={{ minWidth: 275 }}>
											<CardContent>
												<Grid container spacing={2}>
													<Grid item>
														<div className='livereport-search-label'>
															tracks played:
														</div>
														{/* Search input field */}
														<Input
															variant='outlined'
															value={searchQuery}
															onChange={(e) => setSearchQuery(e.target.value)}
															placeholder='Search Tracks Played'
															style={{
																marginTop: '5px',
																border: '.1em solid black',
															}}
														/>
													</Grid>
												</Grid>
												<Divider />
												<Grid container spacing={2}>
													<Grid item>
														{filteredTrackLog.length > 0 ? (
															filteredTrackLog.map((item, i) => (
																<div
																	onClick={() => {
																		console.log(trackLengthArray[i])
																	}}
																	key={i}
																>
																	<Typography component='div'>
																		<span className='livereport-tracklog-row'>
																			{i + 1}. {item.trackId}
																		</span>
																	</Typography>
																	<Typography>
																		<span className='livereport-tracklog-label'>
																			played at: {item.timestamp.slice(0, -6)}
																		</span>
																	</Typography>
																	<Typography
																		// style={{
																		// 	marginBottom: '10px',
																		// 	color:
																		// 		trackLengthArray[i] ===
																		// 		Math.min(...trackLengthArray)
																		// 			? 'green'
																		// 			: 'black',
																		// 	fontWeight:
																		// 		trackLengthArray[i] ===
																		// 		Math.min(...trackLengthArray)
																		// 			? '600'
																		// 			: '400',
																		// }}
																		style={{
																			marginBottom: '10px',
																		}}
																	>
																		<span className='livereport-tracklog-label'>
																			length:{' '}
																			{formatMillisToMinutesSeconds(
																				trackLengthArray[i]
																			)}
																		</span>
																	</Typography>
																</div>
															))
														) : (
															<Typography>
																Sorry, but we didn't find "{searchQuery}" in
																this playlist.
															</Typography>
														)}
													</Grid>
												</Grid>
											</CardContent>
										</Card>
									</Grid>
								</Grid>
							</Box>
						</div>
					</div>
				) : isPrivate ? (
					<Box sx={{ flexGrow: 1, textAlign: 'center' }}>
						<Grid item>
							<Card sx={{ midWidth: 275, boxShadow: 'none' }}>
								<CardContent>
									<Grid>
										<Typography sx={{ fontWeight: 500, fontSize: 16 }}>
											Either this playlist is set to private or the URL you've
											entered is invalid.
										</Typography>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					</Box>
				) : isBusy ? (
					<Box sx={{ flexGrow: 1, textAlign: 'center' }}>
						<Grid item>
							<Card sx={{ midWidth: 275, boxShadow: 'none' }}>
								<CardContent>
									<Grid>
										<Typography sx={{ fontWeight: 500, fontSize: 16 }}>
											Awaiting data...
										</Typography>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					</Box>
				) : (
					<></>
				)}
			</Fragment>
		</div>
	)
}

export default SeratoLiveReport

// add color scaling on stat values to display comparison to aggregate (over/under)
// add url validation to input field
