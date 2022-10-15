import React, { Fragment } from 'react'
import { Card, Icon, Grid, Segment } from 'semantic-ui-react'
import Titlebar from './shared/Titlebar'

import './pageselect.css'

const PageSelect = () => {
  return (
    <Fragment>
      <Titlebar />
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Card              
              header='Live Playlist Report'
              meta='Serato Live'
              description={[
                'Get a real time playlist analysis from Serato'
              ].join('')}
            />
          </Grid.Column>
          <Grid.Column>
            <Card              
              header='Post Playlist Analysis'
              meta='Serato CSV Export'
              description={[
                'Export your Serato playlist as a CSV and get an analysis report'
              ].join('')}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  )
}

export default PageSelect
