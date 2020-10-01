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
import FeedSingle from "./screens/FeedSingle";
//import { Button } from "react-native";
import { Button, Icon, Text, Root, StatusBar } from "native-base";

const Stack = createStackNavigator();

function App() {
  return (
    <Root>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            //animationEnabled: false,
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "300",
              fontFamily: "Shabnam-Light",
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "F1 IRAN",
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "ورود" }}
          />
          <Stack.Screen
            name="News"
            component={News}
            options={{ title: "اخبار" }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{ title: "پخش زنده" }}
          />
          <Stack.Screen
            name="User"
            component={User}
            options={{ title: "حساب کاربری", animationEnabled: false }}
          />
          <Stack.Screen
            name="SingleNews"
            component={SingleNews}
            options={{ title: null }}
          />
          <Stack.Screen
            name="Standing"
            component={Standing}
            options={{ title: "رده بندی" }}
          />
          <Stack.Screen
            name="Schedule"
            component={Schedule}
            options={{ title: "برنامه مسابقات" }}
          />
          <Stack.Screen
            name="Feed"
            component={Feed}
            options={({ navigation }) => ({
              title: null,
              headerLeft: null,
              animationEnabled: false,

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
                    type="Ionicons"
                    name="add-circle-outline"
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
            options={{ title: "ارسال پست" }}
          />
          <Stack.Screen
            name="FeedSingle"
            component={FeedSingle}
            options={{ title: null }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
}

export default App;
