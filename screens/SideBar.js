import React, { Component } from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
const routes = ["Home", "Chat", "Profile"];
export default class SideBar extends Component {
  constructor(props) {
    super(props);
    //this.navigate = this.props.navigation.navigate;
  }
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={{
              uri:
                "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/drawer-cover.png",
            }}
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <List
            dataArray={routes}
            renderRow={(data) => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate("Feed")}
                >
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
