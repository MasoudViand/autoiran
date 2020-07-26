import firebase from "@react-native-firebase/app";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from "react-native";
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
  Grid,
  Col,
  Row,
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      confirmResult: null,
      verificationCode: "",
      userId: "",
      name: "",
      inputName: null,
    };
    this.navigate = this.props.navigation.navigate;
  }

  isLoggedin = () => {
    if (auth().currentUser) {
      return true;
    } else {
      return false;
    }
  };

  goToPage(page) {
    this.navigate(page, { name: this.state.inputName || this.state.name });
  }
  logOut = () => {
    auth()
      .signOut()
      .then(() => {
        this.setState({
          phone: "",
          confirmResult: null,
          verificationCode: "",
          userId: "",
          name: "",
          inputName: null,
        });
        this.navigate("Home");
        alert("User signed out!");
      });
  };

  renderSightoutView = () => {
    if (auth().currentUser) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row-reverse",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                color: "#222",
                writingDirection: "rtl",
                fontFamily: "Shabnam",
                textAlign: "right",
              }}
            >
              {this.state.inputName} عزیز خوش آمدید
            </Text>
          </View>
          <TouchableOpacity onPress={this.logOut}>
            <Text style={{ color: "#222" }}>خروج</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
            fontFamily: "Shabnam-Medium",
          }}
        >
          <TouchableOpacity onPress={() => this.navigate("Login")}>
            <Text
              style={{
                color: "#222",
                writingDirection: "rtl",
                fontFamily: "Shabnam",
                textAlign: "right",
              }}
            >
              ثبت نام/ورود
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  render() {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: "#fff", padding: 10 }]}
      >
        <Container>
          <ScrollView>
            <Grid>
              <Row>
                <Col>
                  <Card>
                    <CardItem>{this.renderSightoutView()}</CardItem>
                  </Card>
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
                      <CardItem cardBody>
                        <Image
                          source={{ uri: "https://picsum.photos/100" }}
                          style={{ height: 200, width: null, flex: 1 }}
                        />
                      </CardItem>
                      <CardItem bordered transparent footer>
                        <Text
                          style={{
                            flex: 1,
                            writingDirection: "rtl",
                            lineHeight: 25,
                            fontFamily: "Shabnam-Bold",
                            textAlign: "right",
                          }}
                        >
                          برنامه مسابقات
                        </Text>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity
                    onPress={() =>
                      this.navigate("Standing", {
                        name: this.state.inputName || this.state.name,
                      })
                    }
                  >
                    <Card>
                      <CardItem cardBody>
                        <Image
                          source={{ uri: "https://picsum.photos/100" }}
                          style={{ height: 200, width: null, flex: 1 }}
                        />
                      </CardItem>
                      <CardItem bordered transparent footer>
                        <Text
                          style={{
                            flex: 1,
                            writingDirection: "rtl",
                            lineHeight: 25,
                            fontFamily: "Shabnam-Bold",
                            textAlign: "right",
                          }}
                        >
                          جدول رتبه بندی فصل
                        </Text>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row>
                <Col>
                  <TouchableOpacity
                    onPress={() =>
                      this.navigate("Chat", {
                        name: this.state.inputName || this.state.name,
                      })
                    }
                  >
                    <Card>
                      <CardItem cardBody>
                        <Image
                          source={{ uri: "https://picsum.photos/100" }}
                          style={{ height: 200, width: null, flex: 1 }}
                        />
                      </CardItem>
                      <CardItem bordered transparent footer>
                        <Text
                          style={{
                            flex: 1,
                            writingDirection: "rtl",
                            lineHeight: 25,
                            fontFamily: "Shabnam-Bold",
                            textAlign: "right",
                          }}
                        >
                          پخش زنده
                        </Text>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity
                    onPress={() =>
                      this.navigate("News", {
                        name: this.state.inputName || this.state.name,
                      })
                    }
                  >
                    <Card>
                      <CardItem cardBody>
                        <Image
                          source={{ uri: "https://picsum.photos/100" }}
                          style={{ height: 200, width: null, flex: 1 }}
                        />
                      </CardItem>
                      <CardItem bordered transparent footer button>
                        <Text
                          style={{
                            flex: 1,
                            writingDirection: "rtl",
                            lineHeight: 25,
                            fontFamily: "Shabnam-Bold",
                            textAlign: "right",
                          }}
                        >
                          آخرین اخبار
                        </Text>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row>
                <Col>
                  <TouchableOpacity
                    onPress={() =>
                      this.navigate("News", {
                        name: this.state.inputName || this.state.name,
                      })
                    }
                  >
                    <Card>
                      <CardItem cardBody>
                        <Image
                          source={{ uri: "https://picsum.photos/100" }}
                          style={{ height: 200, width: null, flex: 1 }}
                        />
                      </CardItem>
                      <CardItem bordered transparent footer button>
                        <Text
                          style={{
                            flex: 1,
                            writingDirection: "rtl",
                            lineHeight: 25,
                            fontFamily: "Shabnam-Bold",
                            textAlign: "right",
                          }}
                        >
                          برنامه مسابقات
                        </Text>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                </Col>
              </Row>
            </Grid>
          </ScrollView>
        </Container>
      </SafeAreaView>
    );
  }
  componentDidMount() {
    if (auth().currentUser) {
      var userId = auth().currentUser.uid;
      database()
        .ref("/users/" + userId)
        .once("value", (snapshot) => {
          var username = (snapshot.val() && snapshot.val().Name) || null;
          this.setState({ inputName: username });
        });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aaa",
  },
  page: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  center: {
    alignContent: "center",
    alignItems: "center",
  },
  textInput: {
    marginTop: 20,
    width: "90%",
    height: 40,
    borderColor: "#555",
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
    color: "#fff",
    fontSize: 16,
  },
  themeButton: {
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#888",
    borderColor: "#555",
    borderWidth: 2,
    borderRadius: 5,
  },
  themeButtonTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  verificationView: {
    width: "100%",
    alignItems: "center",
    marginTop: 50,
  },
});
export default Home;
