import React, { Fragment } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const DeckData = (deckdata) => {
  return (
    <Fragment>
      <div>
        <Typography
          sx={{ fontSize: 20 }}
          color='#c5e1a5'
          fontWeight={500}
          gutterBottom
        >
          deck data:
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} sm={12} lg={6}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography>deck 1 average track playtime:</Typography>
                  <Typography
                    variant='h4'
                    component='div'
                    fontWeight={500}
                    sx={{ color: '#558b2f' }}
                  >
                    {deckdata.data.deck_1_average}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} sm={12} lg={6}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography>deck 2 average track playtime:</Typography>
                  <Typography
                    variant='h4'
                    component='div'
                    fontWeight={500}
                    sx={{ color: '#558b2f' }}
                  >
                    {deckdata.data.deck_2_average}
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
                        missing deck values:
                      </Typography>
                    </Grid>
                    <Grid item sx={3}>
                      <Typography
                        variant='h4'
                        component='div'
                        fontWeight={500}
                        sx={{ color: '#558b2f' }}
                      >
                        {deckdata.data.missing_deck_values}
                      </Typography>
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

export default DeckData
