import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PhoneAuthScreen from "./screens/Main";
import Chat from "./screens/Chat";
import News from "./screens/News";
import { View, Text } from "react-native";

// function HomeScreen() {
//   return <PhoneAuthScreen />;
// }

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={PhoneAuthScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ title: "Live" }}
        />
        <Stack.Screen
          name="News"
          component={News}
          options={{ title: "News" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
