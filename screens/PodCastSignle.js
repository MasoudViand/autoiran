// @flow
import auth from "@react-native-firebase/auth";
import _ from "lodash";
import React, { Component, useEffect } from "react";
import moment from "moment";
import TrackPlayer, {
  Capability,
  useTrackPlayerEvents,
  usePlaybackState,
  TrackPlayerEvents,
  STATE_PLAYING,
  Event,
} from "react-native-track-player";
import {
  View,
  Keyboard,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
//import { Card, SimpleCard } from "@paraboly/react-native-card";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Row,
  Col,
} from "native-base";
import PlayerSlider from "./components/PlayerSlider";
class PodCastSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      data: [],
      track: {},
      isLoading: false,
      TrackPlayerState: "",
      isReady: false,
    };
    this.navigate = this.props.navigation.navigate;
  }
  async componentDidMount() {
    var track = {
      id: "1", // Must be a string, required
      url:
        "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3", // Load media from the network
      title: "Avaritia",
      artist: "deadmau5",
      //album: "while(1<2)",
      //genre: "Progressive House, Electro House",
      date: "2014-05-20T07:00:00+00:00", // RFC 3339
      duration: 28,
      artwork:
        "https://file-examples-com.github.io/uploads/2017/10/file_example_JPG_500kB.jpg", // Load artwork from the network
    };
    this.setState({ track: track });
    // await TrackPlayer.destroy();
    // await this.loadPlayer(track);
    //await TrackPlayer.play();
    // await TrackPlayer.reset();
    // const playbackState = await usePlaybackState();
    await TrackPlayer.addEventListener("playback-state", (state) => {
      console.log("statetttt", state);
      this.setState({ TrackPlayerState: state.state });
    });
    TrackPlayer.addEventListener("playback-queue-ended", () =>
      TrackPlayer.stop()
    );
    let newsID = this.props.route.params.newsID;
    this.setState({ isLoading: true });
    await fetch(
      "https://cigarettedirectory.com/api/singleNews.php?id=" + newsID
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  async loadPlayer(track) {
    track = track ? track : this.state.track;
    await TrackPlayer.destroy();
    await TrackPlayer.setupPlayer({ waitForBuffer: true }).then(async () => {
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SeekTo,
          Capability.Stop,
          //   TrackPlayer.CAPABILITY_PLAY,
          //   TrackPlayer.CAPABILITY_PAUSE,
          //   TrackPlayer.CAPABILITY_STOP,
          //   TrackPlayer.CAPABILITY_SEEK_TO,
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SeekTo,
          Capability.Stop,
          //   TrackPlayer.CAPABILITY_PLAY,
          //   TrackPlayer.CAPABILITY_PAUSE,
          //   TrackPlayer.CAPABILITY_STOP,
          //   TrackPlayer.CAPABILITY_SEEK_TO,
        ],
      });
    });

    await TrackPlayer.reset();
    await TrackPlayer.add(track);
    this.setState({ isReady: true });
  }
  async onPlayClicked() {
    if (this.state.isReady) {
      TrackPlayer.play();
      //this._playbackProgressInterval = setInterval(this.updateProgress.bind(this), 250);
    } else {
      await this.loadPlayer();
      TrackPlayer.play();
    }
  }
  render() {
    let playerStatus = this.state.TrackPlayerState;
    const { data, isLoading, track } = this.state;
    let item = data[0];
    let defaultImg = track.artwork;

    return (
      <Container>
        {/* <Header /> */}
        <Content>
          {isLoading ? (
            <ActivityIndicator size="large" color="red" />
          ) : (
            <Card style={{ flex: 1 }}>
              {/* <CardItem>
                <Body>
                  <Text
                    style={{
                      writingDirection: "rtl",
                      lineHeight: 25,
                      fontFamily: "Shabnam-Bold",
                      textAlign: "justify",
                      alignSelf: "flex-end",
                      flex: 1,
                    }}
                  >
                    {item && item.title}
                  </Text>
                </Body>
              </CardItem> */}

              <CardItem>
                <Body>
                  <Image
                    source={{ uri: item && item.img ? item.img : defaultImg }}
                    style={{ height: 200, width: "100%", flex: 1 }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      alignSelf: "center",
                      paddingVertical: 10,
                      flex: 1,
                    }}
                  >
                    {track.title}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      alignSelf: "center",
                      paddingVertical: 10,
                      flex: 1,
                      color: "#999",
                    }}
                  >
                    {track.artist}
                  </Text>
                  <PlayerSlider />
                  <Row>
                    {playerStatus === "playing" || playerStatus == 3 ? (
                      <Col
                        style={{ alignContent: "center", alignItems: "center" }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            TrackPlayer.pause();
                          }}
                        >
                          <Icon name="pause" type="FontAwesome" />
                        </TouchableOpacity>
                      </Col>
                    ) : (
                      <Col
                        style={{ alignContent: "center", alignItems: "center" }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            this.onPlayClicked();
                            //TrackPlayer.play();
                          }}
                        >
                          <Icon name="play" type="FontAwesome" />
                        </TouchableOpacity>
                      </Col>
                    )}

                    {/* {playerStatus === "idle" ||
                    playerStatus == 0 ||
                    playerStatus === "ready" ||
                    playerStatus == 1 ||
                    playerStatus == 999 ? (
                      <Col
                        style={{ alignContent: "center", alignItems: "center" }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            this.onPlayClicked();
                            //TrackPlayer.play();
                          }}
                        >
                          <Icon name="play" type="FontAwesome" />
                        </TouchableOpacity>
                      </Col>
                    ) : null} */}

                    <Col
                      style={{ alignContent: "center", alignItems: "center" }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          TrackPlayer.stop();
                        }}
                      >
                        <Icon name="stop" type="FontAwesome" />
                      </TouchableOpacity>
                    </Col>
                  </Row>

                  <Text
                    style={{
                      textAlign: "justify",
                      paddingTop: 15,
                      lineHeight: 26,
                      fontFamily: "Shabnam-Light",
                      flex: 1,
                    }}
                  >
                    {item && item.text}
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Text
                    style={{
                      fontFamily: "Shabnam-light",
                      alignSelf: "flex-end",
                      flex: 1,
                      marginRight: 0,
                    }}
                    note
                  >
                    {item && moment(item.date).format("DD MMMM YYYY hh:mm a")}
                  </Text>
                </Left>
                <Right>
                  <Row>
                    <Col size={10}>
                      <Text
                        style={{
                          fontFamily: "Shabnam-light",
                          alignSelf: "flex-end",
                          //flex: 1,
                          marginRight: 10,
                        }}
                        note
                      >
                        {"1,926"}
                      </Text>
                    </Col>
                    <Col size={2}>
                      <Icon name="star" type="FontAwesome" />
                    </Col>
                  </Row>
                </Right>
              </CardItem>
            </Card>
          )}
        </Content>
      </Container>
    );
  }
}

export default PodCastSingle;
