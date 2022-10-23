import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Grid, Button, Divider } from 'semantic-ui-react'
import Titlebar from "../components/shared/Titlebar";

import './style/pageselect.css'

const PageSelect = () => {
  return (
    <Fragment>
      <Titlebar />
      <Divider />
      <Grid divided='vertically' centered padded='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column width={6}>
            <Card
              fluid
              header='Live Playlist Report'
              meta='Serato Live Playlist Analysis'
              description={[
                'Enter your Serato Live Playlist link to get real time analytics for your DJ set or stream.',
              ].join('')}
            />
            <Button basic animated color='black'>
              <Button.Content visible>
                <Icon name='headphones' />
              </Button.Content>
              <Button.Content hidden>
                <Link to='/livereport'>
                  <Icon name='arrow right' />
                </Link>
              </Button.Content>
            </Button>
          </Grid.Column>
          <Grid.Column width={6}>
            <Card
              fluid
              header='Post Playlist Analysis'
              meta='Serato CSV Export'
              description={[
                'Export your playlist as a CSV file from Serato and use it to generate your crate stats.',
              ].join('')}
            />
            <Button basic animated color='black' onClick={() => {}}>
              <Button.Content visible>
                <Icon name='magnify' />
              </Button.Content>
              <Button.Content hidden>
                <Link to='/playlistreport'>
                  <Icon name='arrow right' />
                </Link>
              </Button.Content>
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  )
}

export default PageSelect
