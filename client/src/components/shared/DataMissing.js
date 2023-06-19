import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const DataMissing = ({ data }) => {
	const valueToText = {
		doubles: 'No doubles were detected in this set',
		key: 'No key data available for this set',
		year: 'No year data available for this set',
		bpm: 'No bpm data available for this set',
		deck: 'No deck data available for this set',
		genre: 'No genre data available for this set',
		track: 'No track data available for this set',
		playlist: 'No playlist data available for this set',
		artist: 'No artist data available for this set',
		album: 'No album data available for this set',
		rating: 'No rating data available for this set',
	}

	const returnText = valueToText[data.value] || ''

	return (
		<div>
			<Typography
				sx={{ fontSize: 20 }}
				color='#c5e1a5'
				fontWeight={500}
				gutterBottom
			>
				{data.value} data:
			</Typography>
			<Box sx={{ flexGrow: 1 }}>
				<Grid item md={5} sm={12}>
					<Card sx={{ minWidth: 275 }}>
						<CardContent>
							<Grid container spacing={2}>
								<Grid mt={3}>
									<Typography
										sx={{ fontSize: 16, fontWeight: '500', marginLeft: '15px' }}
									>
										{returnText}
									</Typography>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Box>
		</div>
	)
}

export default DataMissing
