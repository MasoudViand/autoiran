import React from "react";
import { View, Button, Icon, FooterTab } from "native-base";

function TabBar(props) {
  const { navigate, route } = props;
  return (
    <FooterTab>
      <Button
        active={route === "Home" ? true : false}
        style={{ borderRadius: 0 }}
        onPress={() => navigate("Home")}
      >
        <Icon name="th-large" type="FontAwesome" />
      </Button>
      <Button
        active={route === "Feed" ? true : false}
        onPress={() => navigate("Feed")}
      >
        <Icon name="feed" type="FontAwesome" />
      </Button>
      <Button
        active={route === "User" ? true : false}
        onPress={() => navigate("User")}
      >
        <Icon name="user-o" type="FontAwesome" />
      </Button>
    </FooterTab>
  );
}

export default TabBar;
