import React from 'react'

const DoublesData = (doublesdata) => {
  return (
    <div>
      {/* ****************************************** */}
      {/* *********** DOUBLES DATA **************** */}
      {/* ****************************************** */}
      <div className='data-block-title'>Doubles Data</div>
      <div className='data-block-toprow'>
        <div className='toprow-container'>
          <div className='data-block-primary'>
            {/* ****************************************** */}
            {/* *********** DECK 1 PLAYTIME DATA ********* */}
            {/* ****************************************** */}
            <div className='playlist-block-primary-header'>
              Deck 1 Doubles Playtime:
            </div>
            <div className='playlist-block-primary-value-main'>
              {doublesdata.data.deck_1_doubles_playtime.slice(4)}
            </div>
          </div>
          <div className='data-block-primary'>
            {/* ****************************************** */}
            {/* *********** DECK 2 PLAYTIME DATA ********* */}
            {/* ****************************************** */}
            <div className='playlist-block-primary-header'>
              Deck 2 Doubles Playtime:
            </div>
            <div className='playlist-block-primary-value-main'>
            {doublesdata.data.deck_2_doubles_playtime.slice(4)}
            </div>
          </div>
        </div>
        <div className='data-block-third'>
          <div className='tertiary-container'>
            <div className='tertiary-item'>
              {/* ****************************************** */}
              {/* ************** SET DATE & START TIME ***** */}
              {/* ****************************************** */}
              <div className='playlist-tertiary-header'>
                Doubles Detected:
              </div>
              <div className='playlist-tertiary-value'>
                {doublesdata.data.doubles_detected}
              </div>
              <div className='playlist-tertiary-header'>
                Doubles Played:
              </div>
              {
                doublesdata.data.doubles_played.map(item => <div className='playlist-tertiary-value'>{item.artist} - {item.name}</div>)
              }
              {/* <div className='playlist-tertiary-value'>
                {doublesdata.data.doubles_detected}
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className='data-block-bottomrow'></div>
    </div>
  )
}

export default DoublesData
