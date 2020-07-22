// @flow
// import firebase from "@react-native-firebase/app";
//import database from "@react-native-firebase/database";
import _ from "lodash";
import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "../Fire";
import { View, Keyboard, Alert, TouchableOpacity, Text } from "react-native";
import { WebView } from "react-native-webview";
import { firebase, auth, database } from "react-native-firebase";
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
            flexDirection: "row",
            padding: 10,
            backgroundColor: "#e1e1e1",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ color: "#222" }}>Wellcome Back {name}</Text>
          </View>
          <TouchableOpacity onPress={this.logOut}>
            <Text style={{ color: "#222" }}>Logout</Text>
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
        <View style={{ flex: 0.5 }}>{this.renderSightoutView()}</View>
        <View style={{ flex: 3 }}>
          <WebView
            source={{ uri: "http://autoiran.com/" }}
            style={{ backgroundColor: "powderblue" }}
          />
        </View>
        <View style={{ flex: 4 }}>
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
