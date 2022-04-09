<Col className='data-ui-column-left'>
  <Row className='data-ui-playlist-panel g-0'>
    <Col className='data-ui-playlist-title'>
      {/* <p>CrateStats for</p> */}
      <p>{displayName}</p>
    </Col>
    <Col className='data-ui-playlist-date'>
      <p>
        {playlistDate[1]}, {playlistDate[0]}
      </p>
      <p>Set began @ {playlistData.setStartTime}</p>
    </Col>
  </Row>
  <Row className='data-ui-playlist-stats g-0'>
    {playlistData.setLength.setlengthhours === '0' ? (
      <Fragment>
        <div className='playlist-stats-row'>
          <div>Set Length:</div>
          <div>
            {playlistData.setLength.setlengthminutes} Minutes,{' '}
            {playlistData.setLength.setlengthseconds} Seconds
          </div>
        </div>
      </Fragment>
    ) : playlistData.setLength.setlengthhours === '1' ? (
      <Fragment>
        <div className='playlist-stats-row'>
          <div>Set Length:</div>
          <div>
            {playlistData.setLength.setlengthhours} Hour,{' '}
            {playlistData.setLength.setlengthminutes} Minutes
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className='playlist-stats-row'>
          <div>Set Length:</div>
          <div>
            {playlistData.setLength.setlengthhours} Hours,{' '}
            {playlistData.setLength.setlengthminutes} Minutes
          </div>
        </div>
      </Fragment>
    )}
  </Row>
  <Row className='data-ui-playlist-stats g-0'>
    <div className='playlist-stats-row'>
      <div>Total Tracks Played:</div>
      <div>{playlistData.totalTracksPlayed}</div>
    </div>
  </Row>
  <Row className='data-ui-playlist-stats g-0'>
    {playlistData.avgTrackLength.seconds == '0' ? (
      <Fragment>
        <div className='playlist-stats-row'>
          <div>Average Track Length:</div>
          <div>{playlistData.avgTrackLength.minutes} Minutes</div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className='playlist-stats-row'>
          <div>Average Track Length:</div>
          <div>
            {playlistData.avgTrackLength.minutes} Minutes,{' '}
            {playlistData.avgTrackLength.seconds} Seconds
          </div>
        </div>
      </Fragment>
    )}
  </Row>
  <Row className='data-ui-playlist-stats g-0'>
    {playlistData.shortestTrack.minutes == '0' ? (
      <Fragment>
        <div className='playlist-stats-row'>
          <div>Shortest Track Played:</div>
          <div>{playlistData.shortestTrack.seconds} Seconds</div>
        </div>
      </Fragment>
    ) : playlistData.shortestTrack.minutes == '1' ? (
      <Fragment>
        <div className='playlist-stats-row'>
          <div>Shortest Track Played:</div>
          <div>
            {playlistData.shortestTrack.minutes} Minute,{' '}
            {playlistData.shortestTrack.seconds} Seconds
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className='playlist-stats-row'>
          <div>Shortest Track Played:</div>
          <div>
            {playlistData.shortestTrack.minutes} Minutes,{' '}
            {playlistData.shortestTrack.seconds} Seconds
          </div>
        </div>
      </Fragment>
    )}
  </Row>
  <Row className='data-ui-playlist-stats g-0'>
    {playlistData.longestTrack.minutes == '0' ? (
      <Fragment>
        <div className='playlist-stats-row'>
          <div>Longest Track Played:</div>
          <div>{playlistData.longestTrack.seconds} Seconds</div>
        </div>
      </Fragment>
    ) : playlistData.longestTrack.minutes == '1' ? (
      <Fragment>
        <div className='playlist-stats-row'>
          <div>Longest Track Played:</div>
          <div>
            {playlistData.longestTrack.minutes} Minute,{' '}
            {playlistData.longestTrack.seconds} Seconds
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className='playlist-stats-row'>
          <div>Longest Track Played:</div>
          <div>
            {playlistData.longestTrack.minutes} Minutes,{' '}
            {playlistData.longestTrack.seconds} Seconds
          </div>
        </div>
      </Fragment>
    )}
  </Row>
</Col>
