import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
//import moment from "moment";
//import "moment/min/locales";
import moment from "jalali-moment";
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

  componentDidMount() {
    //moment.locale("fa");
    fetch("https://ergast.com/api/f1/current.json")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.MRData.RaceTable });
        console.log(this.state.data);
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
        <H1 style={[style.text, { marginBottom: 15 }]}>
          برنامه مسابقات فصل {data.season}
        </H1>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data.Races}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => (
              <View style={{ paddingBottom: 15 }}>
                <Grid>
                  <Row style={style.card}>
                    <Col>
                      <Text style={style.text}>مسابقه: {item.raceName}</Text>
                      <Text style={style.text}>
                        تاریخ مسابقه: {this.farsiDate(item.date)}
                      </Text>
                      <Text style={style.text}>
                        پیست: {item.Circuit.circuitName}
                      </Text>
                      <Text style={style.text}>
                        مکان: {item.Circuit.Location.locality}(
                        {item.Circuit.Location.country})
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
const style = StyleSheet.create({
  text: {
    fontFamily: "Shabnam",
    color: "#222",
    textAlign: "right",
    writingDirection: "rtl",
  },
  card: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: "rgba(193, 173, 173, 0.3)",
    borderRadius: 7,
  },
});
