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
      modalVisible: false,
      renderUsernameOnMessage: true,
      isLogged: false,
      vUrl:
        "https://sa17.telewebion.com/devices/_definst_/varzesh-1000k.stream/chunks.m3u8?nimblesessionid=60694310&wmsAuthSign=aXNfZnJlZT0xJnNlcnZlcl90aW1lPTcvMjgvMjAyMCAxOjUwOjI1IEFNJmhhc2hfdmFsdWU9S1BjeEk4QVJIbVJBWDJDeEJUSnlWZz09JnZhbGlkbWludXRlcz02MDAw",
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
                <VideoPlayer
                  source={{
                    uri: this.state.vUrl,
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
                  style={style.backgroundVideo}
                />
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
