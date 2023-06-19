import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
// import Button from '@mui/material/Button'

import './style/titlebar.css'

const Titlebar = () => {
  let title = 'crate<>stats'

  return (
    <div className='titlebar'>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        {/* <Grid item>          
          <Button
            variant='contained'
            sx={{
              backgroundColor: 'darkslategrey',
              ':hover': { backgroundColor: 'slategrey', color: 'white' },
            }}
            component={Link}
            to={'/playlists'}
          >
            Playlists
          </Button>
        </Grid> */}
        <Grid item>
          <Link
            style={{
              color: 'white',
              padding: '10px',
              textDecoration: 'none',
            }}
            to={'/'}
          >
            <span style={{ color: 'yellow', fontSize: '40px' }}>{title}</span>
          </Link>
        </Grid>
        {/* <Grid item>
          <Button
            variant='contained'
            sx={{
              backgroundColor: 'darkslategrey',
              ':hover': { backgroundColor: 'slategrey', color: 'white' },
            }}
            component={Link}
            to={'/sitestats'}
          >
            Site Stats
          </Button>
        </Grid> */}
      </Box>
    </div>
  )
}

export default Titlebar
