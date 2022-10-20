import React, { Fragment } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const DataMissing = (data) => {

  console.log(data)
  let returnText

  switch (data) {
    case data.data.doubles_data.has_doubles_data === false:
      returnText = "No doubles were detected in this set"
    case data.data.key_data.has_key_data === false:
      returnText = "No key data available for this set"
    case data.data.year_data.has_year_data === false:
      returnText = "No year data available for this set"  
  }

  // if (data.data.doubles_data.has_doubles_data === false) {
  //   returnText = "No doubles were detected in this set"
  // } 
  // if (data.data.key_data.has_key_data === false) {
  //   returnText = "No key data available for this set"
  // } 
  // if (data.data.year_data.has_year_data === false) {
  //   returnText = "No year data available for this set"
  // }

  
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid item md={5} sm={12}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item sx={3} mt={1.5}>
                  <Typography sx={{ fontSize: 16, fontWeight: '500' }}>
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
