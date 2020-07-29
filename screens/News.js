// @flow
import auth from "@react-native-firebase/auth";
import _ from "lodash";
import React, { Component } from "react";
import { View, Keyboard, Alert, TouchableOpacity, Image } from "react-native";
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
} from "native-base";

class News extends Component {
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
      <Container>
        {/* <Header /> */}
        <Content>
          <Card>
            <CardItem header>
              <Left>
                {/* <Thumbnail source={{ uri: "Image URL" }} /> */}
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={{ uri: "https://picsum.photos/200" }}
                style={{ height: 200, width: null, flex: 1 }}
              />
            </CardItem>
            <CardItem>
              <Body>
                <Text>//Your text here</Text>
              </Body>
            </CardItem>
            <CardItem
              bordered
              transparent
              footer
              button
              onPress={() =>
                this.navigate("SingleNews", {
                  name: this.state.inputName || this.state.name,
                })
              }
            >
              <Text>Read More</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default News;
