// @flow
import auth from "@react-native-firebase/auth";
import firebase from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import database from "@react-native-firebase/database";
import _ from "lodash";
import React, { Component } from "react";
import { like, likeSize, getComments } from "./inc";
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
  Toast,
} from "native-base";
//import { NavigationEvents } from "@react-navigation/native";
import moment from "jalali-moment";
import "moment/min/locales";
class Feed extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      user: { userId: null, userName: null, userAvatar: null },
      DATA: null,
      isRefreshing: false,
      isLoading: false,
      limit: 15,
      lastVisible: null,
      loading: false,
    };
    this.navigate = this.props.navigation.navigate;
  }
  async componentDidMount() {
    this._isMounted = true;
    if (firebase.auth().currentUser) {
      await this.getUserData();
    }
    if (this._isMounted) {
      this.setState({ isLoading: true });
      await this.fetchPosts();
      this.setState({ isLoading: false });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  getUserData = async () => {
    let userId = firebase.auth().currentUser.uid;
    //var name;
    var ref = firebase.database().ref("users/" + userId);
    await ref.once("value").then((snapshot) => {
      var name = snapshot.val().Name;
      var avatar = snapshot.val().Avatar;
      this.setState({
        user: { userId: userId, userName: name, userAvatar: avatar },
        isLogged: true,
      });
      // console.log(this.state.user);
    });
  };
  fetchPosts = async () => {
    this.setState({ isRefreshing: true });
    try {
      const posts = await firebase
        .firestore()
        .collection("posts")
        .orderBy("createdAt", "desc")
        .limit(this.state.limit)
        // .startAfter(this.state.lastVisible || "")
        .get()
        .then(function(querySnapshot) {
          let posts = querySnapshot.docs.map((doc) => doc.data());
          return posts;
        });
      if (posts.length > 0) {
        posts.map(async (item, index) => {
          const postId = item.id;
          var likeCount = await likeSize(postId, this.state.user.userId);
          item.likes = likeCount;
          //end add likes
          var comment = await getComments(postId);
          item.comments = comment;
          this.setState({ isLoading: false });
          return item;
        });

        //console.log(posts);
        let lastVisible = posts[posts.length - 1].createdAt;
        this.setState({
          DATA: posts,
          lastVisible: lastVisible,
        });
      }
      this.setState({
        isRefreshing: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        isRefreshing: false,
      });
    }
  };
  // Retrieve More
  retrieveMore = async () => {
    try {
      console.log("Retrieving additional Data");
      // Cloud Firestore: Query (Additional Query)
      let additionalQuery = await firebase
        .firestore()
        .collection("posts")
        .orderBy("createdAt", "desc")
        .limit(this.state.limit)
        .startAfter(this.state.lastVisible)
        .get()
        .then(function(querySnapshot) {
          let posts = querySnapshot.docs.map((doc) => doc.data());
          return posts;
        });
      if (additionalQuery.length > 0) {
        additionalQuery.map(async (item, index) => {
          const postId = item.id;
          var likeCount = await likeSize(postId, this.state.user.userId);
          item.likes = likeCount;
          //end add likes
          var comment = await getComments(postId);
          item.comments = comment;
          this.setState({ isLoading: false });
          return item;
        });

        let lastVisible = additionalQuery[additionalQuery.length - 1].createdAt;
        //Set State
        this.setState({
          DATA: [...this.state.DATA, ...additionalQuery],
          lastVisible: lastVisible,
          isRefreshing: false,
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        isRefreshing: false,
      });
    }
  };
  // Render Footer
  renderFooter = () => {
    try {
      // Check If Loading
      if (this.state.isRefreshing) {
        return (
          <ActivityIndicator size="large" style={{ paddingVertical: 20 }} />
        );
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };
  onRefresh = () => {
    this.fetchPosts();
  };
  likefunc = async (userId, postId, index) => {
    let data = this.state.DATA[index];
    try {
      like(userId, postId, data.likes.liked);
      this.state.DATA[index].likes = data.likes.liked
        ? { count: data.likes.count - 1, liked: false }
        : { count: data.likes.count + 1, liked: true };
      this.setState({ isLoading: false });
    } catch (error) {
      alert("خطا!");
    }
  };
  farsiDate = (date) => {
    let b = moment.unix(date);
    let a = moment();
    let diff = a.diff(b, "hours");
    let shamsi = moment
      .unix(date)
      .locale("fa")
      .fromNow();
    if (diff > 24) {
      // alert("1");
      shamsi = moment
        .unix(date)
        .locale("fa")
        .format("D MMMM YYYY, HH:mm");
    } else {
      // alert("2");
      shamsi = moment
        .unix(date)
        .locale("fa")
        .fromNow();
    }

    return shamsi;
  };
  render() {
    const { DATA, isRefreshing, isLoading } = this.state;

    const renderItem = ({ item, index }) => (
      <Row>
        <Col>
          <Card>
            <CardItem header>
              <Left style={{ flexDirection: "row-reverse" }}>
                <Thumbnail
                  source={{
                    uri: item.user.userAvatar
                      ? item.user.userAvatar
                      : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${
                          item.user.userName
                        }`,
                  }}
                />
                <Body
                  style={{
                    alignItems: "flex-end",
                  }}
                >
                  <Text style={[style.text, { paddingRight: 20 }]}>
                    {item.user.userName}
                  </Text>
                  <Text style={[style.text, { color: "#888" }]} note>
                    {this.farsiDate(item.createdAt)}
                  </Text>
                </Body>
                <Left>
                  <Icon
                    style={{ color: "#777", fontSize: 20 }}
                    name="ellipsis-vertical-outline"
                  />
                </Left>
              </Left>
            </CardItem>
            {item.postPhoto ? (
              <TouchableOpacity
                onPress={() =>
                  this.navigate("FeedSingle", {
                    postId: item.id,
                  })
                }
              >
                <CardItem cardBody>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={{ uri: item.postPhoto }}
                      style={{
                        flex: 1,
                        aspectRatio: 1.3, // Your aspect ratio
                      }}
                      resizeMode={"cover"}
                    />
                  </View>
                </CardItem>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              onPress={() =>
                this.navigate("FeedSingle", {
                  postId: item.id,
                })
              }
            >
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
            </TouchableOpacity>

            <CardItem
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
              bordered
              transparent
              footer
            >
              <TouchableOpacity
                onPress={() =>
                  this.likefunc(this.state.user.userId, item.id, index)
                }
              >
                <View>
                  <Icon
                    style={{
                      color: "#fc764c",
                      textAlign: "center",
                    }}
                    name={
                      item.likes && item.likes.liked ? "heart" : "heart-outline"
                    }
                    //name="heart"
                  />
                  <Text style={{ color: "#999", textAlign: "center" }} note>
                    {item.likes ? item.likes.count : ""}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.navigate("FeedSingle", {
                    postId: item.id,
                  })
                }
              >
                <View>
                  <Icon
                    style={{ color: "#777", textAlign: "center" }}
                    name="chatbubble-outline"
                    //name="comments"
                  />
                  <Text style={{ color: "#999", textAlign: "center" }} note>
                    {item.comments ? item.comments.count : ""}
                  </Text>
                </View>
              </TouchableOpacity>
            </CardItem>
          </Card>
        </Col>
      </Row>
    );
    return (
      <SafeAreaView style={[style.container, { backgroundColor: "#fff" }]}>
        <Container>
          {/* {isLoading ? (
            <ActivityIndicator size="large" style={{ paddingVertical: 20 }} />
          ) : null} */}
          {/* <ScrollView style={{ padding: 10 }}> */}
          <Grid>
            <FlatList
              data={DATA}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              // ListFooterComponent={this.renderFooter}
              onEndReached={this.retrieveMore}
              onEndReachedThreshold={0.5}
              refreshing={isRefreshing}
              onRefresh={() => this.onRefresh()}
            />
          </Grid>
          {/* </ScrollView> */}
          <Footer>
            <FooterTab>
              <Button
                onPress={() =>
                  this.navigate("Home", {
                    name: this.state.inputName || this.state.name,
                  })
                }
              >
                <Icon name="apps-outline" />
              </Button>
              <Button active style={{ borderRadius: 0 }}>
                <Icon active name="filter" />
              </Button>
              <Button
                onPress={() =>
                  this.navigate("User", {
                    name: this.state.inputName || this.state.name,
                  })
                }
              >
                <Icon name="person-outline" />
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </SafeAreaView>
    );
  }
}

export default Feed;
