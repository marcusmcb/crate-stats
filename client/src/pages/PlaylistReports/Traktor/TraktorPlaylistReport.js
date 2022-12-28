import { Fragment, useState, useRef, useEffect } from 'react'
import Titlebar from '../../../components/shared/Titlebar'
import TraktorFileInput from '../../../components/shared/TraktorFileInput'
import DragAndDrop from '../../../components/shared/DragAndDrop'
import axios from 'axios'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Modal from '@mui/material/Modal'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Divider } from 'semantic-ui-react'

import TimeText from '../../../components/shared/text_spans/timeText'
import TimesText from '../../../components/shared/text_spans/timesText'
import './traktorplaylistreport.css'

const TraktorPlaylistReport = () => {
  const [data, setData] = useState(null)
  const [isBusy, setIsBusy] = useState(true)
  const isInitialMount = useRef(true)

  const getDataFromTXT = (userData) => {
    axios.post('/sendTraktorFile', userData).then((response) => {
      console.log('* * * * * TRAKTOR RESPONSE FROM EXPRESS ')
      console.log(response)
      setData(response.data)
    })
  }

  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
      <TraktorFileInput getDataFromTXT={getDataFromTXT}/>
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
                  style={{ color: 'rgba(61, 37, 23, 0.8)', fontWeight: '400' }}
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
