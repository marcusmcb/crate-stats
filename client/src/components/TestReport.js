import React, { Fragment, useEffect, useState } from "react";
import Titlebar from "./Titlebar";
import DragAndDrop from "./DragAndDrop";
import MinuteText from "./spantext/minuteText";
import MinutesText from "./spantext/minutesText";
import SecondText from "./spantext/secondText";
import SecondsText from "./spantext/secondsText";

import BarChart from "./d3/basicchart";

import "./TestPage.css";

const datas = [
  [65, 55, 35, 28, 34, 22, 33, 43, 19, 7, 18, 44],
  [10, 30, 45, 20, 33, 23, 44, 53, 37, 39, 43, 6],
  [44, 37, 22, 19, 11, 51, 44, 37, 28, 32, 4, 55]  
];
var i = 0;

const TestReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    changeData();
  }, []);

  const changeData = () => {
    setData(datas[1]);
    if (i === datas.length) i = 0;
  };

  return (
    <Fragment>
      <Titlebar />
      <DragAndDrop />
      <div className="testpage-body">
        <div className="data-block">
          <div className="data-block-toprow">
            <div className="toprow-container">
              <div className="data-block-primary">
                <div className="data-block-primary-header">
                  Total Tracks Played
                </div>
                <div className="data-block-primary-value-main">37</div>
              </div>

              <div className="data-block-secondary">
                <div className="secondary-container">
                  <div className="secondary-container-header">
                    Average Track Length
                  </div>
                  <div className="secondary-container-value">2:33</div>
                  <div className="secondary-container-header">
                    Average Tracks Per Hour
                  </div>
                  <div className="secondary-container-value">21</div>
                </div>
              </div>
            </div>

            <div className="data-block-third">
              <div className="tertiary-container">
                <div className="tertiary-item">
                  <div className="tertiary-item-header">
                    Longest Track:
                  </div>
                  <div className="timer-line">
                    4{" "}
                    <span className="minutes-text">
                      <MinutesText />
                    </span>
                    , 43{" "}
                    <span className="minutes-text">
                      <SecondsText />
                    </span>
                  </div>
                  <div className="tertiary-item-value">
                    Your Mom Is A Cab Driver (4:43)
                  </div>
                  <div className="tertiary-item-caption">
                    (played at{" "}
                    <span className="tertiary-item-timestamp">8:32 PM</span>)
                  </div>
                </div>
                <div className="tertiary-item">
                  <div className="tertiary-item-header">
                    Shortest Track:
                  </div>
                  <div className="timer-line">
                    4{" "}
                    <span className="minutes-text">
                      <MinutesText />
                    </span>
                    , 43{" "}
                    <span className="minutes-text">
                      <SecondsText />
                    </span>
                  </div>
                  <div className="tertiary-item-value">
                    Your Dad Eats Cashews (2:21)
                  </div>
                  <div className="tertiary-item-caption">
                    (played at{" "}
                    <span className="tertiary-item-timestamp">10:14 PM</span>)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="data-block-bottomrow">
            <BarChart width={600} height={250} data={data} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TestReport;
