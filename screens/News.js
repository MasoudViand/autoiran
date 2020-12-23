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
  ActivityIndicator,
  FlatList,
} from "react-native";
import moment from "jalali-moment";
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
      data: [],
      user: [],
      isLoading: false,
      isLogged: false,
    };
    this.navigate = this.props.navigation.navigate;
  }

  async componentDidMount() {
    moment.locale("fa");
    this.setState({ isLoading: true });
    await fetch("https://cigarettedirectory.com/api/news.php")
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
    return (
      <Container>
        {/* <Header /> */}
        {isLoading ? (
          <ActivityIndicator size="large" color="red" />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => (
              <Card>
                {/* <CardItem header>
                  <Left>
                     <Thumbnail source={{ uri: "Image URL" }} />
                    <Body>
                      <Text>{item.title}</Text>
                      <Text note>{this.farsiDate(item.date)}</Text>
                    </Body>
                  </Left>
                </CardItem> */}

                {item.img ? (
                  <View>
                    <CardItem cardBody>
                      <Image
                        source={{ uri: item.img }}
                        style={{ height: 200, width: null, flex: 1 }}
                      />
                    </CardItem>
                  </View>
                ) : (
                  <Text />
                )}

                <CardItem>
                  <Body>
                    <Text
                      style={[
                        style.text,
                        { alignSelf: "flex-end", flex: 1, marginBottom: 10 },
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Shabnam-light",
                        alignSelf: "flex-end",
                        flex: 1,
                        marginRight: 0,
                      }}
                      note
                    >
                      {this.farsiDate(item.date)}
                    </Text>
                  </Body>
                </CardItem>
                <CardItem
                  bordered
                  transparent
                  footer
                  button
                  onPress={() =>
                    this.navigate("SingleNews", {
                      newsID: item.id,
                    })
                  }
                >
                  <Text
                    style={[
                      style.text,
                      { color: "#8A6FF5", alignSelf: "flex-end", flex: 1 },
                    ]}
                  >
                    بیشتر بخوانید
                  </Text>
                </CardItem>
              </Card>
            )}
          />
        )}
      </Container>
    );
  }
}

export default News;
