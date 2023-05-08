import React, { Fragment } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/system'
import BarChart from './TrackDataBarChart'
import './trackdata.css'

const TrackData2 = (props) => {
	console.log(props)
	const { trackData, setStartTime, setEndTime } = props
	console.log(trackData, setStartTime, setEndTime)

	const StyledBox = styled(Box)(({ theme }) => ({
		padding: '5px',
		margin: '5px',
	}))

	return (
		<Fragment>
			<div className='track-data-main'>
				<Grid container>
					<Grid item xs={12}>
						<Typography
							variant='h5'
							align='left'
							style={{ padding: '10px', color: 'white' }}
						>
							Track Data
						</Typography>
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<Grid container spacing={2} className='foo'>
							<Grid item xs={12} sm={6}>
								<StyledBox>
									<Card>
										<CardContent>
											<Typography
												style={{ fontSize: '20px', fontWeight: '600' }}
											>
												Total Tracks Played:
											</Typography>
											<Typography style={{ fontSize: '18px' }}>
												{trackData.total_tracks_played}
											</Typography>
										</CardContent>
									</Card>
								</StyledBox>
							</Grid>
							<Grid item xs={12} sm={6}>
								<StyledBox>
									<Card>
										<CardContent>
											<Typography
												style={{ fontSize: '20px', fontWeight: '600' }}
											>
												Average Length:
											</Typography>
											<Typography style={{ fontSize: '18px' }}>
												{trackData.average_track_length}
											</Typography>
										</CardContent>
									</Card>
								</StyledBox>
							</Grid>
						</Grid>

						<BarChart
							data={trackData.track_length_array}
							startTime={setStartTime}
							endTime={setEndTime}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Grid container spacing={2} direction='column'>
							<Grid item xs={12}>
								<StyledBox>
									<Card>
										<CardContent>
											<Typography
												style={{ fontSize: '20px', fontWeight: '600' }}
											>
												Longest Track Played:
											</Typography>
											<Typography style={{ fontSize: '18px' }}>
												{trackData.longest_track.artist} -{' '}
												{trackData.longest_track.name} |{' '}
												<span style={{ color: 'purple', fontWeight: '600' }}>
													{trackData.longest_track.play_time}
												</span>
											</Typography>
											<Typography>
												(played at {trackData.longest_track.played_at})
											</Typography>
											<hr />
											<Typography
												style={{ fontSize: '20px', fontWeight: '600' }}
											>
												Shortest Track Played:
											</Typography>
											<Typography style={{ fontSize: '18px' }}>
												{trackData.shortest_track.artist} -{' '}
												{trackData.shortest_track.name} |{' '}
												<span style={{ color: 'purple', fontWeight: '600' }}>
													{trackData.shortest_track.play_time}
												</span>
											</Typography>
											<Typography>
												(played at {trackData.shortest_track.played_at})
											</Typography>
										</CardContent>
									</Card>
								</StyledBox>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</Fragment>
	)
}

export default TrackData2
