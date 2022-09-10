import React from 'react'

const KeyData = (keydata) => {
  return (
    <div>
      {/* ****************************************** */}
      {/* *********** DATA **************** */}
      {/* ****************************************** */}
      <div className='data-block-title'>Key Data</div>
      <div className='data-block-toprow'>
        <div className='toprow-container'>
          <div className='data-block-primary'>
            {/* ****************************************** */}
            {/* *********** DATA * */}
            {/* ****************************************** */}
            <div className='playlist-block-primary-header'>Key Header:</div>
            <div className='playlist-block-primary-value-main'>
              Value
            </div>
          </div>
          <div className='data-block-secondary'>
            <div className='secondary-container'>              
              <div className='playlist-secondary-header'>Set Length</div>
              <div className='playlist-secondary-value'>Value</div>              
            </div>
          </div>
        </div>
        <div className='data-block-third'>
          <div className='tertiary-container'>
            <div className='tertiary-item'>
              {/* ****************************************** */}
              {/* ************** DATA ***** */}
              {/* ****************************************** */}
              <div className='playlist-tertiary-header'>Set Date:</div>
              <div className='playlist-tertiary-value'>
                Value
              </div>
              <div className='playlist-tertiary-header'>Set Start Time:</div>
              <div className='playlist-tertiary-value'>
                Other Value
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='data-block-bottomrow'></div>
    </div>
  )
}

export default KeyData