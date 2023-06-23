import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandMore from '../../../../components/helpers/CardExpander'

import TimesText from '../../../../components/shared/text_spans/timesText'
import TimeText from '../../../../components/shared/text_spans/timeText'

const KeyGridItem = ({ title, keyData }) => (
	<Grid item mt={1}>
		<Typography>{title}</Typography>
		<Grid item>
			<Typography
				variant='h4'
				component='div'
				fontWeight={500}
				sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
			>
				{keyData.key}
			</Typography>
		</Grid>
		<Grid item mt={0.5}>
			<Typography
				variant='h5'
				component='div'
				fontWeight={400}
				sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
			>
				(played {keyData.times_played}{' '}
				{keyData.times_played > 1 ? <TimesText /> : <TimeText />})
			</Typography>
		</Grid>
	</Grid>
)

const HealthGridItem = ({ title, value }) => (
	<Grid item xs={12} md={6} sm={12} lg={6}>
		<Card sx={{ minWidth: 275, boxShadow: 'none' }}>
			<CardContent>
				<Typography>{title}</Typography>
				<Typography
					variant='h4'
					component='div'
					fontWeight={500}
					sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
				>
					{value}
				</Typography>
			</CardContent>
		</Card>
	</Grid>
)

const KeyData = ({ data: keyData }) => {
	const [expanded, setExpanded] = useState(false)

	const handleExpandClick = () => {
		setExpanded(!expanded)
	}

	return (
		<React.Fragment>
			<Typography
				sx={{ fontSize: 20 }}
				color='white'
				fontWeight={500}
				gutterBottom
			>
				key data:
			</Typography>
			<Box sx={{ flexGrow: 1 }}>
				<Grid item xs={12} md={5} sm={12} lg={6}>
					<Card sx={{ minWidth: 275 }}>
						<CardContent>
							<Grid container spacing={3}>
								<KeyGridItem
									title='most common key:'
									keyData={keyData.most_common_key}
								/>
								<KeyGridItem
									title='least common key:'
									keyData={keyData.least_common_key}
								/>
							</Grid>
						</CardContent>
						<Card sx={{ midWidth: 245 }}>
							<CardActions
								sx={{
									height: '4vh',
									backgroundColor: 'rgba(101, 105, 114, 1)',
									color: 'white',
								}}
							>
								<CardContent>tag health</CardContent>
								<ExpandMore
									expand={expanded}
									onClick={handleExpandClick}
									aria-expanded={expanded}
									aria-label='show more'
								>
									<ExpandMoreIcon sx={{ color: 'white' }} />
								</ExpandMore>
							</CardActions>
							<Collapse in={expanded} timeout='auto' unmountOnExit>
								<Grid container spacing={1}>
									<HealthGridItem
										title='percentage of tracks played with key tags:'
										value={`${keyData.tag_health.percentage_with_key_tags}%`}
									/>
									{keyData.tag_health.empty_key_tags > 0 && (
										<HealthGridItem
											title='tracks with empty key tags:'
											value={keyData.tag_health.empty_key_tags}
										/>
									)}
								</Grid>
							</Collapse>
						</Card>
					</Card>
				</Grid>
			</Box>
		</React.Fragment>
	)
}

export default KeyData
