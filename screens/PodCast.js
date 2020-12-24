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
import moment from "moment";
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

class PodCast extends Component {
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

  render() {
    const { data, isLoading } = this.state;
    const defaultImg = "https://via.placeholder.com/150?text=No%20image";
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
              <Card style={{ width: "50%" }}>
                <View>
                  <CardItem cardBody>
                    <Image
                      source={{ uri: item.img ? item.img : defaultImg }}
                      style={{ height: 200, width: null, flex: 1 }}
                    />
                  </CardItem>
                </View>

                <CardItem>
                  <Body>
                    <Text
                      style={[
                        style.text,
                        {
                          alignSelf: "center",
                          flex: 1,
                          marginVertical: 7,
                          textAlign: "center",
                        },
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Shabnam-light",
                        alignSelf: "center",
                        flex: 1,
                        marginRight: 0,
                        textAlign: "center",
                      }}
                      note
                    >
                      {"Language: Persian"}
                    </Text>
                  </Body>
                </CardItem>
                <CardItem
                  bordered
                  transparent
                  footer
                  button
                  onPress={() =>
                    this.navigate("PodCastSingle", {
                      newsID: item.id,
                    })
                  }
                >
                  <Text
                    style={[
                      style.text,
                      {
                        color: "#8A6FF5",
                        alignSelf: "center",
                        flex: 1,
                        textAlign: "center",
                      },
                    ]}
                  >
                    {"Episode List"}
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

export default PodCast;
