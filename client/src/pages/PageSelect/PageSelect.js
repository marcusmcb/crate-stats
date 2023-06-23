import React, { Fragment } from 'react'
import { Divider } from 'semantic-ui-react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import Titlebar from '../../components/shared/Titlebar'
import DjPlaylistAnalysis from './components/DjPlaylistAnalysis'
import LivePlaylistAnalysis from './components/LivePlaylistAnalysis'

import './style/pageselect.css'

const PageSelect = () => {
	return (
		<Fragment>
			<div className='selectpage-body'>
				<Titlebar />
				<Divider />
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={1}>
						<Grid item xs={12} sm={12} md={6} lg={6}>
							<DjPlaylistAnalysis />
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={6}>
							<LivePlaylistAnalysis />
						</Grid>
					</Grid>
					<Typography
						sx={{
							marginTop: '50px',
							textAlign: 'center',
							color: '#1b5e20',
							fontWeight: '500',
							fontSize: '16px',
						}}
					>
						Crate Stats {new Date().getFullYear()}
					</Typography>
					<Typography
						sx={{ textAlign: 'center', fontSize: '12px', marginTop: '5px' }}
					>
						Errors or issues?{' '}
						<a style={{ color: 'black' }} href='mailto:cratestats@gmail.com'>
							cratestats@gmail.com
						</a>
					</Typography>
					<Typography
						sx={{ textAlign: 'center', fontSize: '12px', marginTop: '5px' }}
					>
						Rekordbox & Traktor support currently in development.
					</Typography>
					<br />
				</Box>
			</div>
		</Fragment>
	)
}

export default PageSelect
