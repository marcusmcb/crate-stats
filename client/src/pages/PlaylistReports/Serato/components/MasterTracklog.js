import React, { Fragment } from 'react'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import { Grid } from '@mui/material'
import { Card } from '@mui/material'
import { CardContent } from '@mui/material'
import { Divider } from 'semantic-ui-react'

const MasterTracklog = ({ masterTrackLog }) => {
	const removeSeconds = (timeString) => {
		const date = new Date('1970-01-01 ' + timeString)
		const hours = date.getHours()
		const minutes = date.getMinutes()
		let formattedHours = hours > 12 ? hours - 12 : hours // Convert from 24 hour to 12 hour format
		if (formattedHours === 0) formattedHours = 12 // Convert 0 hours to 12 in 12 hour format
		const formattedMinutes = minutes < 10 ? '0' + minutes : minutes // Add leading 0 if necessary
		const period = hours >= 12 ? 'PM' : 'AM' // Determine AM/PM
		return `${formattedHours}:${formattedMinutes} ${period}`
	}

	return (
		<Fragment>
			<div>
				<Typography
					sx={{ fontSize: 20 }}
					color='#c5e1a5'
					fontWeight={500}
					gutterBottom
				>
					master track log:
				</Typography>
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={1} mt={1}>
						<Grid item xs={12} md={12} sm={12} lg={12}>
							<Card sx={{ minWidth: 275 }}>
								<CardContent>
									<Grid container spacing={2}>
										<Grid item mt={1}>
											<Typography fontWeight={500}>tracks played:</Typography>
										</Grid>
									</Grid>
									<Divider />
									<Grid container spacing={2}>
										<Grid item>
											{masterTrackLog.map((item, i) => (
												<div onClick={() => {}} key={i}>
													<Typography
														component='div'
														fontWeight={500}
														sx={{ fontSize: 16 }}
													>
														{i + 1}. {item.artist} - {item.name}
													</Typography>
													{item.year ? (
														<Typography fontWeight={500}>
															({item.year})
														</Typography>
													) : (
														<></>
													)}
													<Typography>{item.bpm} BPM</Typography>
													<Typography>
														length: {item.playtime.substring(2)}
													</Typography>
													<Typography>
														played at: {removeSeconds(item['start time'])}
													</Typography>
													<Divider />
												</div>
											))}
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Box>
			</div>
		</Fragment>
	)
}

export default MasterTracklog

// add UI elements to give this feature a "timeline" look
// with key events (shortest/longest track, biggest bpm change, etc)
// highlighted accordingly in display
