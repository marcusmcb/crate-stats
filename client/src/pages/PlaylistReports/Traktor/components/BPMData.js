import React, { Fragment } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Divider } from 'semantic-ui-react'

const GridItem = ({ title, value }) => (
	<Grid item xs={6}>
		<Typography sx={{ fontSize: 16, fontWeight: '500' }}>{title}</Typography>
		<Typography
			variant='h4'
			component='div'
			fontWeight={500}
			sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
		>
			{value}
		</Typography>
	</Grid>
)

const BPMData = ({ data: bpmData }) => {
	return (
		<Fragment>
			<Typography
				sx={{ fontSize: 20 }}
				color='white'
				fontWeight={500}
				gutterBottom
			>
				bpm data:
			</Typography>
			<Box sx={{ flexGrow: 1 }}>
				<Grid item md={5} sm={12}>
					<Card sx={{ minWidth: 275 }}>
						<CardContent>
							<Grid container spacing={3}>
								<GridItem
									title='bpm range:'
									value={`${bpmData.bpm_range.minBPM} - ${bpmData.bpm_range.maxBPM}`}
								/>
								<GridItem title='average bpm:' value={bpmData.average_bpm} />
							</Grid>
							<Divider />
							<GridItem
								title='most common bpm:'
								value={`${bpmData.most_common_bpm.value} (played ${bpmData.most_common_bpm.times_played} times in this set)`}
							/>
							<Divider />
							<GridItem
								title='biggest single bpm change:'
								value={`${Number(
									bpmData.biggest_bpm_change.from_track.bpm
								).toFixed()} -- ${Number(
									bpmData.biggest_bpm_change.to_track.bpm
								).toFixed()}`}
							/>
							<Grid container spacing={3}>
								<Grid item xs={6}>
									<Typography sx={{ fontSize: 16 }}>from:</Typography>
									<Typography variant='h5' component='div' fontWeight={500}>
										{bpmData.biggest_bpm_change.from_track.title}
									</Typography>
									<Typography
										variant='h5'
										component='div'
										fontWeight={500}
										sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
									>
										{Number(
											bpmData.biggest_bpm_change.from_track.bpm
										).toFixed()}{' '}
										BPM
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography sx={{ fontSize: 16 }}>to:</Typography>
									<Typography variant='h5' component='div' fontWeight={500}>
										{bpmData.biggest_bpm_change.to_track.title}
									</Typography>
									<Typography
										variant='h5'
										component='div'
										fontWeight={500}
										sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
									>
										{Number(bpmData.biggest_bpm_change.to_track.bpm).toFixed()}{' '}
										BPM
									</Typography>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Box>
		</Fragment>
	)
}

export default BPMData
