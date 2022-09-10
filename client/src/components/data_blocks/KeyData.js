import React from 'react'

const KeyData = (keydata) => {
  return (
    <div>
      {/* ****************************************** */}
      {/* *********** KEY DATA **************** */}
      {/* ****************************************** */}
      <div className='data-block-title'>Key Data</div>
      <div className='data-block-toprow'>
        <div className='toprow-container'>
          <div className='data-block-primary'>
            {/* ****************************************** */}
            {/* *********** PLAYLIST ARTIST / TITLE DATA * */}
            {/* ****************************************** */}
            <div className='playlist-block-primary-header'>Most Common Key:</div>
            <div className='playlist-block-primary-value-main'>
              {keydata.data.most_common_key.key}
            </div>
          </div>
          <div className='data-block-primary'>
            {/* ****************************************** */}
            {/* *********** PLAYLIST ARTIST / TITLE DATA * */}
            {/* ****************************************** */}
            <div className='playlist-block-primary-header'>Least Common Key:</div>
            <div className='playlist-block-primary-value-main'>
              {keydata.data.least_common_key.key}
            </div>
          </div>          
        <div/>          
        </div>
      </div>
      <div className='data-block-bottomrow'></div>
    </div>
  )
}

export default KeyData