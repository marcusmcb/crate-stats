import React from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const UploadError = () => {
	return (
		<div>
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
		</div>
	)
}

export default UploadError
