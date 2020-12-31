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
import { farsiDate, likeSize, like, getComments, addComment } from "./inc";
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
  Grid,
  Row,
  Col,
  Textarea,
  FlatList,
  List,
  ListItem,
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import uuid from "uuid";
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
      commentText: "",
    };
    this.navigate = this.props.navigation.navigate;
    this._isMounted = true;
  }
  async componentDidMount() {
    this.setState({ isLoading: true, post: [], user: [] });
    if (firebase.auth().currentUser) {
      await this.getUserData();
    }
    await this.getPost(this.state.postId);
    this.setState({ isLoading: false });
  }
  componentWillUnmount () {
    this._isMounted = false;
  }
  getUserData = async () => {
    let userId = firebase.auth().currentUser.uid;
    //var name;
    var ref = firebase.database().ref("users/" + userId);
    await ref.once("value").then((snapshot) => {
      var name = snapshot.val().Name;
      var avatar = snapshot.val().Avatar;
      if (this._isMounted) {
      this.setState({
        user: { userId: userId, userName: name, userAvatar: avatar },
        isLogged: true,
      });
    }
    });
  };

  getPost = async (postId) => {
    try {
      const post = await firebase
        .firestore()
        .doc(`posts/${postId}`)
        .get()
        .then(function(querySnapshot) {
          console.log(querySnapshot);
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
        if (this._isMounted) {
        this.setState({ post: post });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  likefunc = async (userId, postId) => {
    if (firebase.auth().currentUser) {
      let data = this.state.post;
      try {
        like(userId, postId, data.likes.liked);
        this.state.post.likes = data.likes.liked
          ? { count: data.likes.count - 1, liked: false }
          : { count: data.likes.count + 1, liked: true };
        this.setState({ isLoading: false });
      } catch (error) {
        console.log(error);
        alert("خطا!");
      }
    } else {
      alert("لطفا وارد شوید");
    }
  };
  onChangeCommentText = (commentText) => {
    this.setState({ commentText });
  };
  commentList = () => {
    let comments = this.state.post.comments.comments;
    //console.log(comments);// issue ?
    return comments.map((item) => {
      return (
        <View
          key={item.commentId}
          style={{
            //flex: 1,
            // flexDirection: "row-reverse",
            paddingVertical: 8,
            width: "100%",
          }}
        >
          <View
            style={{
              marginVertical: 0,
              paddingHorizontal: 7,
              paddingTop: 7,
              flexDirection: "row-reverse",
            }}
          >
            <View style={{ paddingLeft: 8 }}>
              <Thumbnail
                small
                source={{
                  uri: item.user.userAvatar
                    ? item.user.userAvatar
                    : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${
                        item.user.userName
                      }`,
                }}
              />
            </View>
            <View>
              <Text
                style={[
                  style.text,
                  { color: "#666", fontWeight: "bold", fontSize: 15 },
                ]}
              >
                {item.user.userName}
              </Text>
              <Text
                style={[
                  style.text,
                  {
                    color: "#666",
                    fontWeight: "300",
                    lineHeight: 26,
                  },
                ]}
              >
                {item.text}
              </Text>
              <Text
                style={[
                  style.text,
                  {
                    color: "#666",
                    fontWeight: "200",
                    fontSize: 11,
                    paddingLeft: 7,
                    alignItems: "center",
                  },
                ]}
              >
                {farsiDate(item.date)}
              </Text>
            </View>
          </View>
        </View>
        // <ListItem avatar>
        //   <Left>
        //     <Thumbnail
        //       source={{
        //         uri: item.user.userAvatar
        //           ? item.user.userAvatar
        //           : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${
        //               item.user.userName
        //             }`,
        //       }}
        //     />
        //   </Left>
        //   <Body>
        //     <Text>{item.user.userName}</Text>
        //     <Text note>{item.text}</Text>
        //   </Body>
        //   <Right>
        //     <Text note>{farsiDate(item.date)}</Text>
        //   </Right>
        // </ListItem>
      );
    });
  };
  render() {
    const { post, isLoading } = this.state;
    const item = post;
    const postuser = post.user;
    const renderItem = ({ item }) => <Text>{item.text}</Text>;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Container>
          {/* <Header /> */}
          <Content contentContainerStyle={{ flex: 1 }} scrollEnabled={false}>
            <ScrollView
              ref={(ref) => {
                this.scrollView = ref;
              }}
            >
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
                    <Left>
                      <Icon
                        style={{ color: "#777", fontSize: 20 }}
                        name="ellipsis-v"
                        type="FontAwesome"
                      />
                    </Left>
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
                          ? item.likes.count +
                            " " +
                            "بار این پست پسندیده شده است"
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
                      textAlign: "right",
                      flex: 1,
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
                      name="comment-o"
                      type="FontAwesome"
                    />
                  </View>
                </CardItem>
                <CardItem
                  style={{ backgroundColor: "#fff", padding: 5 }}
                  cardBody
                >
                  <Body>
                    {/* <View style={{ flex: 1 }}> */}
                    {item.comments && item.comments.count > 0
                      ? this.commentList()
                      : null}
                    {/* </View> */}
                  </Body>
                </CardItem>
              </Card>
            </ScrollView>
            {firebase.auth().currentUser && (
              <Footer
                style={{
                  flexDirection: "row-reverse",
                  backgroundColor: "transparent",
                  borderTopWidth: 0,
                  //paddingHorizontal: 7,
                  paddingBottom: 0,
                  elevation: 0,
                  // height: 60,
                  width: "100%",
                }}
              >
                <View style={{ flex: 1, padding: 5 }}>
                  <Item regular>
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        addComment(
                          this.state.user,
                          item.id,
                          this.state.commentText
                        );
                        item.comments.count = item.comments.count + 1;
                        item.comments.comments.push({
                          commentId: uuid.v4(),
                          date: moment().unix(),
                          text: this.state.commentText,
                          user: this.state.user,
                        });

                        this.setState({
                          commentText: "",
                        });
                        Keyboard.dismiss();
                        this.scrollView.scrollToEnd({ animated: true });
                      }}
                    >
                      <Icon
                        type="FontAwesome"
                        active
                        name="paper-plane"
                        style={{ color: "#119ccf" }}
                      />
                    </TouchableOpacity>
                    <Textarea
                      style={{
                        flex: 1,
                        lineHeight: 26,
                        fontSize: 15,
                        fontFamily: "Shabnam-Light",
                        textAlign: "right",
                        padding: 5,
                        marginBottom: 10,
                        // height: 50,
                      }}
                      multiline={true}
                      placeholder="ارسال نظر"
                      value={this.state.commentText}
                      onChangeText={(commentText) =>
                        this.onChangeCommentText(commentText)
                      }
                    />
                  </Item>
                </View>
              </Footer>
            )}
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
              color="red"
            />
          ) : null}
        </Container>
      </SafeAreaView>
    );
  }
}

export default FeedSingle;
