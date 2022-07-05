import React from 'react'

const YearData = (yeardata) => {
  return (
    <div>
      {/* ****************************************** */}
      {/* ************ YEAR DATA ******************* */}
      {/* ****************************************** */}
      <div className='data-block-title'>Year Data</div>
      <div className='data-block-toprow'>
        <div className='toprow-container'>
          <div className='data-block-primary'>
            {/* ****************************************** */}
            {/* *********** AVERAGE YEAR DATA ************ */}
            {/* ****************************************** */}
            <div className='data-block-primary-header'>Average Year:</div>
            <div className='data-block-primary-value-main'>
              {yeardata.data.average_year}
            </div>
          </div>
          <div className='data-block-secondary'>
            <div className='secondary-container'>
              {/* ****************************************** */}
              {/* ************ BPM RANGE ******************* */}
              {/* ****************************************** */}
              <div className='secondary-container-header'>
                Newest Track Year:
              </div>
              <div className='secondary-container-value'>
                {yeardata.data.newest_track.year}
              </div>
            </div>
          </div>
          <div className='data-block-third'>
            <div className='tertiary-container'>
              <div className='tertiary-item'>
                {/* ****************************************** */}
                {/* *********** BIGGEST BPM CHANGE *********** */}
                {/* ****************************************** */}
                <div className='tertiary-item-header'>
                  Oldest Track: <span className='text-white'></span>
                </div>
                <div className='timer-line'>
                  {yeardata.data.oldest_track.artist} -{' '}
                  {yeardata.data.oldest_track.name}
                </div>
                <div className='tertiary-item-caption'>                  
                  <span className='tertiary-item-timestamp'>({yeardata.data.oldest_track.year})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YearData

// DEV NOTES FOR YEARDATA.JS
//
// add top 5 "newest" tracks in return from serato report
// horiztonal row for oldest track with row for top 5 beneath it
// average track year to the left of both
