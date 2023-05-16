import React, { Fragment } from 'react'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import { Grid } from '@mui/material'
import { Card } from '@mui/material'
import { CardContent } from '@mui/material'
import { Divider } from 'semantic-ui-react'

const RekordboxMasterTrackLog = ({ masterTrackLog }) => {
	console.log(masterTrackLog)
	masterTrackLog.forEach((track) => {
		console.log(track.Artist, ' - ', track.Track_Title)
	})

	return (
		<Fragment>
			<div>
				<Typography
					sx={{ fontSize: 20 }}
					color='white'
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
														{i + 1}. {item.Artist} - {item.Track_Title}
													</Typography>
													{item.Year && item.Year !== '0' ? (
														<Typography fontWeight={500}>
															({item.Year})
														</Typography>
													) : (
														<></>
													)}
													<Typography>
														{item['BPM'].slice(0, -1)} BPM
													</Typography>
													<Typography>length: {item['Time']}</Typography>
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

export default RekordboxMasterTrackLog
