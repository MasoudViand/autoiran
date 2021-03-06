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
  StatusBar,
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
  Footer,
  FooterTab,
  Badge,
} from "native-base";
import style from "./css/styles";
import { ScrollView } from "react-native-gesture-handler";
import TabBar from "./components/TabBar";

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
            <Text style={style.text}>
              {"Wellcome"} {this.state.inputName}
            </Text>
          </View>
          <TouchableOpacity onPress={this.logOut}>
            <Text style={style.text}>{"Logout"}</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            padding: 10,
            alignContent: "center",
            alignItems: "center",
            fontFamily: "Shabnam-Medium",
          }}
        >
          <TouchableOpacity onPress={() => this.navigate("Login")}>
            <Text style={style.text}>{"Login/Register"}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  render() {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: "#fff" }]}>
        <StatusBar
          backgroundColor="red"
          barStyle="light-content" // Here is where you change the font-color
        />
        <Container>
          <ScrollView style={{ padding: 10 }}>
            <Grid style={{ paddingBottom: 60 }}>
              <Row>
                <Col>
                  <Card>
                    <CardItem>{this.renderSightoutView()}</CardItem>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col size={60}>
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
                          source={require("../assets/img/schedule.jpg")}
                          style={{ height: 200, width: null, flex: 1 }}
                        />
                      </CardItem>
                      <CardItem bordered transparent footer>
                        <Text
                          numberOfLines={1}
                          adjustsFontSizeToFit
                          style={{
                            flex: 1,
                            lineHeight: 25,
                            textAlign: "center",
                            color: "#222",
                          }}
                        >
                          {"Season Schedule"}
                        </Text>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                </Col>

                <Col size={40}>
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
                          source={require("../assets/img/standing.jpg")}
                          style={{ height: 200, width: null, flex: 1 }}
                        />
                      </CardItem>
                      <CardItem bordered transparent footer>
                        <Text
                          numberOfLines={1}
                          adjustsFontSizeToFit
                          style={{
                            flex: 1,
                            lineHeight: 25,
                            textAlign: "center",
                            color: "#222",
                          }}
                        >
                          {"Standing"}
                        </Text>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row>
                <Col size={40}>
                  <TouchableOpacity
                    onPress={() =>
                      this.navigate("Chat")
                    }
                  >
                    <Card>
                      <CardItem cardBody>
                        <Image
                          source={require("../assets/img/live.jpg")}
                          style={{ height: 200, width: null, flex: 1 }}
                        />
                      </CardItem>
                      <CardItem bordered transparent footer>
                        <Text
                          numberOfLines={1}
                          adjustsFontSizeToFit
                          style={{
                            flex: 1,
                            lineHeight: 25,
                            textAlign: "center",
                            color: "#222",
                          }}
                        >
                          {"Live Coverage"}
                        </Text>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                </Col>
                <Col size={60}>
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
                          source={require("../assets/img/news.jpg")}
                          style={{ height: 200, width: null, flex: 1 }}
                        />
                      </CardItem>
                      <CardItem bordered transparent footer button>
                        <Text
                          numberOfLines={1}
                          adjustsFontSizeToFit
                          style={{
                            flex: 1,
                            lineHeight: 25,
                            textAlign: "center",
                            color: "#222",
                          }}
                        >
                          {"News"}
                        </Text>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                </Col>
              </Row>
              {/* <Row>
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
                          source={{ uri: "https://picsum.photos/300" }}
                          style={{ height: 200, width: null, flex: 1 }}
                        />
                      </CardItem>
                      <CardItem bordered transparent footer button>
                        <Text
                          numberOfLines={1}
                          adjustsFontSizeToFit
                          style={{
                            flex: 1,
                            lineHeight: 25,
                            textAlign: "center",
                            color: "#222",
                          }}
                        >
                          {"Race Schedule"}
                        </Text>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                </Col>
              </Row> */}
            </Grid>
          </ScrollView>
          <Footer>
            <TabBar navigate={this.navigate} route={"Home"} />
          </Footer>
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
});
export default Home;
