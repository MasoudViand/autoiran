// @flow
import firebase from "@react-native-firebase/app";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import _ from "lodash";
import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "../Fire";
import { View, Keyboard, Alert, TouchableOpacity, Text } from "react-native";
import { WebView } from "react-native-webview";
import AutoHeightWebView from "react-native-autoheight-webview";
//import { firebase, auth, database } from "react-native-firebase";
type Props = {
  name?: string,
};

class Chat extends React.Component<Props> {
  constructor(props) {
    super(props);
    const params = this.props.route.params;
    name = params.name;
    this.navigate = this.props.navigation.navigate;
  }

  state = {
    messages: [],
    user: [],
    isTyping: true,
    renderUsernameOnMessage: true,
    isLogged: false,
    vSource:
      '<video playsinline controls autoplay width="100%" src="https://ul.cdn946.net:8443/hls/iexb8.m3u8?s=J-Uc5MIyxzH_KqKOoe9UAw&e=1595542202" ></video>',
    //name: (name = name || null),
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
        <View style={{ flex: 0.7 }}>{this.renderSightoutView()}</View>
        <View style={{ flex: 3 }}>
          {/* <WebView
            allowsFullscreenVideo={true}
            javaScriptEnabled={true}
            source={{ uri: "http://autoiran.com/f1.html" }}
            style={{ backgroundColor: "powderblue" }}
          /> */}
          <AutoHeightWebView
            javaScriptEnabled={true}
            source={{
              html: this.state.vSource,
            }}
            useWebKit={true}
            originWhitelist={["*"]}
            allowsInlineMediaPlayback={true}
            scalesPageToFit={true}
            ignoreSslError={true}
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
        </View>
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

export default Chat;
