import React, { Fragment } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const KeyData = (keydata) => {
  return (
    <Fragment>
      <div>
        <Typography
          sx={{ fontSize: 20 }}
          color='#c5e1a5'
          fontWeight={500}
          gutterBottom
        >
          key data:
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid item xs={12} md={5} sm={12} lg={6}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item sx={3} mt={1}>
                    <Typography>most common key:</Typography>
                  </Grid>
                  <Grid item sx={3}>
                    <Typography
                      variant='h4'
                      component='div'
                      fontWeight={500}
                      sx={{ color: '#558b2f' }}
                    >
                      {keydata.data.most_common_key.key}
                    </Typography>
                  </Grid>
                  <Grid item sx={3} mt={0.5}>
                    <Typography
                      variant='h5'
                      component='div'
                      fontWeight={400}
                      sx={{ color: '#558b2f' }}
                    >
                      (played {keydata.data.most_common_key.times_played} times)
                    </Typography>
                  </Grid>
                  <Grid item sx={3} mt={1}>
                    <Typography>least common key:</Typography>
                  </Grid>
                  <Grid item sx={3}>
                    <Typography
                      variant='h4'
                      component='div'
                      fontWeight={500}
                      sx={{ color: '#558b2f' }}
                    >
                      {keydata.data.least_common_key.key}
                    </Typography>
                  </Grid>
                  <Grid item sx={3} mt={0.5}>
                    <Typography
                      variant='h5'
                      component='div'
                      fontWeight={400}
                      sx={{ color: '#558b2f' }}
                    >
                      (played {keydata.data.least_common_key.times_played}{' '}
                      times)
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </div>
    </Fragment>
  )
}

export default KeyData
