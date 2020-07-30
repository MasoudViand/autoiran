import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Chat from "./screens/Chat";
import News from "./screens/News";
import User from "./screens/User";
import Home from "./screens/Home";
import SingleNews from "./screens/SingleNews";
import Standing from "./screens/Standing";
import Schedule from "./screens/Schedule";
import Feed from "./screens/Feed";
import AddFeed from "./screens/AddFeed";
//import { Button } from "react-native";
import { Button, Icon, Text, Root } from "native-base";

const Stack = createStackNavigator();

function App() {
  return (
    <Root>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Home",
              headerStyle: {
                backgroundColor: "#ff6738",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="News"
            component={News}
            options={{ title: "News" }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{ title: "Live" }}
          />
          <Stack.Screen
            name="User"
            component={User}
            options={{ title: "Account" }}
          />
          <Stack.Screen
            name="SingleNews"
            component={SingleNews}
            options={{ title: null }}
          />
          <Stack.Screen
            name="Standing"
            component={Standing}
            options={{ title: "Standing" }}
          />
          <Stack.Screen
            name="Schedule"
            component={Schedule}
            options={{ title: "Schedule" }}
          />
          <Stack.Screen
            name="Feed"
            component={Feed}
            options={({ navigation }) => ({
              title: null,
              headerLeft: null,
              animationEnabled: false,
              headerStyle: {
                backgroundColor: "#ff6738",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },

              headerRight: () => (
                <Button
                  style={{
                    backgroundColor: null,
                    borderWidth: null,
                    borderColor: null,
                    flexDirection: "row-reverse",
                    elevation: 0,
                  }}
                  onPress={() => {
                    navigation.navigate("AddFeed");
                  }}
                >
                  <Icon
                    style={{
                      color: "#fff",
                      fontSize: 30,
                      padding: 0,
                      margin: 0,
                    }}
                    type="FontAwesome"
                    name="plus"
                  />
                  <Text
                    style={{
                      color: "#e1e1e1",
                      fontFamily: "Shabnam-Light",
                      textAlign: "right",
                      padding: 0,
                      marginRight: -20,
                    }}
                  >
                    ارسال پست
                  </Text>
                </Button>
              ),
            })}
          />
          <Stack.Screen
            name="AddFeed"
            component={AddFeed}
            options={{ title: "Add Post" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
}

export default App;
