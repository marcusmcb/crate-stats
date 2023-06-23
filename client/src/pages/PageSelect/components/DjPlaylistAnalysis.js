import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import {
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	Typography,
	Button,
	Divider,
} from '@mui/material'

import ExpandableContent from './shared/ExpandableContent'
import CSVExportImageOne from '../../../images/csvexport_01.png'
import CSVExportImageTwo from '../../../images/csvexport_02.png'

const DjPlaylistAnalysis = () => {
	const [expanded, setExpanded] = useState(false)

	const handleExpandClick = () => {
		setExpanded(!expanded)
	}

	return (
		<Card sx={{ minWidth: 275, boxShadow: 'none' }}>
			<CardHeader title='DJ Playlist Analysis' />
			<CardMedia
				component='img'
				height='300'
				image='https://media.istockphoto.com/photos/glowing-lights-from-dj-mixer-music-remote-buttons-picture-id1173145186?k=20&m=1173145186&s=612x612&w=0&h=PC_IKnFl14TCpytJzYHG89NeX6hbtVpfase6if2ks0Q='
				alt='Pioneer DJ equipment in a dj booth'
			/>
			<CardContent>
				<Typography color='text.secondary'>
					Export your set list history from your DVS software as a CSV or TXT
					file and use it to get your Crate Stats report.
				</Typography>
			</CardContent>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Button
					type='submit'
					variant='contained'
					sx={{
						backgroundColor: '#1b5e20',
						':hover': { backgroundColor: '#7cb342', color: 'white' },
					}}
					style={{ marginRight: '15px' }}
					component={Link}
					to={'/serato'}
				>
					Serato
				</Button>
				<Button
					type='submit'
					variant='contained'
					sx={{
						backgroundColor: '#1b5e20',
						':hover': { backgroundColor: '#7cb342', color: 'white' },
					}}
					style={{ marginRight: '15px' }}
					component={Link}
					to={'/rekordbox'}
				>
					Rekordbox
				</Button>
				<Button
					type='submit'
					variant='contained'
					sx={{
						backgroundColor: '#1b5e20',
						':hover': { backgroundColor: '#7cb342', color: 'white' },
					}}
					component={Link}
					to={'/traktor'}
				>
					Traktor
				</Button>
			</div>
			<ExpandableContent
				title='Tell Me More'
				expanded={expanded}
				onClick={handleExpandClick}
				buttonStyles={{
					backgroundColor: 'transparent',
					color: expanded ? '#1b5e20' : 'black',
					border: 'none',
				}}
				expandIconStyles={{ color: expanded ? '#1b5e20' : 'black' }}
				s
				content={
					<Fragment>
						<Typography gutterBottom variant='h5' component='div'>
							Crate Stats for Serato DJ Playlists
						</Typography>
						<Divider sx={{ marginBottom: '15px' }} />
						<Typography variant='body2' fontSize={14}>
							This is the full Serato© DJ playlist analysis from Crate Stats.
							You may use this tool to run an analysis on any playlist history
							you export from the software.
						</Typography>
						<br />
						<Typography variant='body2' fontSize={14}>
							To do this, open your Serato© DJ software and select the "history"
							option. You should see a panel that looks something like this.
						</Typography>
						<br />
						<CardMedia
							component='img'
							alt='green iguana'
							image={CSVExportImageOne}
						/>
						<br />
						<Typography>
							From here, you can select any individual set list that you'd like
							to analyze. Make sure the format option is set to 'csv' and select
							'Export' to save the file to your laptop.
						</Typography>
						<br />
						<Typography>
							You can then select the Post DJ Set Analysis option above and use
							the file created to get your Crate Stats!
						</Typography>
						<br />
						<Typography gutterBottom variant='h5' component='div'>
							A few tips...
						</Typography>
						<br />
						<Typography>
							Serato© gives each playlist a default name of the date on which it
							was played. You can double-click this in the history view to
							rename it.
						</Typography>
						<br />
						<CardMedia
							component='img'
							alt='green iguana'
							image={CSVExportImageTwo}
						/>
						<br />
						<Typography>
							If you right-click the history panel's header, you'll be given a
							list of options to add to the history view.
						</Typography>
						<br />
						<Typography>
							The values present in the panel will be exported in your csv file.
							Crate Stats currently runs analysis on the following values, so be
							sure to include them in your exported file:
						</Typography>
						<Divider />
						<Typography>
							<li>name</li>
							<li>artist</li>
							<li>start/end times</li>
							<li>playtime</li>
							<li>deck</li>
							<li>bpm</li>
							<li>genre</li>
							<li>year</li>
						</Typography>
					</Fragment>
				}
			/>
		</Card>
	)
}

export default DjPlaylistAnalysis
