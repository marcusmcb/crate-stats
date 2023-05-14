import React from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const DataMissing = (data) => {
  
  let returnText

  if (data.data.value === 'doubles') {
    returnText = 'No doubles were detected in this set'
  }
  if (data.data.value === 'key') {
    returnText = 'No key data available for this set'
  }
  if (data.data.value === 'year') {
    returnText = 'No year data available for this set'
  }
  if (data.data.value === 'bpm') {
    returnText = 'No bpm data available for this set'
  }
  if (data.data.value === 'deck') {
    returnText = 'No deck data available for this set'
  }
  if (data.data.value === 'genre') {
    returnText = 'No genre data available for this set'
  }
  if (data.data.value === 'track') {
    returnText = 'No track data available for this set'
  }
  if (data.data.value === 'playlist') {
    returnText = 'No playlist data available for this set'
  }
  if (data.data.value === 'artist') {
    returnText = 'No artist data available for this set'
  }
  if (data.data.value === 'album') {
    returnText = 'No album data available for this set'
  }
  if (data.data.value === 'rating') {
    returnText = 'No rating data available for this set'
  }

  return (
    <div>
      <Typography
        sx={{ fontSize: 20 }}
        color='#c5e1a5'
        fontWeight={500}
        gutterBottom
      >
        {data.data.value} data:
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid item md={5} sm={12}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid mt={3}>
                  <Typography
                    sx={{ fontSize: 16, fontWeight: '500', marginLeft: '15px' }}
                  >
                    {returnText}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </div>
  )
}

export default DataMissing
