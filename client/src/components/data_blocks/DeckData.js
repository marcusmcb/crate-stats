import React from 'react'

const DeckData = (deckdata) => {
  return (
    <div>
      {/* ****************************************** */}
      {/* *********** DECK DATA **************** */}
      {/* ****************************************** */}
      <div className='data-block-title'>Deck Data</div>
      <div className='data-block-toprow'>
        <div className='toprow-container'>
          <div className='data-block-primary'>
            {/* ****************************************** */}
            {/* *********** DECK 1 DATA * */}
            {/* ****************************************** */}
            <div className='playlist-block-primary-header'>
              Deck 1 Average Playtime:
            </div>
            <div className='playlist-block-primary-value-main'>
              {deckdata.data.deck_1_average.slice(1)}
            </div>
          </div>
          <div className='data-block-primary'>
            {/* ****************************************** */}
            {/* *********** DECK 2 DATA * */}
            {/* ****************************************** */}
            <div className='playlist-block-primary-header'>
              Deck 2 Average Playtime:
            </div>
            <div className='playlist-block-primary-value-main'>
              {deckdata.data.deck_2_average.slice(1)}
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
                Missing Deck Values:
              </div>
              <div className='playlist-tertiary-value'>
                {deckdata.data.missing_deck_values}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='data-block-bottomrow'></div>
    </div>
  )
}

export default DeckData
