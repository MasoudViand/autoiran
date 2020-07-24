// @flow
import auth from "@react-native-firebase/auth";
import _ from "lodash";
import React, { Component } from "react";
import { View, Keyboard, Alert, TouchableOpacity, Text } from "react-native";
import { Card, SimpleCard } from "@paraboly/react-native-card";
import { ScrollView } from "react-native-gesture-handler";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user: [],
      isTyping: true,
      renderUsernameOnMessage: true,
      isLogged: false,
    };
    this.navigate = this.props.navigation.navigate;
  }

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
        <ScrollView>
          <View style={{ flex: 3 }}>
            <Card
              iconDisable
              title="Title"
              iconName="home"
              iconType="Entypo"
              onPress={() => {}}
              borderRadius={20}
              topRightText="50/306"
              bottomRightText="30 km"
              iconBackgroundColor="#fcd"
              textContainerNumberOfLines={null}
              content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Fusce a risus id libero sodales tempor sit amet non felis. Pellentesque id scelerisque risus. Aenean imperdiet vulputate auctor. Morbi fringilla nisi quis diam cursus tincidunt. Quisque consectetur porttitor efficitur. Nam in cursus neque. Vestibulum ornare scelerisque velit, in pretium mauris commodo ut. Nulla neque nulla, tristique sit amet nibh non, gravida laoreet nulla. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
              topRightStyle={{
                fontSize: 12,
                fontWeight: "700",
                color: "#505e80",
              }}
              bottomRightStyle={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#505e80",
              }}
            />
          </View>
          <View style={{ flex: 4 }}>
            <Text>Bye!</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default User;
