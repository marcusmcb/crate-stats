import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Divider } from 'semantic-ui-react'

const MainGridItem = ({ title, value }) => (
	<Grid item mt={1.5}>
		<Typography sx={{ fontSize: 16, fontWeight: '500' }}>{title}</Typography>
		<Typography
			variant='h3'
			component='div'
			fontWeight={500}
			sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
		>
			{value}
		</Typography>
	</Grid>
)

const SecondaryGridItem = ({ title, value, subtitle }) => (
	<Grid item>
		<Typography sx={{ fontSize: 16 }}>{title}</Typography>
		<Typography variant='h5' component='div' fontWeight={500}>
			{value}
		</Typography>
		<Typography
			variant='h5'
			component='div'
			fontWeight={500}
			sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
		>
			({subtitle.slice(1)})
		</Typography>
	</Grid>
)

const TrackData = ({ data: trackData }) => (
	<React.Fragment>
		<Typography
			sx={{ fontSize: 20 }}
			color='white'
			fontWeight={500}
			gutterBottom
		>
			track data:
		</Typography>
		<Box sx={{ flexGrow: 1 }}>
			<Grid item md={5} sm={12}>
				<Card sx={{ minWidth: 275 }}>
					<CardContent>
						<Grid container spacing={3}>
							<MainGridItem
								title='total tracks played:'
								value={trackData.total_tracks_played}
							/>
							<MainGridItem
								title='average track length:'
								value={trackData.average_track_length}
							/>
						</Grid>
						<Divider />
						<Grid container spacing={4}>
							<SecondaryGridItem
								title='shortest track:'
								value={trackData.shortest_track_played.title}
								subtitle={trackData.shortest_track_played.length}
							/>
							<SecondaryGridItem
								title='longest track:'
								value={trackData.longest_track_played.title}
								subtitle={trackData.longest_track_played.length}
							/>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
		</Box>
	</React.Fragment>
)

export default TrackData
