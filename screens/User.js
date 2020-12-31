// @flow
import auth from "@react-native-firebase/auth";
import _ from "lodash";
import React, { Component } from "react";
import { View, Keyboard, Alert, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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
  Footer,
  FooterTab,
  Badge,
  Grid,
  Row,
  Col,
  Input,
  Textarea,
  Item,
  Toast,
  ListItem,
  Switch,
} from "native-base";
import TabBar from "./components/TabBar";
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
      <Container>
        <Header />
        <Content>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="plane" type="FontAwesome" />
              </Button>
            </Left>
            <Body>
              <Text>Airplane Mode</Text>
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="wifi" type="FontAwesome" />
              </Button>
            </Left>
            <Body>
              <Text>Wi-Fi</Text>
            </Body>
            <Right>
              <Text>GeekyAnts</Text>
              <Icon active name="chevron-right" type="FontAwesome" />
            </Right>
          </ListItem>
        </Content>
        <Footer>
          <TabBar navigate={this.navigate} route={"User"} />
        </Footer>
      </Container>
    );
  }
}

export default User;
