import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";
//import moment from "moment";
import style from "./css/styles";
import "moment/min/locales";
import moment from "jalali-moment";
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
} from "native-base";
export default class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    };
  }
  circuitImg = (id) => {
    //require('../assets/img/circuits/')
    imageName = id + ".png";
    var url =
      "http://autoiran.com/formula1/assets/circuits/" + imageName.toLowerCase();
    return url;
  };
  componentDidMount() {
    moment.locale("fa");
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

  render() {
    const { data, isLoading } = this.state;

    return (
      <Container style={{ flex: 1, padding: 24 }}>
        <Text style={[style.text, { marginBottom: 15, fontSize: 26 }]}>
          برنامه مسابقات فصل {data.season}
        </Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data.Races}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => (
              <View style={{ paddingBottom: 15 }}>
                <Grid>
                  <Row style={style.card}>
                    <Col size={35} style={{ backgroundColor: "#aaa" }}>
                      <Image
                        style={style.thumbnail}
                        source={{
                          uri: this.circuitImg(item.Circuit.circuitId),
                        }}
                      />
                    </Col>
                    <Col size={65} style={style.boxPadding}>
                      <Text style={[style.text, { paddingBottom: 7 }]}>
                        مسابقه: {item.raceName}
                      </Text>
                      <Text style={[style.text, { paddingBottom: 7 }]}>
                        تاریخ مسابقه: {this.farsiDate(item.date)}
                      </Text>
                      <Text style={[style.text, { paddingBottom: 7 }]}>
                        مکان: {item.Circuit.Location.locality}(
                        {item.Circuit.Location.country})
                      </Text>
                      <Text style={style.text}>
                        پیست: {item.Circuit.circuitName}
                      </Text>
                    </Col>
                  </Row>
                </Grid>
              </View>
            )}
          />
        )}
      </Container>
    );
  }
  farsiDate = (date) => {
    return moment.from(date, "en", "YYYY/MM/DD").format("D MMM YYYY");
  };
}
