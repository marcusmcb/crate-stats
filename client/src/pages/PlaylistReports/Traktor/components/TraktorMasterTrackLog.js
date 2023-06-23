import React, { Fragment, useState, useEffect } from 'react'
import {
	Box,
	Grid,
	Card,
	CardContent,
	Divider,
	TextField,
	InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import Typography from '@mui/material/Typography'

const Track = ({ track, index }) => (
	<div onClick={() => {}}>
		<Typography component='div' fontWeight={500} sx={{ fontSize: 16 }}>
			{index + 1}. {track.Artist} - {track.Track_Title}
		</Typography>
		<Typography>{track['BPM'].slice(0, -1)} BPM</Typography>
		<Typography>length: {track['Time']}</Typography>
		<Divider sx={{ my: '15px' }} />
	</div>
)

const TraktorMasterTrackLog = ({ data }) => {
	const masterTrackLog = data
	const [searchQuery, setSearchQuery] = useState('')
	const [filteredLog, setFilteredLog] = useState(masterTrackLog)

	useEffect(() => {
		setFilteredLog(
			masterTrackLog.filter(
				(item) =>
					item.Artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
					item.Track_Title.toLowerCase().includes(searchQuery.toLowerCase())
			)
		)
	}, [searchQuery, masterTrackLog])

	return (
		<Fragment>
			<Typography
				sx={{ fontSize: 20 }}
				color='white'
				fontWeight={500}
				gutterBottom
			>
				master track log:
			</Typography>
			<Box sx={{ flexGrow: 1 }}>
				<TextField
					sx={{ marginBottom: '1rem', backgroundColor: 'white' }}
					type='search'
					placeholder='Search track log'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
				<Grid container spacing={1}>
					<Grid item xs={12} md={12} sm={12} lg={12}>
						<Card sx={{ minWidth: 275 }}>
							<CardContent>
								<Typography fontWeight={500}>tracks played:</Typography>
								<Divider sx={{ my: '7px' }} />
								{filteredLog.length > 0 ? (
									filteredLog.map((item, i) => (
										<Track track={item} index={i} key={i} />
									))
								) : (
									<Typography>
										Sorry, but we didn't find "{searchQuery}" in this playlist.
									</Typography>
								)}
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</Fragment>
	)
}

export default TraktorMasterTrackLog
