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
import Flag from "react-native-flags";
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
  Picker,
} from "native-base";
import moment from "moment";
class RaceSingle extends Component {
  constructor(props) {
    super(props);
    const params = this.props.route.params;
    const raceID = params.raceID;
    this.state = {
      raceID: raceID,
      isLoading: false,
      selected: "null",
      pageTitle: "",
      raceInfo: [],
    };
    this.navigate = this.props.navigation.navigate;
  }
  async componentDidMount() {
    console.log("klm", this.props.route);
    this.setState({ isLoading: true });
    await this.getRaces(this.state.raceID);
    await this.getRaceInfo(this.state.selected);
    this.setState({ isLoading: false });
  }

  async getRaces(raceID) {
    this.setState({ isLoading: true });
    await fetch(
      "https://api.sofascore.com/api/v1/stage/" + raceID + "/substages"
    )
      .then((response) => response.json())
      .then((json) => {
        let races = [];
        json.stages.map((item) => {
          races.push({
            label: item.description,
            value: item.id,
          });
        });
        let titleTime = moment
          .unix(json.stages[0].startDateTimestamp)
          .format("DD MMMM YYYY");
        this.setState({
          races: races,
          selected: races[0].value,
          pageTitle: json.stages[0].stageParent.description + " - " + titleTime,
        });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  async getRaceInfo(raceID) {
    this.setState({ isLoading: true });
    await fetch(
      "https://api.sofascore.com/api/v1/stage/" +
        raceID +
        "/standings/competitor"
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          raceInfo: json.standings,
        });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  onValueChange(value) {
    this.setState({
      selected: value,
    });
    this.getRaceInfo(value);
  }
  render() {
    const { races, isLoading, raceInfo } = this.state;
    return (
      <Container style={{ flex: 1, padding: 24 }}>
        <Text style={{ fontSize: 20 }}>{this.state.pageTitle}</Text>
        {/* <Header /> */}
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
        ) : (
          <Content style={{ flex: 1 }}>
            <View>
              {races && (
                <Form>
                  <Picker
                    iosIcon={<Icon name="angle-down" type="FontAwesome" />}
                    iosHeader="Select one"
                    mode="dropdown"
                    style={{
                      borderColor: "#e1e1e1",
                      borderWidth: 1,
                      marginBottom: 20,
                    }}
                    selectedValue={this.state.selected}
                    placeholder="Select One"
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    {races.map((item, index) => {
                      return (
                        <Picker.Item
                          label={item.label}
                          value={item.value}
                          key={index}
                        />
                      );
                    })}
                  </Picker>
                </Form>
              )}
              <View style={{ paddingBottom: 15 }}>
                <Row style={{ flex: 1, paddingBottom: 10 }}>
                  <Col size={8}>
                    <Text style={style.text}>Pos</Text>
                  </Col>
                  <Col size={50}>
                    <Text style={style.text}> Driver</Text>
                  </Col>
                  {raceInfo.length > 0 && raceInfo[0].points !== 0 && (
                    <Col size={12}>
                      <Text style={[style.text, { textAlign: "center" }]}>
                        Points
                      </Text>
                    </Col>
                  )}
                  <Col size={30}>
                    <Text style={[style.text, { textAlign: "right" }]}>
                      Time
                    </Text>
                  </Col>
                </Row>
              </View>
              {raceInfo &&
                raceInfo.map((item, index) => {
                  return (
                    <View key={index} style={{ paddingBottom: 25, height: 55 }}>
                      <Row style={{ flex: 1, paddingBottom: 25 }}>
                        <Col size={7}>
                          <Text style={style.text}>
                            {item.position !== 0 ? item.position : ""}
                          </Text>
                        </Col>
                        <Col size={50}>
                          <Text style={style.text}>
                            {item.team.name}{" "}
                            <Flag code={item.team.country.alpha2} size={16} />
                          </Text>
                          <Text style={{ color: "#777", fontSize: 14 }}>
                            {item.parentTeam ? item.parentTeam.name : ""}
                          </Text>
                        </Col>
                        {raceInfo[0].points !== 0 && (
                          <Col size={13}>
                            <Text style={[style.text, { textAlign: "center" }]}>
                              {item.points}{" "}
                            </Text>
                          </Col>
                        )}
                        <Col size={30}>
                          <Text style={[style.text, { textAlign: "right" }]}>
                            {item.gap}{" "}
                          </Text>
                        </Col>
                      </Row>
                    </View>
                  );
                })}
            </View>
          </Content>
        )}
      </Container>
    );
  }
}

export default RaceSingle;
