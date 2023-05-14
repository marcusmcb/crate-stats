import React, { Fragment, useState, useEffect } from 'react'
import Titlebar from '../../components/shared/Titlebar'

import axios from 'axios'

import { Typography } from '@mui/material'
import { Divider } from 'semantic-ui-react'

import './sitestats.css'

const SiteStats = () => {
	const [siteStats, setSiteStats] = useState()
	const [hasData, setHasData] = useState(false)

	useEffect(() => {
		const getSiteStats = () => {
			axios.post('/getSiteStats').then((response) => {
				console.log(response.data)
				setSiteStats(response.data)
				setHasData(true)
			})
		}
		getSiteStats()
	}, [])
	return (
		<Fragment>
			<div className='sitestats-pagebody'>
				<Titlebar />
				{hasData ? (
					<div>
						<div>
							<Typography className='page-header-text'>
								sitewide statistics:
							</Typography>
						</div>
						<Typography style={{ textAlign: 'center' }}>
							<span className='span-text'> - total playlists submitted: </span>
							{siteStats.total_playlists_submitted}
						</Typography>
						<Typography style={{ textAlign: 'center' }}>
							<span className='span-text'>- average bpm: </span>{' '}
							{siteStats.average_bpm}
						</Typography>
						<Typography style={{ textAlign: 'center' }}>
							<span className='span-text'> - most common key:</span>{' '}
							{siteStats.most_common_key.element} (
							{siteStats.most_common_key.count} playlists)
						</Typography>
						<Typography style={{ textAlign: 'center' }}>
							- average track length: {siteStats.average_track_length}
						</Typography>
						<Typography style={{ textAlign: 'center' }}>
							- average tracks per playlist:{' '}
							{siteStats.average_tracks_per_playlist}
						</Typography>
						<Typography style={{ textAlign: 'center' }}>
							- average track year:{' '}
							{new Number(siteStats.average_year).toFixed()}
						</Typography>
						<Typography style={{ textAlign: 'center' }}>
							- unique genres per set:{' '}
							{new Number(siteStats.unique_genres_played).toFixed()}
						</Typography>
						<Typography style={{ textAlign: 'center' }}>
							- sets with doubles: {siteStats.playlists_with_doubles}
						</Typography>
						<Typography style={{ textAlign: 'center' }}>
							- doubles per set:{' '}
							{new Number(siteStats.doubles_per_playlist).toFixed()}
						</Typography>
						<Divider />
						<div></div>
					</div>
				) : (
					<div>
						<Typography className='page-header-text'>
							fetching site stats...
						</Typography>
					</div>
				)}
			</div>
		</Fragment>
	)
}

export default SiteStats
