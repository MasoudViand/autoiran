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
} from "react-native";
import ImagePicker from "react-native-image-picker";
import firebase from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import uuid from "uuid";
import style from "./css/styles";
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
  Item,
  Textarea,
  Form,
  Toast,
} from "native-base";
import moment from "moment";
import "moment/min/locales";
class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { userId: null, userName: null, userAvatar: null },
      image: null,
      uploadedImg: null,
      description: "",
      showToast: false,
      isLogged: false,
    };
    this.navigate = this.props.navigation.navigate;
  }
  componentDidMount() {
    if (firebase.auth().currentUser) {
      this.getUserData();
    }
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
  onChangeDescription = (description) => {
    this.setState({ description });
  };

  selectImage = () => {
    // this.setState({ isLoading: true });
    const options = {
      //noData: true,
      mediaType: "photo",
      quality: 0.6, // range is 0.1 - 1.0
      maxWidth: 800,
      maxHeight: 800,
      //allowsEditing: true,
      skipBackup: true,
      //path: "images",
      //data: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({
          image: source,
          // isLoading: false,
        });
      }
    });
  };
  onSubmit = async () => {
    let userId = this.state.user.userId;
    if (userId) {
      this.setState({ isLoading: true });
      const id = uuid.v4();
      const time = moment().unix();
      let url = null;
      if (this.state.description) {
        try {
          if (this.state.image) {
            var postPhoto = this.state.image.uri;
            const imageRef = storage().ref(`images/${id}.jpg`);
            await imageRef.putFile(postPhoto, { contentType: "image/jpg" });
            url = await imageRef.getDownloadURL();
          }
          const uploadData = {
            id: id,
            user: this.state.user,
            postPhoto: url ? url : null,
            postDescription: this.state.description,
            // likes: [],
            // comments: [],
            createdAt: time,
          };
          firebase
            .firestore()
            .collection("posts")
            .doc(id)
            .set(uploadData)
            .then(() => {
              this.setState({
                image: null,
                description: "",
                isLoading: false,
              });
              Toast.show({
                text: "پست شما با موفقیت ارسال شد",
                //buttonText: "باشه",
                type: "success",
                textStyle: style.toasttext,
              });
              //alert("success");
              this.props.navigation.push("Feed");
            });
        } catch (error) {
          this.setState({ isLoading: false });
          alert(error.message);
          console.log(error);
        }
      } else {
        this.setState({ isLoading: false });
        alert("لطفا متنی را وارد کنید");
      }
    } else {
      this.setState({ isLoading: false });
      alert("لطفا دوباره وارد شوید");
    }
  };
  render() {
    const { isLoading, isLogged } = this.state;
    return (
      <Container>
        {isLoading ? <ActivityIndicator size="large" color="red" /> : null}
        <Content padder>
          {isLogged ? (
            <View>
              <Form>
                <View>
                  {this.state.image ? (
                    <View>
                      <TouchableOpacity
                        onPress={() => this.setState({ image: null })}
                      >
                        <Icon type="FontAwesome" name="close" />
                      </TouchableOpacity>
                      <Image
                        source={this.state.image}
                        style={{ width: "100%", height: 300 }}
                      />
                    </View>
                  ) : (
                    <Button
                      danger
                      onPress={this.selectImage}
                      style={{
                        flex: 1,
                        alignItems: "center",
                        padding: 10,
                        margin: 30,
                        alignSelf: "center",
                      }}
                    >
                      <Text style={{ fontFamily: "Shabnam-Light" }}>
                        انتخاب عکس
                      </Text>
                    </Button>
                  )}
                </View>
                <Textarea
                  style={style.text}
                  rowSpan={5}
                  bordered
                  placeholder="متن خود را وارد کنید"
                  value={this.state.description}
                  onChangeText={(description) =>
                    this.onChangeDescription(description)
                  }
                />
                <Button
                  success
                  style={{ paddingLeft: 5, marginTop: 10 }}
                  onPress={this.onSubmit}
                >
                  <Text style={{ fontFamily: "Shabnam-Light" }}>ارسال</Text>
                </Button>
              </Form>
              <View style={{ marginTop: 40 }}>
                <Text
                  style={{
                    fontFamily: "Shabnam-Thin",
                    fontSize: 14,
                    textAlign: "right",
                  }}
                >
                  - برای ایجاد کردن پست جدید حتما باید متن پست را درج کنید
                </Text>
                <Text
                  style={{
                    fontFamily: "Shabnam-Thin",
                    fontSize: 14,
                    textAlign: "right",
                  }}
                >
                  - انتخاب تصویر اجباری نمی باشد
                </Text>
                <Text
                  style={{
                    fontFamily: "Shabnam-Thin",
                    fontSize: 14,
                    textAlign: "right",
                  }}
                >
                  - ارسال هرگونه پست غیر اخلاقی، تروریسم، ترویج خشونت و نفرت
                  پراکنی ممنوع بوده و در صورت مشاهده اکانت شما مسدود می گردد
                </Text>
              </View>
            </View>
          ) : (
            <View style={[style.centeredView, { paddingTop: 50 }]}>
              <Text style={style.text}>برای ارسال پست لطفا وارد شوید</Text>
              <Button
                style={{ alignSelf: "center", marginVertical: 30 }}
                success
                onPress={() => this.navigate("Login")}
              >
                <Text style={{ fontFamily: "Shabnam-Light" }}>
                  ورود / ثبت نام
                </Text>
              </Button>
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

export default AddPost;
