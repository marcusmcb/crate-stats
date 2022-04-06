import { useState, useEffect, Fragment } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import axios from "axios";

import Titlebar from "./Titlebar";
import "./cratestats.css";

const CrateStats = () => {
  const [songData, setSongData] = useState({});
  const [isBusy, setIsBusy] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [playlistLink, setPlaylistLink] = useState({
    url: "",
  });

  const getReport = () => {
    console.log("HERE")
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    setPlaylistLink({
      ...playlistLink,
      [e.target.name]: e.target.value,
    })
  }

  let trackList = [];

  useEffect(() => {
    const getStats = async () => {
      let reportData;
      await axios
        .get("http://localhost:5000/createReport")
        .then((response) => {
          reportData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      return reportData;
    };
    getStats().then((data) => {
      for (let i = 0; i < data.trackLog.length; i++) {
        trackList.push(data.trackLog[i].trackId);
      }
      console.log(data);
      setTracks(trackList);
      setSongData(data);
      setIsBusy(false);
    });
  }, []);

  return (
    <div>
      <Titlebar />
      {isBusy ? (
        <p>Loading...</p>
      ) : (
        <Fragment>
          <Form>
            <FormGroup onSubmit={getReport}>
              {/* <Label for='examplePassword'>Password</Label> */}
              <Input
                type="text"
                name="url"
                value={playlistLink.url}
                onChange={handleChange}
                placeholder="your Serato playlist URL"
                bsSize="sm"
              />
            </FormGroup>
          </Form>
          <button type="submit">Submit</button>
          <hr />
          <div>Your Report:</div>
        </Fragment>
      )}
    </div>
  );
};

export default CrateStats;
