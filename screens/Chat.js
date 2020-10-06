// @flow
import firebase from "@react-native-firebase/app";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import _ from "lodash";
import React from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
//import Clipboard from "react-native";
import Fire from "../Fire";
import {
  View,
  Keyboard,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
} from "react-native";
import style from "./css/styles";
// import { WebView } from "react-native-webview";
// import AutoHeightWebView from "react-native-autoheight-webview";
//import { firebase, auth, database } from "react-native-firebase";
// import Video from "react-native-video";
import VideoPlayer from "react-native-video-controls";
import { Container, Row, Grid, Col, Item, Toast } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
type Props = {
  name?: string,
};

class Chat extends React.Component<Props> {
  constructor(props) {
    super(props);
    const params = this.props.route.params;
    name = params.name;
    this.navigate = this.props.navigation.navigate;
    this.state = {
      messages: [],
      user: [],
      isTyping: true,
      modalVisible: false,
      renderUsernameOnMessage: true,
      isLogged: false,
      streamList: [],
      vUrl:
        "https://sl32.telewebion.com/devices/_definst_/tv3-500k.stream/chunks.m3u8?nimblesessionid=21412746&wmsAuthSign=aXNfZnJlZT0xJnNlcnZlcl90aW1lPTEwLzEvMjAyMCA1Ojc6MTMgQU0maGFzaF92YWx1ZT1LalNVTVVDUDNuREc5MUU1YWZkNmdnPT0mdmFsaWRtaW51dGVzPTYwMDA=",
    };
  }

  // state = {
  //   messages: [],
  //   user: [],
  //   isTyping: true,
  //   renderUsernameOnMessage: true,
  //   isLogged: false,
  //   vUrl:
  //     "https://ul.cdn946.net:8443/hls/iexb8.m3u8?s=2RQz63ET3J1kn36_ChaOkw&e=1595580363",
  //   vSource:
  //     '<video playsinline controls autoplay width="100%" src="https://ul.cdn946.net:8443/hls/iexb8.m3u8?s=2RQz63ET3J1kn36_ChaOkw&e=1595580363" ></video>',
  //   //name: (name = name || null),
  // };
  getLiveUrl = async () => {
    try {
      await fetch("https://cigarettedirectory.com/api/live")
        .then((response) => response.json())
        .then((json) => {
          this.setState({ streamList: json, vUrl: json[0].url });
        });
    } catch (error) {
      console.error("error", error);
    }
  };
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  get user() {
    return {
      name: name,
      _id: Fire.shared.uid,
      //avatar: "https://placeimg.com/140/140/any",
    };
  }
  logOut = () => {
    auth()
      .signOut()
      .then(() => {
        this.navigate("Home");
        alert("User signed out!");
      });
  };
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        textProps={{
          style: {
            fontFamily: "Shabnam-Light",
          },
        }}
      />
    );
  }
  videoError = () => {
    Toast.show({
      text: " مشکل در پخش, از لینک دیگری استفاده کنید",
      type: "warning",
      textStyle: style.toasttext,
      duration: 2500,
    });
  };
  renderSightoutView = () => {
    if (!auth().currentUser) {
      return (
        <Row
          size={1}
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            alignContent: "center",
            flexDirection: "row-reverse",
            paddingHorizontal: 15,
          }}
        >
          <Text style={style.text}>برای شرکت در چت باید وارد شوید</Text>
          <TouchableHighlight
            style={{
              ...style.openButton,
              backgroundColor: "green",
            }}
            onPress={() => {
              this.navigate("Login");
            }}
          >
            <Text style={style.textStyle}>عضویت/ورود</Text>
          </TouchableHighlight>
        </Row>
      );
    }
  };
  // renderVideo = () => {
  //   if (this.state.vUrl.length > 0) {
  //     <VideoPlayer
  //       source={this.state.vUrl} // Can be a URL or a local file.
  //       ref={(ref) => {
  //         this.player = ref;
  //       }} // Store reference
  //       //onBuffer={this.onBuffer} // Callback when remote video is buffering
  //       //onError={this.videoError} // Callback when video cannot be loaded
  //       //controls={true}
  //       playWhenInactive={true}
  //       poster="https://picsum.photos/300/200"
  //       posterResizeMode="cover"
  //       showOnStart={false}
  //       //fullscreen={true}
  //       paused={false}
  //       //resizeMode="cover"
  //       style={style.backgroundVideo}
  //     />;
  //   }
  // };
  render() {
    const { modalVisible } = this.state;
    let disablesend = false;
    if (this.user._id) {
      disablesend = true;
    }
    //alert(name);
    return (
      <View style={{ flex: 1 }}>
        <Container>
          <Grid>
            <Col>
              {this.renderSightoutView()}
              <Row size={5}>
                {/*this.renderVideo()*/}
                <VideoPlayer
                  source={{ uri: this.state.vUrl }} // Can be a URL or a local file.
                  ref={(ref) => {
                    this.player = ref;
                  }} // Store reference
                  //onBuffer={this.onBuffer} // Callback when remote video is buffering
                  onError={this.videoError} // Callback when video cannot be loaded
                  //controls={true}
                  playWhenInactive={true}
                  poster="https://picsum.photos/300/200"
                  posterResizeMode="cover"
                  //showOnStart={false}
                  //fullscreen={true}
                  paused={false}
                  //resizeMode="cover"
                  style={style.backgroundVideo}
                />
              </Row>
              <Row
                size={1}
                style={{
                  flex: 1,
                  flexDirection: "row-reverse",
                  justifyContent: "space-evenly",
                  backgroundColor: "#999",
                  alignItems: "center",
                }}
              >
                {this.state.streamList.map((item) => {
                  return (
                    <TouchableOpacity
                      onPress={(e) => {
                        this.setState({ vUrl: item.url });
                      }}
                      key={item.name}
                    >
                      <Text style={[style.text, { color: "#fff" }]}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </Row>
              <Row size={10}>
                <GiftedChat
                  messages={this.state.messages}
                  onSend={Fire.shared.send}
                  user={this.user}
                  renderBubble={this.renderBubble}
                  //showAvatarForEveryMessage
                  renderUsernameOnMessage
                  keyboardShouldPersistTaps="never"
                  timeFormat="LT"
                  renderInputToolbar={!disablesend ? () => null : undefined}
                />
              </Row>
            </Col>
          </Grid>
        </Container>

        {/* <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          //presentationStyle="overFullScreen"
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <Text style={style.modalText}>
                برای شرکت در چت باید وارد شوید
              </Text>
              <TouchableHighlight
                style={{ ...style.openButton, backgroundColor: "green" }}
                onPress={() => {
                  this.navigate("Login");
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={style.textStyle}>عضویت/ورود</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...style.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={style.textStyle}>بستن</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal> */}
      </View>
    );
  }
  componentDidMount() {
    this.getLiveUrl();

    if (!auth().currentUser) {
      this.setState({ modalVisible: true });
    }
    Fire.shared.on((message) =>
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
    //alert(this.messages);
  }
  componentWillUnmount() {
    Fire.shared.off();
  }
}
export default Chat;
