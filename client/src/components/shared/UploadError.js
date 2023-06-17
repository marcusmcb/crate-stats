import React from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@ mui/material/Typography'

import './style/seratoplaylistreport.css'

const UploadError = () => {
	return (
		<div className='data-block await-data'>
			<Box sx={{ flexGrow: 1 }}>
				<Grid>
					<Card>
						<CardContent>
							<Grid>
								<Grid item mt={1.5}>
									<Typography
										sx={{
											fontSize: 16,
											fontWeight: '500',
										}}
									>
										It looks like that feature isn't working right now.
										<br />
										<br />
										You can try your file again later or try another file.
									</Typography>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Box>
			<Typography
				sx={{
					textAlign: 'center',
					fontSize: '14px',
					marginTop: '20px',
					paddingBottom: '15px',
					color: 'white',
				}}
			>
				Don't have Serato? Grab a{' '}
				<span>
					<a
						style={{ color: '#c5e1a5', fontWeight: '400' }}
						href={CrateStatsSample}
						download='crate_stats_sample.csv'
						target='_blank'
						rel='noreferrer'
					>
						test file
					</a>
				</span>{' '}
				to demo this page.
			</Typography>
		</div>
	)
}

export default UploadError
