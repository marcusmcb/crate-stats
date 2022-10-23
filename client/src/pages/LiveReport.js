import React, { useState, Fragment } from 'react'
import axios from 'axios'

import { Icon, Form, Divider, Container, Header } from 'semantic-ui-react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'

import parseDay from '../scripts/parseDay'
import parseDisplayName from '../scripts/parseDisplayName'
import Titlebar from '../components/shared/Titlebar'
import './livereport.css'
import { OutlinedInput, Typography } from '@mui/material'

const LiveReport = () => {
  const [isData, setIsData] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)
  const [isBusy, setIsBusy] = useState(false)
  const [url, setUrl] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [playlistDate, setPlaylistDate] = useState([])
  const [playlistData, setPlaylistData] = useState({})
  const [playlistName, setPlaylistName] = useState('')

  console.log(url)

  const getReport = async (e) => {
    e.preventDefault()
    setIsBusy(true)
    await axios
      .post('http://localhost:5000/liveplaylist', { url: url })
      .then((response) => {
        // check if playlist url is set to private
        if (response.data === '') {
          setIsPrivate(true)
          setIsBusy(false)
        } else {
          console.log(response.data)
          setPlaylistData(response.data)
          let userName = parseDisplayName(url)
          let dateValue = response.data.playlistDate
          let displayDay = parseDay(response.data.playlistDate)
          // check for playlist title
          if (
            response.data.playlistTitle.charAt(
              response.data.playlistTitle.length - 5
            ) === '/'
          ) {
            setPlaylistName('')
          } else {
            setPlaylistName(response.data.playlistTitle)
          }

          setPlaylistDate([dateValue, displayDay])
          setDisplayName(userName)
          setIsData(true)
          setIsBusy(false)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    setUrl('')
  }

  const handleChange = (e) => {
    setIsData(false)
    setIsPrivate(false)
    setUrl(e.target.value)
  }

  return (
    <div className='pagebody'>
      <Fragment>
        <Titlebar />
        <Divider />
        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Grid item>
            <Card sx={{ midWidth: 275, boxShadow: 'none' }}>
              <CardContent>
                <Grid>
                  <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                    Enter your Serato Live Playlist URL below
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Box>
        <Box component='form' sx={{ flexGrow: 1, textAlign: 'center' }}>
          <FormControl sx={{ width: '40vw' }}>
            <OutlinedInput
              placeholder='your URL goes here'
              value={url}
              onChange={handleChange}
            />
            <Button
              type='submit'
              variant='outlined'
              onClick={getReport}
              sx={{
                maxWidth: '100px',
                marginTop: '20px',
                alignSelf: 'center',
                borderColor: 'black',
                color: 'black',
              }}
            >
              Get Stats
            </Button>
          </FormControl>
        </Box>
        {isData ? (
          <div>Data</div>
        ) : // <div>
        //   <Grid style={{ paddingTop: '20px' }}>
        //     <Grid.Row centered>
        //       <Grid.Column width={8}>
        //         {/* header */}
        //         <Card
        //           style={{ border: '1px solid lightgrey', padding: '20px' }}
        //         >
        //           <Header as='h2'>
        //             <Icon name='headphones' />
        //             <Header.Content>{displayName}</Header.Content>
        //           </Header>
        //           {playlistName === '' ? (
        //             <span></span>
        //           ) : (
        //             <Container text>{playlistName}</Container>
        //           )}
        //           <Container text>
        //             {playlistDate[1]}, {playlistDate[0]}
        //           </Container>
        //           <Container text>
        //             Start Time: {playlistData.setStartTime}
        //           </Container>
        //         </Card>
        //         {/* playlist data */}
        //         <Grid divided='vertically' style={{ paddingTop: '20px' }}>
        //           <Grid.Row columns={2} style={{ padding: '0', margin: '0' }}>
        //             <Grid.Column width={5}>
        //               <Header as='h4' color='blue'>
        //                 Set Length:
        //               </Header>
        //             </Grid.Column>
        //             <Grid.Column width={3}>
        //               {playlistData.setLength.setlengthhours === '0' ? (
        //                 <Container text>
        //                   {playlistData.setLength.setlengthminutes} Minutes,{' '}
        //                   {playlistData.setLength.setlengthseconds} Seconds
        //                 </Container>
        //               ) : playlistData.setLength.setlengthhours === '1' ? (
        //                 <Container text>
        //                   {playlistData.setLength.setlengthhours} Hour,{' '}
        //                   {playlistData.setLength.setlengthminutes} Minutes
        //                 </Container>
        //               ) : (
        //                 <Container text>
        //                   {playlistData.setLength.setlengthhours} Hours,{' '}
        //                   {playlistData.setLength.setlengthminutes} Minutes
        //                 </Container>
        //               )}
        //             </Grid.Column>
        //           </Grid.Row>
        //         </Grid>
        //         <Grid divided='vertically'>
        //           <Grid.Row columns={2} style={{ padding: '0', margin: '0' }}>
        //             <Grid.Column width={5}>
        //               <Header as='h4' color='blue'>
        //                 Total Tracks Played:
        //               </Header>
        //             </Grid.Column>
        //             <Grid.Column width={3}>
        //               <Container text>
        //                 {playlistData.totalTracksPlayed}
        //               </Container>
        //             </Grid.Column>
        //           </Grid.Row>
        //         </Grid>
        //         <Grid divided='vertically'>
        //           <Grid.Row columns={2} style={{ padding: '0', margin: '0' }}>
        //             <Grid.Column width={5}>
        //               <Header as='h4' color='blue'>
        //                 Average Track Length:
        //               </Header>
        //             </Grid.Column>
        //             <Grid.Column width={3}>
        //               {playlistData.avgTrackLength.minutes == '0' ? (
        //                 <Container text>
        //                   {playlistData.avgTrackLength.seconds} Seconds
        //                 </Container>
        //               ) : playlistData.avgTrackLength.minutes == '1' ? (
        //                 <Container text>
        //                   {playlistData.avgTrackLength.minutes} Minute,{' '}
        //                   {playlistData.avgTrackLength.seconds} Seconds
        //                 </Container>
        //               ) : (
        //                 <Container text>
        //                   {playlistData.avgTrackLength.minutes} Minutes,{' '}
        //                   {playlistData.avgTrackLength.seconds} Seconds
        //                 </Container>
        //               )}
        //             </Grid.Column>
        //           </Grid.Row>
        //         </Grid>
        //         <Grid divided='vertically'>
        //           <Grid.Row columns={2} style={{ padding: '0', margin: '0' }}>
        //             <Grid.Column width={5}>
        //               <Header as='h4' color='blue'>
        //                 Shortest Track:
        //               </Header>
        //             </Grid.Column>
        //             <Grid.Column width={3}>
        //               <Container text>
        //                 {playlistData.shortestTrack.name}
        //               </Container>
        //             </Grid.Column>
        //           </Grid.Row>
        //         </Grid>
        //         <Grid divided='vertically'>
        //           <Grid.Row columns={2} style={{ padding: '0', margin: '0' }}>
        //             <Grid.Column width={5}>
        //               <Header as='h4' color='blue'>
        //                 Longest Track:
        //               </Header>
        //             </Grid.Column>
        //             <Grid.Column width={3}>
        //               <Container text>
        //                 {playlistData.longestTrack.name}
        //               </Container>
        //             </Grid.Column>
        //           </Grid.Row>
        //         </Grid>
        //         {playlistData.doublesPlayed.length != 0 ? (
        //           <div>Has Doubles</div>
        //         ) : (
        //           <Grid divided='vertically'>
        //             <Grid.Row
        //               columns={1}
        //               style={{ padding: '0', margin: '0' }}
        //             >
        //               <Grid.Column width={10}>
        //                 <Header as='h4' color='blue'>
        //                   No doubles detected in this set.
        //                 </Header>
        //               </Grid.Column>
        //             </Grid.Row>
        //           </Grid>
        //         )}
        //       </Grid.Column>
        //     </Grid.Row>
        //   </Grid>
        // </div>
        isPrivate ? (
          <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Grid item>
              <Card sx={{ midWidth: 275, boxShadow: 'none' }}>
                <CardContent>
                  <Grid>
                    <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                      Either this playlist is set to private or the URL you've
                      entered is invalid
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Box>
        ) : isBusy ? (
          <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Grid item>
              <Card sx={{ midWidth: 275, boxShadow: 'none' }}>
                <CardContent>
                  <Grid>
                    <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                      Awaiting data...
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Box>
        ) : (
          <div></div>
        )}
      </Fragment>
    </div>
  )
}

export default LiveReport

// add color scaling on stat values to display comparison to aggregate (over/under)
// add url validation to input field
