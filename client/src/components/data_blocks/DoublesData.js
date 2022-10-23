import React, { Fragment } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Divider } from 'semantic-ui-react'

const DoublesData = (doublesdata) => {
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
            <Grid item xs={12} md={6} sm={12} lg={6}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  {/* crate stats card */}
                  <Typography>deck 1 doubles playtime:</Typography>
                  <Typography
                    variant='h4'
                    component='div'
                    fontWeight={500}
                    sx={{ color: '#558b2f' }}
                  >
                    {doublesdata.data.deck_1_doubles_playtime.slice(4)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} sm={12} lg={6}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  {/* crate stats card */}
                  <Typography>deck 2 doubles playtime:</Typography>
                  <Typography
                    variant='h4'
                    component='div'
                    fontWeight={500}
                    sx={{ color: '#558b2f' }}
                  >
                    {doublesdata.data.deck_2_doubles_playtime.slice(4)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item sx={3} mt={1}>
                      <Typography fontWeight={500}>
                        doubles detected:
                      </Typography>
                    </Grid>
                    <Grid item sx={3}>
                      <Typography
                        variant='h4'
                        component='div'
                        fontWeight={500}
                        sx={{ color: '#558b2f' }}
                      >
                        {doublesdata.data.doubles_detected}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container spacing={2}>
                    <Grid item sx={3}>
                      {doublesdata.data.doubles_played.map((item) => (
                        <Typography
                          component='div'
                          fontWeight={500}
                          sx={{ fontSize: 16 }}
                        >
                          {item.artist} - {item.name}{' '}
                        </Typography>
                      ))}
                    </Grid>
                  </Grid>
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
