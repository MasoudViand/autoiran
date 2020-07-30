// @flow
import auth from "@react-native-firebase/auth";
import firebase from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
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
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import style from "./css/styles";
import uuid from "uuid";
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
import { NavigationEvents } from "react-navigation";
import moment from "jalali-moment";
import "moment/min/locales";
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DATA: null,
      isRefreshing: false,
      isLoading: false,
    };
    this.navigate = this.props.navigation.navigate;
  }
  async componentDidMount() {
    //moment.locale("fa");
    this.setState({ isLoading: true });
    await this.fetchPosts();
    this.setState({ isLoading: false });
  }
  fetchPosts = async () => {
    this.setState({ isRefreshing: true });
    try {
      const posts = await firebase
        .firestore()
        .collection("posts")
        .orderBy("createdAt", "desc")
        .get()
        .then(function(querySnapshot) {
          let posts = querySnapshot.docs.map((doc) => doc.data());
          // console.log(posts)//.orderBy("createdAt", "desc")
          return posts;
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
      //console.log(posts);
      this.setState({ DATA: posts, isRefreshing: false });
      //get userdata
      try {
        if (this.state.DATA) {
          let data = posts;
          for (let index = 0; index < data.length; index++) {
            let userId = data[index].userId;
            var name;
            var ref = firebase.database().ref("users/" + userId + "/Name");
            ref.once("value").then((snapshot) => {
              name = snapshot.val();
              this.state.DATA[index].username = name;
              // let items = [...posts];
              // let item = {
              //   ...items[index],
              //   username: name,
              // };
              // items[1] = item;
              this.setState({ isRefreshing: false });
            });
          }
        }
      } catch (e) {
        console.error(e);
      }
    } catch (e) {
      console.error(e);
    }
  };
  onRefresh = () => {
    this.setState({ isRefreshing: true });
    this.fetchPosts();
  };
  getUsername = (userId) => {
    var name;
    var ref = firebase.database().ref("users/" + userId + "/Name");
    ref.once("value").then((snapshot) => {
      name = snapshot.val();
      let data = this.state.DATA;
      for (let index = 0; index < data.length; index++) {
        if (data[index].userId == userId) {
          data[index].username = name;
        }
      }
      this.setState({ DATA: data });
    });
    console.log(name);
    //return returnArray;
  };
  farsiDate = (date) => {
    let shamsi = moment
      .unix(date)
      .locale("fa")
      .format("D MMMM YYYY, HH:mm");
    return shamsi;
  };
  render() {
    const { DATA, isRefreshing, isLoading } = this.state;

    const renderItem = ({ item }) => (
      <Row>
        <Col>
          <TouchableOpacity
            onPress={() =>
              this.navigate("SingleNews", {
                //name: this.state.inputName || this.state.name,
              })
            }
          >
            <Card>
              <CardItem header>
                <Left style={{ flexDirection: "row-reverse" }}>
                  <Thumbnail
                    source={{
                      uri: item.avatarURI || "https://picsum.photos/50",
                    }}
                  />
                  <Body
                    style={{
                      alignItems: "flex-end",
                    }}
                  >
                    <Text style={[style.text, { paddingRight: 20 }]}>
                      {item.username}
                    </Text>
                    <Text style={[style.text, { color: "#888" }]} note>
                      {this.farsiDate(item.createdAt)}
                    </Text>
                  </Body>
                </Left>
              </CardItem>
              {item.postPhoto ? (
                <CardItem cardBody>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={{ uri: item.postPhoto }}
                      style={{
                        flex: 1,
                        aspectRatio: 1.3, // Your aspect ratio
                      }}
                      resizeMode={"contain"}
                    />
                  </View>
                </CardItem>
              ) : null}
              <CardItem>
                <Body
                  style={{
                    alignItems: "flex-end",
                  }}
                >
                  <Text numberOfLines={2} style={style.text}>
                    {item.postDescription}
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
                    style={{
                      color: "#fc764c",
                      textAlign: "center",
                    }}
                    type="FontAwesome"
                    name="heart"
                    //name="heart-o"
                  />
                  <Text style={{ color: "#999", textAlign: "center" }} note>
                    {item.likes.length}
                  </Text>
                </View>
                <View>
                  <Icon
                    style={{ color: "#777", textAlign: "center" }}
                    type="FontAwesome"
                    name="comments-o"
                    //name="comments"
                  />
                  <Text style={{ color: "#999", textAlign: "center" }} note>
                    {item.comments.length}
                  </Text>
                </View>
              </CardItem>
            </Card>
          </TouchableOpacity>
        </Col>
      </Row>
    );
    return (
      <SafeAreaView style={[style.container, { backgroundColor: "#fff" }]}>
        <Container>
          {isLoading ? (
            <ActivityIndicator size="large" style={{ paddingVertical: 20 }} />
          ) : null}
          {/* <ScrollView style={{ padding: 10 }}> */}
          <Grid>
            <FlatList
              //style={this.props.themedStyle.container}
              data={DATA}
              keyExtractor={(item) => uuid.v4()}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              refreshing={isRefreshing}
              onRefresh={() => this.onRefresh()}
            />
          </Grid>
          {/* </ScrollView> */}
          <Footer>
            <FooterTab style={{ backgroundColor: "#fc764c" }}>
              <Button
                style={{ backgroundColor: "tranparent", borderWidth: 0 }}
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
                style={{ backgroundColor: "tranparent", borderWidth: 0 }}
                active
                // onPress={() =>
                //   this.navigate("Home", {
                //     name: this.state.inputName || this.state.name,
                //   })
                // }
              >
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
