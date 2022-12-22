import { Fragment, useState, useRef, useEffect } from 'react'
import Titlebar from '../../../components/shared/Titlebar'
import TraktorFileInput from '../../../components/shared/TraktorFileInput'
import DragAndDrop from '../../../components/shared/DragAndDrop'
import axios from 'axios'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import './traktorplaylistreport.css'

const TraktorPlaylistReport = () => {
  const [data, setData] = useState(null)
  const [isBusy, setIsBusy] = useState(true)
  const isInitialMount = useRef(true)

  const getDataFromCSV = (userData) => {
    axios.post('/sendTraktorFile', userData).then((response) => {
      console.log('* * * * * TRAKTOR RESPONSE FROM EXPRESS ')
      console.log(response.data)
      setData(response.data)
    })
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      setIsBusy(false)
    }
  })

  return (
    <Fragment>
      <Titlebar />
      {/* <DragAndDrop /> */}
      <TraktorFileInput/>
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
                          Upload or drop your exported Traktor TXT file above to
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
              Don't have Traktor? Grab a{' '}
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

export default TraktorPlaylistReport
