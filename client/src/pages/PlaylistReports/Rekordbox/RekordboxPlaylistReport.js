import React, { Fragment, useState } from 'react'
import Titlebar from '../../../components/shared/Titlebar'
import RekordboxFileInput from '../../../components/shared/RekordboxFileInput'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import './rekordboxplaylistreport.css'

const RekordboxPlaylistReport = () => {
  const [isBusy, setIsBusy] = useState(true)
  return (
    <Fragment>
      <Titlebar />
      {/* <DragAndDrop /> */}
      <RekordboxFileInput />
      <div className='playlistreport-body'>
        {isBusy ? (
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
                          Upload or drop your exported Rekordbox TXT file above to
                          view your CrateStats analysis.
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
              Don't have Rekordbox? Grab a{' '}
              <span>
                <a
                  style={{ color: '#c5e1a5', fontWeight: '400' }}
                  href={'/'}
                  download=''
                  target='_blank'
                  rel='noreferrer'
                >
                  test file
                </a>
              </span>{' '}
              to demo this page.
            </Typography>
          </div>
        ) : (
          <div>Has Data</div>
        )}
      </div>
    </Fragment>
  )
}

export default RekordboxPlaylistReport
