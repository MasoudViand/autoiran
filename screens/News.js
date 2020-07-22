// @flow
import auth from "@react-native-firebase/auth";
import _ from "lodash";
import React from "react";
import { View, Keyboard, Alert, TouchableOpacity, Text } from "react-native";
type Props = {
  // name?: string,
};

class News extends React.Component<Props> {
  constructor(props) {
    super(props);
    //const params = this.props.route.params;
    //name = params.name;
    this.navigate = this.props.navigation.navigate;
  }

  state = {
    messages: [],
    user: [],
    isTyping: true,
    renderUsernameOnMessage: true,
    isLogged: false,
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
            <Text style={{ color: "#222" }}>Wellcome Back </Text>
          </View>
        </View>
      );
    }
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.5 }}>{this.renderSightoutView()}</View>
        <View style={{ flex: 3 }}>
          <Text>Hello!</Text>
        </View>
        <View style={{ flex: 4 }}>
          <Text>Bye!</Text>
        </View>
      </View>
    );
  }
  componentDidMount() {}
  componentWillUnmount() {}
}

export default News;
