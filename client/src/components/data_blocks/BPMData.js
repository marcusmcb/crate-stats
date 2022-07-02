import React from "react";
import "./bpmdata.css";

const BPMData = (data) => {
  console.log(data);
  return (
    <div>
      {/* ****************************************** */}
      {/* ************* BPM DATA ******************* */}
      {/* ****************************************** */}
      <div className="data-block-title">BPM Data</div>
      <div className="data-block-toprow">
        <div className="toprow-container">
          <div className="data-block-primary">
            {/* ****************************************** */}
            {/* *********** AVERAGE BPM ****************** */}
            {/* ****************************************** */}
            <div className="data-block-primary-header">Average BPM</div>
            <div className="data-block-primary-value-main">
              {data.data.average_bpm}
            </div>
          </div>
          <div className="data-block-secondary">
            <div className="secondary-container">
              {/* ****************************************** */}
              {/* ************ BPM RANGE ******************* */}
              {/* ****************************************** */}
              <div className="secondary-container-header">BPM Range</div>
              <div className="secondary-container-value">
                {data.data.bpm_range.minimum} -{" "}
                {data.data.bpm_range.maximum}
              </div>
            </div>
          </div>
        </div>
        <div className="data-block-third">
          <div className="tertiary-container">
            <div className="tertiary-item">
              {/* ****************************************** */}
              {/* *********** BIGGEST BPM CHANGE *********** */}
              {/* ****************************************** */}
              <div className="tertiary-item-header">
                Biggest BPM Change:{" "}
                <span className="text-white">
                  {data.data.biggest_bpm_change.track_one.bpm} -{" "}
                  {data.data.biggest_bpm_change.track_two.bpm}
                </span>
              </div>
              <div className="timer-line">
                "{data.data.biggest_bpm_change.track_one.name}" into "
                {data.data.biggest_bpm_change.track_two.name}"
              </div>
              <div className="tertiary-item-caption">
                occurred at{" "}
                <span className="tertiary-item-timestamp">
                  {data.data.biggest_bpm_change.occurred_at}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BPMData;
