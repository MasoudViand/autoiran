import React, { Component } from "react";
import { ActivityIndicator, FlatList, Text, View, Image } from "react-native";
import style from "./css/styles";
import { Container, Grid, Row, Col, Thumbnail } from "native-base";
export default class Standing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgArr: [],
      data: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    //get users data
    fetch("https://ergast.com/api/f1/current/driverStandings.json")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.MRData.StandingsTable.StandingsLists[0] });
      })
      .then(() => {
        let userData = this.state.data.DriverStandings;
        if (userData) {
          for (let index = 0; index < userData.length; index++) {
            let driverId = userData[index].Driver.driverId;
            let text = userData[index].Driver.url;
            let parts = text.split("/");
            let title = parts.pop();
            let url =
              "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages&piprop=thumbnail&pithumbsize=400&titles=" +
              title;
            fetch(url)
              .then((response) => response.json())
              .then((json) => {
                if (json.query.pages[0].thumbnail) {
                  var imgdata = json.query.pages[0].thumbnail.source;
                } else {
                  var imgdata = "";
                }

                this.setState((prevState) => ({
                  imgArr: [
                    ...prevState.imgArr,
                    { driverId: driverId, dirverImg: imgdata },
                  ],
                }));
              })
              .catch((error) => {
                console.error(error);
              });
          }
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  getImage = (driverId) => {
    let imgData = this.state.imgArr;
    for (let index = 0; index < imgData.length; index++) {
      if (driverId == imgData[index].driverId) {
        return imgData[index].dirverImg;
      }
    }
  };
  componentDidUpdate() {
    // if (this.state.imgArr.length == 20) {
    //   console.log(this.state.imgArr[norris]);
    //   let data = this.state.data.DriverStandings;
    //   let img = this.state.imgArr;
    //   data.map((item) => {
    //     for (let index = 0; index < img.length; index++) {
    //       if (item.Driver.driverId == img[index].driverId) {
    //         console.log(img[index].dirverImg);
    //       }
    //     }
    //   });
    // }
  }
  render() {
    const { data, isLoading } = this.state;

    const DefaultImage = "https://via.placeholder.com/150?text=No%20image";
    return (
      <Container style={{ flex: 1, padding: 24 }}>
        <Text style={[style.text, { fontSize: 23, marginBottom: 15 }]}>
          رتبه بندی رانندگان فصل {data.season}
        </Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data.DriverStandings}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => (
              <View style={{ paddingBottom: 15 }}>
                <Grid>
                  <Row style={style.card}>
                    <Col size={25}>
                      <Image
                        style={[style.thumbnail, { resizeMode: "cover" }]}
                        source={{
                          uri:
                            this.getImage(item.Driver.driverId) || DefaultImage,
                        }}
                      />
                    </Col>
                    <Col size={75} style={{ padding: 7 }}>
                      <Text style={style.text}>رتبه {item.position}</Text>
                      <Text style={style.text}>
                        نام راننده: {item.Driver.givenName}{" "}
                        {item.Driver.familyName} ({item.Driver.nationality})
                      </Text>
                      <Text style={style.text}>
                        تیم: {item.Constructors[0].name}
                      </Text>
                      <Text style={style.text}>
                        شماره راننده: {item.Driver.permanentNumber}
                      </Text>
                      <Text style={style.text}>امتیاز: {item.points}</Text>
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
}
