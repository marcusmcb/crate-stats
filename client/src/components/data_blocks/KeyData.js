import React from 'react'
import './keydata.css'

const KeyData = (keydata) => {
  return (
    <div>
      {/* ***************************************** */}
      {/* ************ KEY DATA ******************* */}
      {/* ***************************************** */}
      <div className='data-block-title'>Key Data</div>
      <div className='keydata-block-toprow'>
        <div className='keydata-toprow-container'>
          <div className='keydata-block-secondary'>
            <div className='keydata-secondary-container'>
              {/* ****************************************** */}
              {/* ************ MOST COMMON KEY ************* */}
              {/* ****************************************** */}
              <div className='keydata-secondary-container-header'>
                Most Common Key:
              </div>
              <div className='keydata-secondary-container-value'>
                {keydata.data.most_common_key.key}
              </div>
              <div className='keydata-secondary-container-data'>
                (played {keydata.data.most_common_key.times_played} times)
              </div>
            </div>
            <div className='keydata-secondary-container'>
              {/* ****************************************** */}
              {/* ************ MOST COMMON KEY ************* */}
              {/* ****************************************** */}
              <div className='keydata-secondary-container-header'>
                Least Common Key:
              </div>
              <div className='keydata-secondary-container-value'>
                {keydata.data.least_common_key.key}
              </div>
              <div className='keydata-secondary-container-data'>
                (played {keydata.data.least_common_key.times_played} times)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KeyData

// add logic in serato report to return and display
// total array of keys played and values for each
