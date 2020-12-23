import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import moment from "moment";
import style from "./css/styles";
import Flag from "react-native-flags";
//import { IMG_DIR } from "../Constants";
import {
  Grid,
  Row,
  Col,
  Card,
  CardItem,
  Body,
  Header,
  Container,
  H1,
  Picker,
  Item,
  Content,
  Form,
  Icon,
} from "native-base";
export default class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      selectedItem: undefined,
      selected: "null",
      seasons: [],
      races: [],
    };
    this.navigate = this.props.navigation.navigate;
  }
  onValueChange(value) {
    this.setState({
      selected: value,
    });
    this.getRaces(value);
  }
  circuitImg = (id) => {
    //require('../assets/img/circuits/')
    let imageName = id + ".png";
    var url =
      "http://autoiran.com/formula1/assets/circuits/" + imageName.toLowerCase();
    return url;
  };
  async componentDidMount() {
    await this.getSeasons();
    await this.getRaces(this.state.selected);
    this.setState({ isLoading: false });
  }
  async getSeasons() {
    this.setState({ isLoading: true });
    await fetch("https://api.sofascore.com/api/v1/unique-stage/40/seasons")
      .then((response) => response.json())
      .then((json) => {
        let seasons = [];
        json.seasons.map((item) => {
          seasons.push({ label: item.description, value: item.id });
        });
        this.setState({ seasons: seasons, selected: seasons[0].value });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  async getRaces(season) {
    this.setState({ isLoading: true });
    await fetch(
      "https://api.sofascore.com/api/v1/stage/" + season + "/substages"
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({ races: json.stages });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  getCurrent() {
    fetch("https://ergast.com/api/f1/current.json")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.MRData.RaceTable });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  defaultImage(id) {
    let defaultImage = "https://via.placeholder.com/150?text=No%20image";
    let webImage = "https://api.sofascore.com/api/v1/stage/" + id + "/image";

    if (!webImage) {
      defaultImage = defaultImage;
    } else {
      defaultImage = webImage;
    }

    return defaultImage;
  }
  render() {
    const { data, isLoading, seasons, races } = this.state;

    return (
      <Container style={{ flex: 1, padding: 24 }}>
        <Text style={[style.text, { marginBottom: 15, fontSize: 26 }]}>
          {"Season Schedule"}
        </Text>
        <Content>
          {isLoading ? (
            <ActivityIndicator size="large" color="red" />
          ) : (
            <View style={{ flex: 1 }}>
              {seasons && (
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
                    {seasons.map((item, index) => {
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
              <Grid>
                <Row style={{ flexDirection: "column" }}>
                  {races &&
                    races.map((item, index) => {
                      return (
                        <TouchableHighlight
                          key={index}
                          onPress={() =>
                            this.navigate("RaceSingle", {
                              raceID: item.id,
                            })
                          }
                        >
                          <Col size={50} style={style.card}>
                            <View style={{ backgroundColor: "#e1e1e1" }}>
                              <Image
                                style={[
                                  style.cardImage,
                                  { resizeMode: "cover" },
                                ]}
                                source={{
                                  uri: this.defaultImage(item.id),
                                }}
                              />
                            </View>
                            <View style={style.boxPadding}>
                              <Text style={{ paddingVertical: 3 }}>
                                {"Race: "}
                                <Text style={style.textSecondary}>
                                  {item.description + " "}
                                  <Flag code={item.country.alpha2} size={16} />
                                </Text>
                              </Text>

                              <Text style={{ paddingVertical: 3 }}>
                                {"Circuit: "}
                                <Text style={style.textSecondary}>
                                  {item.info.circuit}
                                </Text>
                              </Text>

                              <Text style={{ paddingVertical: 3 }}>
                                {"Status: "}
                                <Text style={style.textSecondary}>
                                  {item.status.description}
                                </Text>
                              </Text>
                              {item.winner && (
                                <Text style={{ paddingVertical: 3 }}>
                                  {"Winner: "}
                                  <Text style={style.textSecondary}>
                                    {item.winner.name + " "}
                                    <Flag
                                      code={item.winner.country.alpha2}
                                      size={16}
                                    />
                                  </Text>
                                </Text>
                              )}
                              <Text style={{ paddingVertical: 3 }}>
                                {"Date: "}
                                <Text style={style.textSecondary}>
                                  {moment
                                    .unix(item.startDateTimestamp)
                                    .format("DD MMMM YYYY")}
                                </Text>
                              </Text>
                            </View>
                          </Col>
                        </TouchableHighlight>
                      );
                    })}
                </Row>
              </Grid>
            </View>
          )}
        </Content>
      </Container>
    );
  }
}
