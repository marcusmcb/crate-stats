import React, { Fragment } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Divider } from 'semantic-ui-react'

const BitrateData = (props) => {
	const bitrateData = props.data
	const masterTrackLogLength = props.masterTrackLogLength
	return (
		<Fragment>
			<Typography
				sx={{ fontSize: 20 }}
				color='white'
				fontWeight={500}
				gutterBottom
			>
				bitrate data:
			</Typography>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={1}>
					<Grid item xs={12} md={12} sm={12} lg={12}>
						<Card sx={{ minWidth: 275 }}>
							<CardContent>
								<Typography style={{ fontWeight: '400', fontSize: '16px' }}>
									sub 320 tracks played:
								</Typography>
								<Typography
									variant='h4'
									component='div'
									fontWeight={500}
									sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
								>
									{bitrateData.sub320_tracks.length === 0 ? (
										<div>
											<span style={{ fontSize: '20px', color: 'black' }}>
												None detected
											</span>
										</div>
									) : (
										<div>
											{bitrateData.sub320_tracks.length}{' '}
											<span style={{ fontSize: '20px', color: 'black' }}>
												(out of {masterTrackLogLength} tracks)
											</span>
										</div>
									)}
								</Typography>
								{bitrateData.sub320_tracks.length === 0 ? (
									<></>
								) : (
									<div>
										<Divider />
										<Typography
											style={{
												marginBottom: '15px',
												fontSize: '16px',
											}}
										>
											track title & bitrate:
										</Typography>
										{bitrateData.sub320_tracks.map((item, key) => {
											return (
												<Typography
													key={key}
													component='div'
													fontWeight={500}
													sx={{
														color:
															item.bitrate === '256 kbps'
																? 'rgba(255, 104, 39, 0.8)'
																: item.bitrate === '192 kbps'
																? 'rgba(255, 39, 77, 0.8)'
																: item.bitrate === '224 kbps'
																? 'rgba(255, 35, 129, 0.8)'
																: 'black',
													}}
													style={{ fontSize: '20px' }}
												>
													<span style={{ color: 'black' }}>{item.title} -</span>{' '}
													{item.bitrate}
												</Typography>
											)
										})}
									</div>
								)}
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</Fragment>
	)
}

export default BitrateData
