import React, { Fragment, useState } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import InfoIcon from '@mui/icons-material/Info'
import { Divider } from 'semantic-ui-react'
import Modal from '@mui/material/Modal'

const DoublesData = ({ doublesData }) => {
  const [openL, setOpenL] = useState(false)
  const handleOpenL = () => setOpenL(true)
  const handleCloseL = () => setOpenL(false)

  const [openR, setOpenR] = useState(false)
  const handleOpenR = () => setOpenR(true)
  const handleCloseR = () => setOpenR(false)

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
    <Fragment>
      <div>
        <Typography
          sx={{ fontSize: 20 }}
          color='#c5e1a5'
          fontWeight={500}
          gutterBottom
        >
          doubles data:
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} sm={6} lg={6}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  {/* crate stats card */}
                  <Typography>
                    deck 1 doubles playtime:{' '}
                    <span>
                      <InfoIcon
                        onClick={() => {                          
                          handleOpenL()
                        }}
                        style={{ paddingBottom: '5px' }}
                      />
                    </span>
                  </Typography>
                  <Typography
                    variant='h4'
                    component='div'
                    fontWeight={500}
                    sx={{ color: '#558b2f' }}
                  >
                    {doublesData.deck_1_doubles_playtime}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} sm={6} lg={6}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  {/* crate stats card */}
                  <Typography>
                    deck 2 doubles playtime:{' '}
                    <span>
                      <InfoIcon
                        onClick={() => {                          
                          handleOpenR()
                        }}
                        style={{ paddingBottom: '5px' }}
                      />
                    </span>
                  </Typography>
                  <Typography
                    variant='h4'
                    component='div'
                    fontWeight={500}
                    sx={{ color: '#558b2f' }}
                  >
                    {doublesData.deck_2_doubles_playtime}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item mt={1}>
                      <Typography fontWeight={500}>
                        doubles detected:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant='h4'
                        component='div'
                        fontWeight={500}
                        sx={{ color: '#558b2f' }}
                      >
                        {doublesData.doubles_detected}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container spacing={2}>
                    <Grid item>
                      {doublesData.doubles_played.map((item, i) => (
                        <Typography
                          component='div'
                          fontWeight={500}
                          sx={{ fontSize: 16 }}
                          key={i}
                        >
                          {item.artist} - {item.name}{' '}
                        </Typography>
                      ))}
                    </Grid>
                  </Grid>
                  <Modal
                    open={openL}
                    onClose={handleCloseL}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                  >
                    <Box sx={style}>
                      <Typography
                        id='modal-modal-title'
                        variant='h6'
                        component='h2'
                        style={{ color: '#558b2f' }}
                      >
                        When playing the same track on both decks...
                      </Typography>
                      <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        You played that track on deck 1 for an average of {' '}
                        <span style={{ color: '#558b2f', fontWeight: '600' }}>
                          {doublesData.deck_1_doubles_playtime}
                        </span>{' '}
                        during this set.
                      </Typography>
                    </Box>
                  </Modal>
                  <Modal
                    open={openR}
                    onClose={handleCloseR}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                  >
                    <Box sx={style}>
                      <Typography
                        id='modal-modal-title'
                        variant='h6'
                        component='h2'
                        style={{ color: '#558b2f' }}
                      >
                        When playing the same track on both decks...
                      </Typography>
                      <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        You played that track on deck 2 for an average of {' '}
                        <span style={{ color: '#558b2f', fontWeight: '500' }}>
                          {doublesData.deck_2_doubles_playtime}
                        </span>{' '}
                        during this set.
                      </Typography>
                    </Box>
                  </Modal>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Fragment>
  )
}

export default DoublesData
