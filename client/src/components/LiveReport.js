import { useState, Fragment } from "react";
import {
  Icon,
  Card,
  Button,
  Form,
  Divider,
  Container,
  Grid,
  Header,
} from "semantic-ui-react";
import axios from "axios";

import "./livereport.css";

import parseDay from "../scripts/parseDay";
import parseDisplayName from "../scripts/parseDisplayName";
import Titlebar from "./shared/Titlebar";

const LiveReport = () => {
  const [isData, setIsData] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isBusy, setIsBusy] = useState(false)
  const [url, setUrl] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [playlistDate, setPlaylistDate] = useState([]);
  const [playlistData, setPlaylistData] = useState({});
  const [playlistName, setPlaylistName] = useState("");

  const getReport = async (e) => {
    e.preventDefault();
    setIsBusy(true)
    await axios
      .post("http://localhost:5000/liveplaylist", { url: url })
      .then((response) => {
        // check if playlist url is set to private
        if (response.data === "") {
          setIsPrivate(true);
          setIsBusy(false)
        } else {
          console.log(response.data);
          setPlaylistData(response.data);
          let userName = parseDisplayName(url);
          let dateValue = response.data.playlistDate;
          let displayDay = parseDay(response.data.playlistDate);
          // check for playlist title
          if (
            response.data.playlistTitle.charAt(
              response.data.playlistTitle.length - 5
            ) === "/"
          ) {
            setPlaylistName("");
          } else {
            setPlaylistName(response.data.playlistTitle);
          }

          setPlaylistDate([dateValue, displayDay]);
          setDisplayName(userName);
          setIsData(true);
          setIsBusy(false)
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setUrl("");
  };

  const handleChange = (e) => {
    setIsData(false);
    setIsPrivate(false);
    setUrl(e.target.value);
  };

  return (
    <div>
      <Fragment>
        <Titlebar />
        <Divider />
        <Container text textAlign="center">
          <p>Enter your Serato Live Playlist URL below.</p>
        </Container>
        <Grid padded="vertically">
          <Grid.Row centered>
            <Grid.Column width={8}>
              <Form size="small" onSubmit={getReport}>
                <Form.Input
                  placeholder="your url here"
                  value={url}
                  onChange={handleChange}
                />
                <Button type="submit">Get Stats</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {isData ? (
          <div>
            <Divider></Divider>
            <Grid style={{ paddingTop: "20px" }}>
              <Grid.Row centered>
                <Grid.Column width={8}>
                  {/* header */}
                  <Card
                    style={{ border: "1px solid lightgrey", padding: "20px" }}
                  >
                    <Header as="h2">
                      <Icon name="headphones" />
                      <Header.Content>{displayName}</Header.Content>
                    </Header>
                    {playlistName === "" ? (
                      <span></span>
                    ) : (
                      <Container text>{playlistName}</Container>
                    )}
                    <Container text>
                      {playlistDate[1]}, {playlistDate[0]}
                    </Container>
                    <Container text>
                      Start Time: {playlistData.setStartTime}
                    </Container>
                  </Card>
                  {/* playlist data */}
                  <Grid divided="vertically" style={{ paddingTop: "20px" }}>
                    <Grid.Row columns={2} style={{ padding: "0", margin: "0" }}>
                      <Grid.Column width={5}>
                        <Header as="h4" color="blue">
                          Set Length:
                        </Header>
                      </Grid.Column>
                      <Grid.Column width={3}>
                        {playlistData.setLength.setlengthhours === "0" ? (
                          <Container text>
                            {playlistData.setLength.setlengthminutes} Minutes,{" "}
                            {playlistData.setLength.setlengthseconds} Seconds
                          </Container>
                        ) : playlistData.setLength.setlengthhours === "1" ? (
                          <Container text>
                            {playlistData.setLength.setlengthhours} Hour,{" "}
                            {playlistData.setLength.setlengthminutes} Minutes
                          </Container>
                        ) : (
                          <Container text>
                            {playlistData.setLength.setlengthhours} Hours,{" "}
                            {playlistData.setLength.setlengthminutes} Minutes
                          </Container>
                        )}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid divided="vertically">
                    <Grid.Row columns={2} style={{ padding: "0", margin: "0" }}>
                      <Grid.Column width={5}>
                        <Header as="h4" color="blue">
                          Total Tracks Played:
                        </Header>
                      </Grid.Column>
                      <Grid.Column width={3}>
                        <Container text>
                          {playlistData.totalTracksPlayed}
                        </Container>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid divided="vertically">
                    <Grid.Row columns={2} style={{ padding: "0", margin: "0" }}>
                      <Grid.Column width={5}>
                        <Header as="h4" color="blue">
                          Average Track Length:
                        </Header>
                      </Grid.Column>
                      <Grid.Column width={3}>
                        {playlistData.avgTrackLength.minutes == "0" ? (
                          <Container text>
                            {playlistData.avgTrackLength.seconds} Seconds
                          </Container>
                        ) : playlistData.avgTrackLength.minutes == "1" ? (
                          <Container text>
                            {playlistData.avgTrackLength.minutes} Minute,{" "}
                            {playlistData.avgTrackLength.seconds} Seconds
                          </Container>
                        ) : (
                          <Container text>
                            {playlistData.avgTrackLength.minutes} Minutes,{" "}
                            {playlistData.avgTrackLength.seconds} Seconds
                          </Container>
                        )}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid divided="vertically">
                    <Grid.Row columns={2} style={{ padding: "0", margin: "0" }}>
                      <Grid.Column width={5}>
                        <Header as="h4" color="blue">
                          Shortest Track:
                        </Header>
                      </Grid.Column>
                      <Grid.Column width={3}>
                        <Container text>
                          {playlistData.shortestTrack.name}
                        </Container>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid divided="vertically">
                    <Grid.Row columns={2} style={{ padding: "0", margin: "0" }}>
                      <Grid.Column width={5}>
                        <Header as="h4" color="blue">
                          Longest Track:
                        </Header>
                      </Grid.Column>
                      <Grid.Column width={3}>
                        <Container text>
                          {playlistData.longestTrack.name}
                        </Container>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  {playlistData.doublesPlayed.length != 0 ? (
                    <div>Has Doubles</div>
                  ) : (
                    <Grid divided="vertically">
                      <Grid.Row
                        columns={1}
                        style={{ padding: "0", margin: "0" }}
                      >
                        <Grid.Column width={10}>
                          <Header as="h4" color="blue">
                            No doubles detected in this set.
                          </Header>
                        </Grid.Column>
                        
                      </Grid.Row>
                    </Grid>
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        ) : isPrivate ? (
          <Grid>
            <Grid.Row centered>
              <Grid.Column width={8}>
                <Container text>
                  This playlist is currently set to private.
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : isBusy ? (
          <Grid>
            <Grid.Row centered>
              <Grid.Column width={8}>
                <Container text>
                  Loading data...
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : (
          <div></div>
        )}
      </Fragment>
    </div>
  );
};

export default LiveReport;

// add color scaling on stat values to display comparison to aggregate (over/under)
