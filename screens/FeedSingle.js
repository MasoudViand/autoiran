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
  ActivityIndicator,
} from "react-native";
import firebase from "@react-native-firebase/app";
import { farsiDate, likeSize, like, getComments } from "./inc";
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
  Input,
  Form,
  Item,
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";

class FeedSingle extends Component {
  constructor(props) {
    super(props);
    const params = this.props.route.params;
    const postId = params.postId;
    this.state = {
      postId: postId,
      post: [],
      user: [],
      isLogged: false,
      isLoading: false,
    };
    this.navigate = this.props.navigation.navigate;
  }
  async componentDidMount() {
    this.setState({ isLoading: true });
    if (firebase.auth().currentUser) {
      await this.getUserData();
    }
    await this.getPost(this.state.postId);
    this.setState({ isLoading: false });
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
    });
  };
  getPost = async (postId) => {
    try {
      const post = await firebase
        .firestore()
        .doc(`posts/${postId}`)
        .get()
        .then(function(querySnapshot) {
          let result = querySnapshot.data();
          return result;
        });
      if (post) {
        // add likes
        const postId = post.id;
        var likeCount = await likeSize(postId, this.state.user.userId);
        post.likes = likeCount;
        //end add likes
        //add comments
        var comment = await getComments(postId);
        post.comments = comment;
        //end add comments
        this.setState({ post: post });
      }
    } catch (e) {
      console.error(e);
    }
  };
  likefunc = async (userId, postId) => {
    try {
      like(userId, postId);
      let data = this.state.post;
      this.state.post.likes = data.likes.liked
        ? { count: data.likes.count - 1, liked: false }
        : { count: data.likes.count + 1, liked: true };
      this.setState({ isLoading: false });
    } catch (error) {
      console.log(error);
      alert("خطا!");
    }
  };
  render() {
    const { post, isLoading } = this.state;
    const item = post;
    const postuser = post.user;
    return (
      <Container>
        {/* <Header /> */}
        <Content contentContainerStyle={{ flex: 1 }} scrollEnabled={false}>
          <ScrollView>
            <Card style={{ flex: 1 }}>
              <CardItem header>
                <Left style={{ flexDirection: "row-reverse" }}>
                  <Thumbnail
                    source={{
                      uri:
                        postuser && postuser.userAvatar != null
                          ? postuser.userAvatar
                          : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${
                              postuser ? postuser.userName : ""
                            }`,
                    }}
                  />
                  <Body
                    style={{
                      alignItems: "flex-end",
                    }}
                  >
                    <Text style={[style.text, { paddingRight: 20 }]}>
                      {postuser ? postuser.userName : ""}
                    </Text>
                    <Text style={[style.text, { color: "#888" }]} note>
                      {item.createdAt ? farsiDate(item.createdAt) : ""}
                    </Text>
                  </Body>
                </Left>
              </CardItem>

              <CardItem cardBody>
                {/* <Body> */}
                <Image
                  source={{ uri: item.postPhoto }}
                  style={{
                    height: undefined,
                    width: "100%",
                    aspectRatio: 1.3,
                    resizeMode: "cover",
                  }}
                />

                {/* </Body> */}
              </CardItem>
              <TouchableOpacity
                onPress={() => this.likefunc(this.state.user.userId, item.id)}
              >
                <CardItem>
                  <View
                    style={{
                      justifyContent: "flex-end",
                      flexDirection: "row",
                      alignItems: "baseline",
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Shabnam-Light",
                        fontSize: 12,
                        color: "#666",
                      }}
                    >
                      {item.likes && item.likes.count > 0
                        ? item.likes.count + " " + "بار این پست پسندیده شده است"
                        : "تا کنون کسی این پست را نپسندیده است"}
                    </Text>
                    <Icon
                      style={{
                        color: "#777",
                        paddingLeft: 7,
                        fontSize: 20,
                      }}
                      type="FontAwesome"
                      name={
                        item.likes && item.likes.liked ? "heart" : "heart-o"
                      }
                      //name="comments"
                    />
                  </View>
                </CardItem>
              </TouchableOpacity>
              <CardItem>
                <Text
                  style={{
                    writingDirection: "rtl",
                    textAlign: "justify",
                    paddingTop: 5,
                    lineHeight: 26,
                    fontFamily: "Shabnam-Light",
                  }}
                >
                  {item.postDescription}
                </Text>
              </CardItem>

              <CardItem>
                <View
                  style={{
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    alignItems: "baseline",
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Shabnam-Light",
                      fontSize: 12,
                      color: "#666",
                    }}
                  >
                    {item.comments && item.comments.count > 0
                      ? item.comments.count +
                        " " +
                        "پاسخ برای این پست ارسال شده است"
                      : "تا کنون پاسخی به این پست ارسال نشده است"}
                  </Text>
                  <Icon
                    style={{
                      color: "#777",
                      paddingLeft: 7,
                      fontSize: 20,
                    }}
                    type="FontAwesome"
                    name="comments-o"
                    //name="comments"
                  />
                </View>
              </CardItem>
            </Card>
          </ScrollView>
          <Footer>
            <View>
              <Input
                style={{
                  flex: 1,
                  lineHeight: 26,
                  fontSize: 18,
                  fontFamily: "Shabnam-Light",
                  justifyContent: "flex-end",
                }}
                placeholder="ارسال نظر"
              />
            </View>
          </Footer>
        </Content>
        {isLoading ? (
          <ActivityIndicator
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#e1e1e1",
            }}
            size="large"
          />
        ) : null}
      </Container>
    );
  }
}

export default FeedSingle;
