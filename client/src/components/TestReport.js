import React, { Fragment } from 'react'
import Titlebar from './Titlebar'

import './TestPage.css'

const TestReport = () => {
  return (
    <Fragment>
      <Titlebar />
      <div className='testpage-body'>
        <div className='data-block'>
          <div className='data-block-toprow'>
            <div className='data-block-primary'>
              <div className='data-block-primary-header'>
                Total Tracks Played
              </div>
              <div className='data-block-primary-value'>64</div>
            </div>
            <div className='data-block-secondary'>
              <div className='data-block-secondary-column-left'>
                <div className='data-block-secondary-header'>
                  Longest Track:
                </div>
                <div className='data-block-secondary-value'>
                  Your Mom Is A Cab Driver (4:35)
                </div>
                <div className='data-block-secondary-caption'>
                  (played at <span className='secondary-caption'>8:32 PM</span>)
                </div>                
                <div className='data-block-secondary-header'>
                  Longest Track:
                </div>
                <div className='data-block-secondary-value'>
                  Your Mom Is A Cab Driver (4:35)
                </div>
                <div className='data-block-secondary-caption'>
                  (played at <span className='secondary-caption'>8:32 PM</span>)
                </div>                
              </div>
              <div className='data-block-secondary-column-right'>
                <div className='data-block-tertiary-header'>
                  Average Track Length
                </div>
                <div className='data-block-tertiary-value'>2:33</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default TestReport
