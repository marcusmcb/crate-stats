import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

const BitrateItem = ({ title, bitrate }) => (
	<Typography
		component='div'
		fontWeight={500}
		sx={{
			color:
				bitrate === '256 kbps'
					? 'rgba(255, 104, 39, 0.8)'
					: bitrate === '192 kbps'
					? 'rgba(255, 39, 77, 0.8)'
					: bitrate === '224 kbps'
					? 'rgba(255, 35, 129, 0.8)'
					: 'black',
		}}
		style={{ fontSize: '20px' }}
	>
		<span style={{ color: 'black' }}>{title} -</span> {bitrate}
	</Typography>
)

const BitrateData = ({ data: bitrateData = {}, masterTrackLogLength }) => {
	const sub320TracksPlayedValue =
		bitrateData.sub320_tracks.length === 0
			? 'None detected'
			: `${bitrateData.sub320_tracks.length} (out of ${masterTrackLogLength} tracks)`

	return (
		<React.Fragment>
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
									{sub320TracksPlayedValue}
								</Typography>
								{bitrateData.sub320_tracks.length !== 0 && (
									<React.Fragment>
										<Divider sx={{ margin: '15px 0px 15px 0px' }} />
										<Typography
											style={{
												marginBottom: '15px',
												fontSize: '16px',
											}}
										>
											track title & bitrate:
										</Typography>
										{bitrateData.sub320_tracks.map((item, key) => (
											<BitrateItem
												key={key}
												title={item.title}
												bitrate={item.bitrate}
											/>
										))}
									</React.Fragment>
								)}
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</React.Fragment>
	)
}

export default BitrateData
