import React, { Fragment } from 'react'
import Typography from '@mui/material/Typography'

const Summary = () => {
  return (
    <Fragment>
      <div>
        <Typography
          sx={{ fontSize: 20 }}
          color='#c5e1a5'
          fontWeight={500}
          gutterBottom
        >
          crate stats summary:
        </Typography>
      </div>
    </Fragment>
  )
}

export default Summary
