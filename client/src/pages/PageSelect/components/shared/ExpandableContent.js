import React, { Fragment } from 'react'

import {
	CardContent,
	CardActions,
	Collapse,
	Typography,
	Button,
} from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ExpandableContent = ({ title, image, content, expanded, onClick }) => {
	return (
		<Fragment>
			<CardActions style={{ padding: '0px' }}>
				<Button
					type='submit'
					variant='contained'
					sx={{
						backgroundColor: 'transparent',
						color: expanded ? '#1b5e20' : 'black',						
						':hover': {
							backgroundColor: 'transparent',
							color: '#7cb342',
						},
						border: '1px solid lightgrey',
						margin: '15px 15px 15px 0px',
					}}
					onClick={onClick}
					aria-expanded={expanded}
					aria-label='show more'
				>
					<ExpandMoreIcon sx={{ color: expanded ? '#1b5e20' : 'black' }} />
				</Button>
				<Typography sx={{ fontWeight: '500' }}>{title}</Typography>
			</CardActions>
			<Collapse in={expanded} timeout='auto' unmountOnExit>
				<CardContent sx={{ backgroundColor: '#c5e1a5' }}>{content}</CardContent>
			</Collapse>
		</Fragment>
	)
}

export default ExpandableContent
