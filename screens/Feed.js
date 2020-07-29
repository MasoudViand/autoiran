// @flow
import auth from "@react-native-firebase/auth";
import _ from "lodash";
import React, { Component } from "react";
import {
  View,
  Keyboard,
  Alert,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import style from "./css/styles";
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
  Footer,
  FooterTab,
  Badge,
  Grid,
  Row,
  Col,
  Input,
  Textarea,
  Item,
} from "native-base";

class Feed extends Component {
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
      <SafeAreaView style={[style.container, { backgroundColor: "#fff" }]}>
        <Container>
          <ScrollView style={{ padding: 10 }}>
            <Grid style={{ paddingBottom: 60 }}>
              <Row>
                <Col>
                  <Item
                    regular
                    disabled
                    style={{
                      marginBottom: 10,
                      paddingBottom: 50,
                      borderRadius: 3,
                      borderColor: "rgba(193, 173, 173, 0.5)",
                    }}
                  >
                    <Input
                      disabled
                      style={{
                        fontFamily: "Shabnam-Light",
                        textAlign: "right",
                        flex: 1,
                        fontSize: 15,
                      }}
                      placeholder="ارسال پست"
                    />
                    <Icon type="FontAwesome" active name="edit" />
                  </Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <TouchableOpacity
                    onPress={() =>
                      this.navigate("Schedule", {
                        name: this.state.inputName || this.state.name,
                      })
                    }
                  >
                    <Card>
                      <CardItem header>
                        <Left style={{ flexDirection: "row-reverse" }}>
                          <Thumbnail
                            source={{
                              uri: "https://picsum.photos/50",
                            }}
                          />
                          <Body
                            style={{
                              alignItems: "flex-end",
                            }}
                          >
                            <Text style={[style.text, { paddingRight: 20 }]}>
                              مسعود بیدارویند
                            </Text>
                            <Text style={[style.text, { color: "#888" }]} note>
                              کاربر جدید
                            </Text>
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
                        <Body
                          style={{
                            alignItems: "flex-end",
                          }}
                        >
                          <Text numberOfLines={2} style={style.text}>
                            این یک متن آزمایشی است این یک متن آزمایشی است این یک
                            متن آزمایشی است این یک متن آزمایشی است این یک متن
                            آزمایشی است
                          </Text>
                        </Body>
                      </CardItem>
                      <CardItem
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                        bordered
                        transparent
                        footer
                      >
                        <View>
                          <Icon
                            style={{ color: "#fc764c", textAlign: "center" }}
                            type="FontAwesome"
                            name="heart"
                            //name="heart-o"
                          />
                          <Text
                            style={{ color: "#999", textAlign: "center" }}
                            note
                          >
                            534
                          </Text>
                        </View>
                        <View>
                          <Icon
                            style={{ color: "#777", textAlign: "center" }}
                            type="FontAwesome"
                            name="comments-o"
                            //name="comments"
                          />
                          <Text
                            style={{ color: "#999", textAlign: "center" }}
                            note
                          >
                            24
                          </Text>
                        </View>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row>
                <Col>
                  <TouchableOpacity
                    onPress={() =>
                      this.navigate("Schedule", {
                        name: this.state.inputName || this.state.name,
                      })
                    }
                  >
                    <Card>
                      <CardItem header>
                        <Left style={{ flexDirection: "row-reverse" }}>
                          <Thumbnail
                            source={{
                              uri: "https://picsum.photos/50",
                            }}
                          />
                          <Body
                            style={{
                              alignItems: "flex-end",
                            }}
                          >
                            <Text style={[style.text, { paddingRight: 20 }]}>
                              مسعود بیدارویند
                            </Text>
                            <Text style={[style.text, { color: "#888" }]} note>
                              کاربر جدید
                            </Text>
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
                        <Body
                          style={{
                            alignItems: "flex-end",
                          }}
                        >
                          <Text numberOfLines={2} style={style.text}>
                            این یک متن آزمایشی است این یک این آزمایشی است
                          </Text>
                        </Body>
                      </CardItem>
                      <CardItem
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                        bordered
                        transparent
                        footer
                      >
                        <View>
                          <Icon
                            style={{ color: "#fc764c", textAlign: "center" }}
                            type="FontAwesome"
                            name="heart-o"
                            //name="heart-o"
                          />
                          <Text
                            style={{ color: "#999", textAlign: "center" }}
                            note
                          >
                            0
                          </Text>
                        </View>
                        <View>
                          <Icon
                            style={{ color: "#777" }}
                            type="FontAwesome"
                            name="comments-o"
                            //name="heart-o"
                          />
                          <Text
                            style={{ color: "#999", textAlign: "center" }}
                            note
                          >
                            2
                          </Text>
                        </View>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                </Col>
              </Row>
            </Grid>
          </ScrollView>
          <Footer>
            <FooterTab style={{ backgroundColor: "#fc764c" }}>
              <Button
                style={{ backgroundColor: "tranparent" }}
                active
                onPress={() =>
                  this.navigate("Home", {
                    name: this.state.inputName || this.state.name,
                  })
                }
              >
                <Icon
                  style={{ color: "#e1e1e1" }}
                  type="FontAwesome"
                  name="home"
                />
                <Text style={{ color: "#e1e1e1" }}>Main</Text>
              </Button>

              <Button
                style={{ backgroundColor: "#ff6738", borderRadius: 0 }}
                vertical
                badge
                onPress={() =>
                  this.navigate("News", {
                    name: this.state.inputName || this.state.name,
                  })
                }
              >
                <Badge>
                  <Text>7</Text>
                </Badge>
                <Icon
                  style={{ color: "#fff" }}
                  type="FontAwesome"
                  name="users"
                />
                <Text style={{ color: "#fff" }}>Feed</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </SafeAreaView>
    );
  }
}

export default Feed;
