import React, { Fragment, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandMore from '../../../../components/helpers/CardExpander'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Modal from '@mui/material/Modal'

const GridItem = ({ title, value, xs = 12, md = 12, sm = 12, lg = 12 }) => (
	<Grid item xs={xs} md={md} sm={sm} lg={lg}>
		<Card sx={{ minWidth: 275 }}>
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

const ModalPopup = ({ open, handleClose, children }) => {
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	}

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={style}>{children}</Box>
		</Modal>
	)
}

const RatingData = ({ data: ratingData }) => {
	const [expanded, setExpanded] = useState(false)
	const handleExpandClick = () => setExpanded(!expanded)

	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	return (
		<Fragment>
			<Typography
				sx={{ fontSize: 20 }}
				color='white'
				fontWeight={500}
				gutterBottom
			>
				track rating data:
			</Typography>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={1}>
					<GridItem
						title='five-star tracks played:'
						value={ratingData.five_star_tracks.length}
					/>

					<Grid item xs={12} md={12} sm={12} lg={12}>
						<Card sx={{ minWidth: 275 }}>
							<CardContent>
								<Typography>
									five star tracks played during this set:
								</Typography>
								{ratingData.five_star_tracks.map((item, i) => (
									<Typography
										component='div'
										fontWeight={500}
										sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
										key={i}
										fontSize={22}
									>
										{item.artist} - {item.title}
									</Typography>
								))}
							</CardContent>
							<CardActions
								sx={{
									height: '4vh',
									backgroundColor: '#616161',
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
									<GridItem
										title='percentage of tracks played with ratings:'
										value={`${Number(
											ratingData.tag_health.percentage_with_ratings
										).toFixed()}%`}
										xs={12}
										md={6}
										sm={12}
										lg={6}
									/>

									<Grid item xs={12} md={6} sm={12} lg={6}>
										<Card sx={{ minWidth: 275, boxShadow: 'none' }}>
											<CardContent>
												<Typography>
													<span>
														percentage of playlist with a five star rating:
														<HelpOutlineIcon onClick={handleOpen} />
													</span>
												</Typography>
												<Typography
													variant='h4'
													component='div'
													fontWeight={500}
													sx={{ color: 'rgba(29, 79, 145, 0.8)' }}
												>
													{Number(
														ratingData.tag_health
															.percentage_with_five_star_ratings
													).toFixed()}
													%
												</Typography>
												<ModalPopup open={open} handleClose={handleClose}>
													<Typography
														id='modal-modal-title'
														variant='h6'
														component='h2'
														style={{
															color: 'rgba(29, 79, 145, 0.8)',
														}}
													>
														What this means...
													</Typography>
													<Typography
														id='modal-modal-description'
														sx={{ mt: 2 }}
													>
														Of the tracks you played in this set that have
														ratings,{' '}
														<span
															style={{
																color: 'rgba(29, 79, 145, 0.8)',
																fontWeight: '500',
															}}
														>
															{Number(
																ratingData.tag_health
																	.percentage_with_five_star_ratings
															).toFixed()}
														</span>
														% of those tracks you have rated as five stars.
													</Typography>
												</ModalPopup>
											</CardContent>
										</Card>
									</Grid>
								</Grid>
							</Collapse>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</Fragment>
	)
}

export default RatingData
