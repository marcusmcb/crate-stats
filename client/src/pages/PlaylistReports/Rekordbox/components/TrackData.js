import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

const TrackItem = ({ title, value }) => (
	<Grid item md={6} sm={12}>
		<Grid container spacing={2}>
			<Grid item>
				<Typography
					sx={{ fontSize: 16, fontWeight: '500', paddingTop: '12px' }}
				>
					{title}:
				</Typography>
			</Grid>
			<Grid item>
				<Typography
					variant='h3'
					component='div'
					fontWeight={500}
					sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
				>
					{value}
				</Typography>
			</Grid>
		</Grid>
	</Grid>
)

const TrackInfo = ({ title, track }) => (
	<Grid item md={6} sm={12}>
		<Typography sx={{ fontSize: 16 }}>{title}:</Typography>
		<Typography variant='h5' component='div' fontWeight={500}>
			{track?.title}
		</Typography>
		<Typography
			variant='h5'
			component='div'
			fontWeight={500}
			sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
		>
			({track?.length.slice(1)})
		</Typography>
	</Grid>
)

const TrackData = ({ data: trackData = {} }) => {
	const {
		total_tracks_played,
		average_track_length,
		shortest_track_played,
		longest_track_played,
	} = trackData

	return (
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
							<Grid container spacing={2}>
								<TrackItem
									title='total tracks played'
									value={total_tracks_played}
								/>
								<TrackItem
									title='average track length'
									value={average_track_length}
								/>
							</Grid>
							<Divider sx={{ margin: '15px 0px 15px 0px' }} />
							<Grid container spacing={2}>
								<TrackInfo
									title='shortest track'
									track={shortest_track_played}
								/>
								<TrackInfo title='longest track' track={longest_track_played} />
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Box>
		</React.Fragment>
	)
}

export default TrackData
