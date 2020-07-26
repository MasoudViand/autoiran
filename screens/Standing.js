import React, { Component } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default class Standing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch("https://ergast.com/api/f1/current/driverStandings.json")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.MRData.StandingsTable.StandingsLists[0] });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 24 }}>
        <Text>Season: {data.season}</Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data.DriverStandings}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => (
              <View style={{ paddingBottom: 15 }}>
                <Text>
                  {item.position}- {item.Driver.givenName}{" "}
                  {item.Driver.familyName}
                  (#{item.Driver.permanentNumber}) - {item.Constructors[0].name}
                  , {item.points} Points
                </Text>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}
