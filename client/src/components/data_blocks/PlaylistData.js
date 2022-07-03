import React from 'react'

import MinutesText from '../text_spans/minutesText'
import SecondsText from '../text_spans/secondsText'
import MinuteText from '../text_spans/minuteText'
import SecondText from '../text_spans/secondText'
import HoursText from '../text_spans/hoursText'
import HourText from '../text_spans/hourText'

const PlaylistData = (playlistData) => {
  return (
    <div>
      {/* ****************************************** */}
      {/* *********** PLAYLIST DATA **************** */}
      {/* ****************************************** */}
      <div className='data-block-title'>Playlist Data</div>
      <div className='data-block-toprow'>
        <div className='toprow-container'>
          <div className='data-block-primary'>
            {/* ****************************************** */}
            {/* *********** PLAYLIST ARTIST / TITLE DATA * */}
            {/* ****************************************** */}
            {/* ********************** NOTE ************** */}
            {/* session artist field in serato dj pro is locked and cannot be edited */}
            {/* ****************************************** */}
            <div className='data-block-primary-header'>Crate Stats:</div>
            <div className='data-block-primary-value-main'>
              {playlistData.data.title}
            </div>
          </div>
          <div className='data-block-secondary'>
            <div className='secondary-container'>
              {/* ****************************************** */}
              {/* ************* SET LENGTH ***************** */}
              {/* ****************************************** */}
              <div className='secondary-container-header'>Set Length:</div>
              {playlistData.data.has_playlist_length === false ? (
                <h3>Has No Playlist Length</h3>
              ) : playlistData.data.playlist_length_formatted.hours > 1 ? (
                playlistData.data.playlist_length_formatted.minutes > 1 ? (
                  <h3>Hours And Minutes</h3>
                ) : (
                  <h3>Hours And Minute</h3>
                )
              ) : playlistData.data.playlist_length_formatted.hours === 1 ? (
                playlistData.data.playlist_length_formatted.minutes > 1 ? (
                  <h3>Hour And Minutes</h3>
                ) : (
                  <h3>Hour And Minute</h3>
                )
              ) : playlistData.data.playlist_length_formatted.minutes > 1 ? (
                <h3>Minutes</h3>
              ) : (
                <h3>Minute</h3>
              )}
            </div>
          </div>
        </div>
        <div className='data-block-third'>
          <div className='tertiary-container'>
            <div className='tertiary-item'>
              {/* ****************************************** */}
              {/* ************** SHORTEST TRACK DATA ******* */}
              {/* ****************************************** */}
              <div className='tertiary-item-header'>Set Date:</div>
              <div className='timer-line'>
                {playlistData.data.has_playlist_length === false ? (
                  <h3>No Playlist Data</h3>
                ) : (
                  <h3>
                    {playlistData.data.start_time_formatted.day},{' '}
                    {playlistData.data.start_time_formatted.month}{' '}
                    {playlistData.data.start_time_formatted.dateday}
                  </h3>
                )}
              </div>
              <div className='tertiary-item-header'>
                Set Start Time:
                <div className='tertiary-item-timestamp'>
                  {playlistData.data.has_playlist_length === false ? (
                    <h3>No Start Time Available</h3>
                  ) : (
                    <h3>
                      {playlistData.data.start_time_formatted.start_time.slice(
                        0,
                        -3
                      )}{' '}
                      {playlistData.data.start_time_formatted.time_format}
                    </h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='data-block-bottomrow'></div>
    </div>
  )
}

export default PlaylistData

// DEV NOTES FOR PLAYLISTDATA.JS
// -----------------------------
//
// check for 12/24 hour formatting in set_start_time (fix in createSeratoReport script)
//
// add helper method to convert 24 hour to 12 hour format (default view - add as user preference in UI?)
//
// break longer set title strings (underscores, etc) into text with whitespace (solves responsive UI issue)
//
// move component-specific css into its own corresponding file
//
// set text spans for hour/minute logic in set_length
