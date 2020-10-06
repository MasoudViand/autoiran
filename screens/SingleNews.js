// @flow
import auth from "@react-native-firebase/auth";
import _ from "lodash";
import React, { Component } from "react";
import moment from "jalali-moment";
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
} from "native-base";

class SingleNews extends Component {
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
    // moment.locale("fa");
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
  farsiDate = (date) => {
    return moment
      .from(date, "en", "YYYY/MM/DD hh:mm a")
      .format("D MMM YYYY hh:mm a");
  };
  render() {
    const { data, isLoading } = this.state;
    console.log(data[0]);
    let item = data[0];
    return (
      <Container>
        {/* <Header /> */}
        <Content>
          {isLoading ? (
            <ActivityIndicator />
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
                    {item && this.farsiDate(item.date)}
                  </Text>
                  {/* <Icon name="logo-github" /> */}
                  {/* <Text>1,926 stars</Text> */}
                </Left>
              </CardItem>
            </Card>
          )}
        </Content>
      </Container>
    );
  }
}

export default SingleNews;
