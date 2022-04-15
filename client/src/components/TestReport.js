import React, { Fragment } from 'react'
import Titlebar from './Titlebar'

import './TestPage.css'

const TestReport = () => {
  return (
    <Fragment>
      <Titlebar />
      <div className='testpage-body'>
        <div className='testpage-headerblock'>
          <div className='headerblock-text'>
            <p>Playlist Stats For:</p>
            <p>Playlist Stats For DJ Marcus McBride</p>
          </div>
          <div className='headerblock-text'>
            <p>Playlist Title</p>
            <p>March 29th, 2022</p>
          </div>
        </div>

        <div className='testpage-trackblock'>
          <div className='trackblock-text'>
            <p>Track Stats:</p>
            <div>
              <p>(data viz goes here)</p>
            </div>
          </div>
          <div className='trackblock-text'>
            <p>Total Tracks Played:</p>
            <p>Average Track Length:</p>
            <p>Longest Track:</p>
            <p>Shortest Track:</p>
          </div>
        </div>
        <div>
          <div className='trackblock-dataviz'>HERE</div>
        </div>
        
        <div className='testpage-block'>
          <p>Deck Stats:</p>
        </div>
        <div className='testpage-block'>
          <p>BPM Data:</p>
        </div>
        <div className='testpage-block'>
          <p>Genre Data:</p>
        </div>
        <div className='testpage-block'>
          <p>Key Data:</p>
        </div>
        <div className='testpage-block'>
          <p>Year Data:</p>
        </div>
        <div className='testpage-block'>
          <p>Doubles Data:</p>
        </div>
      </div>
    </Fragment>
  )
}

export default TestReport
