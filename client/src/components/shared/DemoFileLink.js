import React from 'react'
import Typography from '@mui/material/Typography'
import SeratoCrateStatsSample from '../../data/cinco_de_mayo.csv'
import TraktorCrateStatsSample from '../../data/traktor_sample.txt'
import RekordboxCrateStatsSample from '../../data/rekordbox_sample_03.txt'

let hrefValue, downloadValue

const DemoFileLink = ({ platform }) => {
	if (platform.name === 'Serato') {
		hrefValue = SeratoCrateStatsSample
		downloadValue = 'serato_crate_stats_sample.csv'
	} else if (platform.name === 'Rekordbox') {
		hrefValue = RekordboxCrateStatsSample
		downloadValue = 'rekordbox_crate_stats_sample.txt'
	} else if (platform.name === 'Traktor') {
		hrefValue = TraktorCrateStatsSample
		downloadValue = 'traktor_crate_stats_sample.txt'
	}

	return (
		<Typography
			sx={{
				textAlign: 'center',
				fontSize: '14px',
				marginTop: '20px',
				paddingBottom: '15px',
				color: 'white',
			}}
		>
			Don't have {platform.name}? Grab a{' '}
			<span>
				<a
					style={{ color: '#c5e1a5', fontWeight: '400' }}
					href={hrefValue}
					download={downloadValue}
					target='_blank'
					rel='noreferrer'
				>
					test file
				</a>
			</span>{' '}
			to demo this page.
		</Typography>
	)
}

export default DemoFileLink
