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
import { View, Text } from "react-native";

// function HomeScreen() {
//   return <PhoneAuthScreen />;
// }

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
