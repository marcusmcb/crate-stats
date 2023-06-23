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
import LivePlaylistImageTwo from '../../../images/live_playlist_analysis/liveplaylist_02.png'
import LivePlaylistImageThree from '../../../images/live_playlist_analysis/liveplaylist_03.png'

const LivePlaylistAnalysis = () => {
	const [expanded, setExpanded] = useState(false)

	const handleExpandClick = () => {
		setExpanded(!expanded)
	}

	return (
		<Card sx={{ minWidth: 275, boxShadow: 'none' }}>
			<CardHeader title='Live Playlist Analysis' />
			<CardMedia
				component='img'
				height='300'
				image='https://media-exp1.licdn.com/dms/image/C4D12AQHDoCsY44zQaA/article-cover_image-shrink_600_2000/0/1630855319553?e=2147483647&v=beta&t=yTZKBwHvKf9gfmaPwoTQ-yLk_FPY07VCNdO-XoX6JtI'
				alt='Pioneer dj equipment in a dj booth'
			/>
			<CardContent>
				<Typography color='text.secondary'>
					Enter the URL for your Serato© Live Playlist link to get real-time
					analytics for your DJ set or stream.
				</Typography>
			</CardContent>
			<Button
				type='submit'
				variant='contained'
				sx={{
					backgroundColor: '#1b5e20',
					':hover': { backgroundColor: '#7cb342', color: 'white' },
				}}
				component={Link}
				to={'/livereport'}
			>
				GO
			</Button>
			<ExpandableContent
				title='Tell me more'
				expanded={expanded}
				onClick={handleExpandClick}
				buttonStyles={{
					backgroundColor: 'transparent',
					color: expanded ? '#1b5e20' : 'black',
					border: 'none',
				}}
				expandIconStyles={{ color: expanded ? '#1b5e20' : 'black' }}
				content={
					<Fragment>
						<Typography gutterBottom variant='h5' component='div'>
							Crate Stats for Serato Live Playlists
						</Typography>
						<Divider sx={{ marginBottom: '15px' }} />
						<Typography variant='body2' fontSize={14}>
							This feature allows you to enter the link from any of your Serato©
							Live Playlists into Crate Stats for a quick analysis of your set.
						</Typography>
						<br />
						<Typography variant='body2' fontSize={14}>
							After logging into your{' '}
							<a
								href='https://id.Serato©.com/en/login'
								style={{ textDecoration: 'none', color: '#33691e' }}
							>
								Serato©
							</a>{' '}
							account, you can find the links to your live playlists in the menu
							under your avatar.
						</Typography>
						<br />
						<Typography variant='body2' fontSize={14}>
							Select any of your live playlists and, once open, copy the URL
							from your browser.
						</Typography>
						<br />
						<Typography>
							You'll need to make sure that the playlist you've selected is set
							to public - they're set to "private" by default. If you scroll to
							the bottom of your live playlist page, you'll see an option to
							edit its details.
						</Typography>
						<br />
						<CardMedia
							component='img'
							alt='green iguana'
							image={LivePlaylistImageTwo}
						/>
						<CardContent></CardContent>
						<Typography>
							After selecting "edit details," you'll see an option to set your
							playlist's visibility. Select "Public" and save. Your live
							playlist is now ready for Crate Stats analysis!
						</Typography>
						<br />
						<CardMedia
							component='img'
							alt='green iguana'
							image={LivePlaylistImageThree}
						/>
						<CardContent></CardContent>
					</Fragment>
				}
			/>
		</Card>
	)
}

export default LivePlaylistAnalysis
