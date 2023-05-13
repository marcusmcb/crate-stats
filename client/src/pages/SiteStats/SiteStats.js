import React, { Fragment } from 'react'
import Titlebar from '../../components/shared/Titlebar'
import { Typography } from '@mui/material'
import { Divider } from 'semantic-ui-react'
import './sitestats.css'

const SiteStats = () => {
	return (
		<Fragment>
			<Titlebar />
			<div>
				<Typography className='page-header-text'>
					sitewide statistics:
				</Typography>
			</div>
        <Typography style={{ textAlign: 'center' }}>
          - total playlists submitted since xx date
        </Typography>
        <Typography style={{ textAlign: 'center' }}>
          - data averages (bpm, key, etc)
        </Typography>
        <Typography style={{ textAlign: 'center' }}>
          - likelihood of doubles, etc (deeper dives)
        </Typography>
        <Typography style={{ textAlign: 'center' }}>
          - playlists submitted
        </Typography>
        <Divider/>
      <div>
        
      </div>
		</Fragment>
	)
}

export default SiteStats
