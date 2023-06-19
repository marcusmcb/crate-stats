import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const PreUploadTextPanel = ({ platform }) => {
	const fileType = platform.name === 'Serato' ? 'CSV' : 'TXT'
	return (
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
									Upload or drop your exported {platform.name} {fileType} file
									above to view your CrateStats analysis.
								</Typography>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
		</Box>
	)
}

export default PreUploadTextPanel
