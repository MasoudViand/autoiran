// @flow
import firebase from "@react-native-firebase/app";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import _ from "lodash";
import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "../Fire";
import {
  View,
  Keyboard,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview";
import AutoHeightWebView from "react-native-autoheight-webview";
//import { firebase, auth, database } from "react-native-firebase";
import Video from "react-native-video";
import VideoPlayer from "react-native-video-controls";
import { Container, Row, Grid, Col } from "native-base";
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
      renderUsernameOnMessage: true,
      isLogged: false,
      vUrl:
        "https://ul.cdn946.net:8443/hls/iexb8.m3u8?s=2RQz63ET3J1kn36_ChaOkw&e=1596013752",
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
  renderSightoutView = () => {
    if (auth().currentUser) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row-reverse",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                color: "#222",
                writingDirection: "rtl",
                fontFamily: "Shabnam",
                textAlign: "right",
              }}
            >
              {name} عزیز خوش آمدید
            </Text>
          </View>
          <TouchableOpacity onPress={this.logOut}>
            <Text style={{ color: "#222" }}>خروج</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row-reverse",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                color: "#222",
                writingDirection: "rtl",
                fontFamily: "Shabnam",
                textAlign: "right",
              }}
            >
              چت فقط برای اعضا فعال می باشد
            </Text>
          </View>
          <TouchableOpacity onPress={() => this.navigate("Login")}>
            <Text
              style={{
                color: "#222",
              }}
            >
              ثبت نام/ورود
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  render() {
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
              <Row size={1}>{this.renderSightoutView()}</Row>
              <Row size={5}>
                <VideoPlayer
                  source={{
                    //this.state.vUrl,
                    uri:
                      //"https://mnmedias.api.telequebec.tv/m3u8/29880.m3u8",
                      "https://ul.cdn946.net:8443/hls/iexb8.m3u8?s=Z4M1iBSyH-z9ZdvXe1tMZQ&e=1595720535",
                    //"https://devstreaming-cdn.apple.com/videos/wwdc/2020/10225/1/071CF9A2-F9B9-48A1-8D81-012721D0A52C/avc_540p_2000/prog_index.m3u8",
                  }} // Can be a URL or a local file.
                  ref={(ref) => {
                    this.player = ref;
                  }} // Store reference
                  //onBuffer={this.onBuffer} // Callback when remote video is buffering
                  //onError={this.videoError} // Callback when video cannot be loaded
                  //controls={true}
                  playWhenInactive={true}
                  poster="https://picsum.photos/300/200"
                  posterResizeMode="cover"
                  //fullscreen={true}
                  paused={false}
                  //resizeMode="cover"
                  style={styles.backgroundVideo}
                />
              </Row>
              <Row size={10}>
                <GiftedChat
                  messages={this.state.messages}
                  onSend={Fire.shared.send}
                  user={this.user}
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
        {/* <View style={{ flex: 0.7 }}>{this.renderSightoutView()}</View>
        <View style={{ flex: 4 }}>
          <VideoPlayer
            source={{
              //this.state.vUrl,
              uri:
                //"https://mnmedias.api.telequebec.tv/m3u8/29880.m3u8",
                "https://ul.cdn946.net:8443/hls/iexb8.m3u8?s=xlDx4Uy92xMYEYd3qATX4g&e=1595606056",
            }} // Can be a URL or a local file.
            ref={(ref) => {
              this.player = ref;
            }} // Store reference
            //onBuffer={this.onBuffer} // Callback when remote video is buffering
            //onError={this.videoError} // Callback when video cannot be loaded
            //controls={true}
            playWhenInactive={true}
            poster="https://picsum.photos/300/200"
            posterResizeMode="cover"
            //fullscreen={true}
            paused={false}
            //resizeMode="cover"
            style={styles.backgroundVideo}
          />
        </View>
        <View style={{ flex: 6 }}>
          <GiftedChat
            messages={this.state.messages}
            onSend={Fire.shared.send}
            user={this.user}
            //showAvatarForEveryMessage
            renderUsernameOnMessage
            keyboardShouldPersistTaps="never"
            timeFormat="LT"
            renderInputToolbar={!disablesend ? () => null : undefined}
          />
        </View> */}
      </View>
    );
  }
  componentDidMount() {
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
const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default Chat;
