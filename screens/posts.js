import react, { component } from "react";
import { FlatList, View, Text, Image } from "react-native";

export default class Posts extends component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.navigate = this.props.navigation.navigate;
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    const apiURL = "https://jsonplaceholder.typicode.com/photos?_limit=10";
    fetch(apiURL)
      .then((res) => res.json)
      .then((resJson) => {
        this.setState({
          data: resJson,
        });
      });
  };
  renderRow = ({ item }) => {
    <View>
      <Image source={{ uri: item.url }} />
      <Text>{item.title}</Text>
    </View>;
  };
  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderRow}
        keyExtractor={(Item, (index) => index.toString)}
      />
    );
  }
}
