// @flow
import auth from "@react-native-firebase/auth";
import _ from "lodash";
import React, { Component } from "react";
import moment from "moment";
import {
  View,
  Keyboard,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
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
  Row,
  Col,
} from "native-base";

class PodCastSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      data: [],
      isLoading: false,
    };
    this.navigate = this.props.navigation.navigate;
  }
  async componentDidMount() {
    let newsID = this.props.route.params.newsID;
    this.setState({ isLoading: true });
    await fetch(
      "https://cigarettedirectory.com/api/singleNews.php?id=" + newsID
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { data, isLoading } = this.state;
    console.log(data[0]);
    let item = data[0];
    return (
      <Container>
        {/* <Header /> */}
        <Content>
          {isLoading ? (
            <ActivityIndicator size="large" color="red" />
          ) : (
            <Card style={{ flex: 1 }}>
              <CardItem>
                <Body>
                  <Text
                    style={{
                      writingDirection: "rtl",
                      lineHeight: 25,
                      fontFamily: "Shabnam-Bold",
                      textAlign: "justify",
                      alignSelf: "flex-end",
                      flex: 1,
                    }}
                  >
                    {item && item.title}
                  </Text>
                </Body>
              </CardItem>

              <CardItem>
                <Body>
                  {item && item.img ? (
                    <Image
                      source={{ uri: item.img }}
                      style={{ height: 200, width: "100%", flex: 1 }}
                    />
                  ) : (
                    <Text />
                  )}
                  <Text
                    style={{
                      writingDirection: "rtl",
                      textAlign: "justify",
                      paddingTop: 15,
                      lineHeight: 26,
                      fontFamily: "Shabnam-Light",
                      alignSelf: "flex-end",
                      flex: 1,
                    }}
                  >
                    {item && item.text}
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Text
                    style={{
                      fontFamily: "Shabnam-light",
                      alignSelf: "flex-end",
                      flex: 1,
                      marginRight: 0,
                    }}
                    note
                  >
                    {item && moment(item.date).format("DD MMMM YYYY hh:mm a")}
                  </Text>
                </Left>
                <Right>
                  <Row>
                    <Col size={10}>
                      <Text
                        style={{
                          fontFamily: "Shabnam-light",
                          alignSelf: "flex-end",
                          //flex: 1,
                          marginRight: 10,
                        }}
                        note
                      >
                        {"1,926"}
                      </Text>
                    </Col>
                    <Col size={2}>
                      <Icon name="star" type="FontAwesome" />
                    </Col>
                  </Row>
                </Right>
              </CardItem>
            </Card>
          )}
        </Content>
      </Container>
    );
  }
}

export default PodCastSingle;
