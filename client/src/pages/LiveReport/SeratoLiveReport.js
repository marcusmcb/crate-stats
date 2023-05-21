import React, { useState, Fragment } from 'react'
import axios from 'axios'

import { Divider, Input } from 'semantic-ui-react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { OutlinedInput } from '@mui/material'

import HoursText from '../../components/shared/text_spans/hoursText'
import HourText from '../../components/shared/text_spans/hourText'
import MinutesText from '../../components/shared/text_spans/minutesText'
import MinuteText from '../../components/shared/text_spans/minuteText'
import SecondsText from '../../components/shared/text_spans/secondsText'
import SecondText from '../../components/shared/text_spans/secondText'

import parseDay from '../../scripts/parseDay'
// import parseDisplayName from '../../scripts/parseDisplayName'
import Titlebar from '../../components/shared/Titlebar'
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

	const getSeratoLiveReport = async (e) => {
		e.preventDefault()
		setIsBusy(true)
		await axios
			.post('/liveplaylist', { url: url })
			.then((response) => {
				// check if playlist url is set to private
				if (response.data === '') {
					setIsPrivate(true)
					setIsBusy(false)
				} else {
					// console.log(response.data)
					setPlaylistData(response.data)
					console.log(response.data)
					let userName = response.data.djName
					let dateValue = response.data.playlistDate
					let displayDay = parseDay(response.data.playlistDate)
					// check for playlist title
					if (
						response.data.playlistTitle.charAt(
							response.data.playlistTitle.length - 5
						) === '/'
					) {
						setPlaylistName(response.data.playlistTitle)
					} else {
						setPlaylistName(response.data.playlistTitle)
					}
					setPlaylistDate([dateValue, displayDay])
					setDisplayName(userName)
					setTrackLengthArray(response.data.trackLengthArray)
					setIsData(true)
					setIsBusy(false)
				}
			})
			.catch((error) => {
				console.log(error)
			})
		// setUrl('')
	}

	const handleChange = (e) => {
		setIsData(false)
		setIsPrivate(false)
		setUrl(e.target.value)
	}

	let filteredTrackLog = []
	if (playlistData && playlistData.trackLog) {
		filteredTrackLog = playlistData.trackLog.filter((item) => {
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
							onClick={getSeratoLiveReport}
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
						<Typography
							sx={{ fontSize: 22 }}
							fontWeight={500}
							color='#c5e1a5'
							gutterBottom
						>
							{displayName}
						</Typography>
						<Box sx={{ flexGrow: 1 }}>
							<Grid container spacing={1}>
								<Grid item xs={12} md={6} sm={12} lg={6}>
									<Card sx={{ minWidth: 275 }}>
										<CardContent>
											{/* crate stats card */}
											<Typography>crate stats for:</Typography>
											<Typography
												variant='h4'
												component='div'
												fontWeight={500}
												sx={{ color: '#558b2f' }}
											>
												{playlistName === '' ? (
													<span></span>
												) : (
													<span>{playlistName}</span>
												)}
											</Typography>
											<Typography
												sx={{ marginTop: '10px' }}
												color='text.secondary'
											>
												set date:
											</Typography>
											<Typography variant='h5' component='div'>
												{playlistDate[1]} {playlistDate[0]}
											</Typography>
										</CardContent>
									</Card>
								</Grid>
								<Grid item xs={12} md={6} sm={12} lg={6}>
									<Card sx={{ minWidth: 275 }}>
										<CardContent>
											{/* crate stats card */}
											<Typography>set length:</Typography>
											<Typography
												variant='h4'
												component='div'
												fontWeight={500}
												sx={{ color: '#558b2f' }}
											>
												<span>
													{playlistData.setLength.hours > 1 ? (
														<>
															{playlistData.setLength.hours} <HoursText />,{' '}
														</>
													) : playlistData.setLength.hours === 1 ? (
														<>
															{playlistData.setLength.hours} <HourText />,{' '}
														</>
													) : (
														<></>
													)}
													{playlistData.setLength.minutes > 1 ? (
														<>
															{playlistData.setLength.minutes} <MinutesText />
														</>
													) : playlistData.setLength.minutes === 1 ? (
														<>
															{playlistData.setLength.minutes} <MinuteText />
														</>
													) : (
														<></>
													)}

													{playlistData.setLength.hours === 0 ? (
														playlistData.setLength.seconds > 1 ? (
															<>
																,{' '}{playlistData.setLength.seconds}{' '}
																<SecondsText />
															</>
														) : playlistData.setLength.seconds === 1 ? (
															<>
																,{' '}{playlistData.setLength.seconds}{' '}
																<SecondText />
															</>
														) : (
															<></>
														)
													) : (
														<></>
													)}
												</span>
											</Typography>
											<Typography
												sx={{ marginTop: '10px' }}
												color='text.secondary'
											>
												start time:
											</Typography>
											<Typography variant='h5' component='div'>
												{playlistData.setStartTime}
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							</Grid>
						</Box>
						<Box sx={{ flexGrow: 1, marginTop: '15px' }}>
							<Grid item md={5} sm={12}>
								<Card sx={{ minWidth: 275 }}>
									<CardContent>
										<Grid container spacing={2}>
											<Grid item mt={1.5}>
												<Typography sx={{ fontSize: 16, fontWeight: '500' }}>
													total tracks played:
												</Typography>
											</Grid>
											<Grid item>
												<Typography
													variant='h3'
													component='div'
													fontWeight={500}
													sx={{ color: '#558b2f' }}
												>
													{playlistData.totalTracksPlayed}
												</Typography>
											</Grid>
											<Grid item mt={1.5}>
												<Typography sx={{ fontSize: 16, fontWeight: '500' }}>
													average track length:
												</Typography>
											</Grid>
											<Grid item>
												<Typography
													variant='h3'
													component='div'
													fontWeight={500}
													sx={{ color: '#558b2f' }}
												>
													{playlistData.avgTrackLength.lengthValue}
												</Typography>
											</Grid>
										</Grid>
										<Divider />
										<Grid container sx={{ marginTop: 1 }}>
											<Grid item>
												<div style={{ display: 'flex', flexDirection: 'row' }}>
													<div
														style={{
															display: 'flex',
															flexDirection: 'column',
															marginLeft: '1em',
															marginRight: '1em',
														}}
													>
														<Typography sx={{ fontSize: 16 }}>
															shortest track:
														</Typography>
														<Typography
															variant='h5'
															component='div'
															fontWeight={500}
														>
															{playlistData.shortestTrack.name}
														</Typography>
														<Typography
															variant='h5'
															component='div'
															fontWeight={500}
															sx={{ color: '#558b2f' }}
														>
															({playlistData.shortestTrack.lengthValue})
														</Typography>
														<Typography sx={{ fontSize: 14, marginTop: 1 }}>
															- played @{' '}
															<span
																style={{ color: '#1b5e20', fontWeight: '500' }}
															></span>
														</Typography>
													</div>
													<div
														style={{
															display: 'flex',
															flexDirection: 'column',
															marginLeft: '1em',
															marginRight: '1em',
														}}
													>
														<Typography sx={{ fontSize: 16 }}>
															longest track:
														</Typography>
														<Typography
															variant='h5'
															component='div'
															fontWeight={500}
														>
															{playlistData.longestTrack.name}
														</Typography>
														<Typography
															variant='h5'
															component='div'
															fontWeight={500}
															sx={{ color: '#558b2f' }}
														>
															({playlistData.longestTrack.lengthValue})
														</Typography>
														<Typography sx={{ fontSize: 14, marginTop: 1 }}>
															- played @{' '}
															<span
																style={{ color: '#1b5e20', fontWeight: '500' }}
															></span>
														</Typography>
													</div>
												</div>
											</Grid>
										</Grid>
									</CardContent>
								</Card>
							</Grid>
						</Box>
						<Box sx={{ flexGrow: 1 }}>
							<Grid container spacing={1} mt={1}>
								<Grid item xs={12} md={12} sm={12} lg={12}>
									<Card sx={{ minWidth: 275 }}>
										<CardContent>
											<Grid container spacing={2}>
												<Grid item mt={1}>
													<Typography fontWeight={500}>
														doubles detected:
													</Typography>
												</Grid>
												<Grid item>
													<Typography
														variant='h4'
														component='div'
														fontWeight={500}
														sx={{ color: '#558b2f' }}
													>
														{playlistData.doublesPlayed.length >= 1 ? (
															<div>{playlistData.doublesPlayed.length}</div>
														) : (
															<div>No doubles detected in this set</div>
														)}
													</Typography>
												</Grid>
											</Grid>
											<Divider />
											<Grid container spacing={2}>
												<Grid item>
													{playlistData.doublesPlayed.map((item, i) => (
														<Typography
															key={i}
															component='div'
															fontWeight={500}
															sx={{ fontSize: 16 }}
														>
															{item.name}
														</Typography>
													))}
												</Grid>
											</Grid>
										</CardContent>
									</Card>
								</Grid>
							</Grid>
						</Box>
						<Box sx={{ flexGrow: 1 }}>
							<Grid container spacing={1} mt={1}>
								<Grid item xs={12} md={12} sm={12} lg={12}>
									<Card sx={{ minWidth: 275 }}>
										<CardContent>
											<Grid container spacing={2}>
												<Grid item mt={1}>
													<Typography fontWeight={600} fontSize={20}>
														tracks played ({filteredTrackLog.length} total):
													</Typography>
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
																<Typography
																	component='div'
																	fontWeight={500}
																	sx={{ fontSize: 16 }}
																>
																	{item.trackId}
																</Typography>
																<Typography>
																	played at: {convertTime(item.timestamp)}
																</Typography>
																<Typography
																	style={{
																		marginBottom: '10px',
																		color:
																			trackLengthArray[i] ===
																			Math.min(...trackLengthArray)
																				? 'green'
																				: 'black',
																		fontWeight:
																			trackLengthArray[i] ===
																			Math.min(...trackLengthArray)
																				? '600'
																				: '400',
																	}}
																>
																	length:{' '}
																	{formatMillisToMinutesSeconds(
																		trackLengthArray[i]
																	)}
																</Typography>
															</div>
														))
													) : (
														<Typography>
															Sorry, but we didn't find "{searchQuery}" in this
															playlist.
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
					<div></div>
				)}
			</Fragment>
		</div>
	)
}

export default SeratoLiveReport

// add color scaling on stat values to display comparison to aggregate (over/under)
// add url validation to input field
