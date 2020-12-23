import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
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
import RaceSingle from "./screens/RaceSingle";
//import { Button } from "react-native";
import {
  Button,
  Icon,
  Text,
  Root,
  StatusBar,
  View,
  Row,
  Col,
} from "native-base";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyHeader(props) {
  const { title, onPress, rightBtn, navigate } = props;
  return (
    <View
      style={{
        width: "100%",
        height: 50,
        backgroundColor: "#f4511e",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Row>
        <Col size={15}>
          <Button
            style={{
              backgroundColor: null,
              borderWidth: null,
              borderColor: null,
              flexDirection: "row-reverse",
              elevation: 0,
            }}
            onPress={() => {
              onPress();
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
              name="bars"
            />
          </Button>
        </Col>
        <Col size={70}>
          <Text
            style={{
              color: "#fff",
              fontSize: 17,
              padding: 0,
              margin: 0,
              textAlign: "center",
              alignSelf: "center",
              lineHeight: 50,
            }}
          >
            {title}
          </Text>
        </Col>
        <Col size={15}>
          {rightBtn && (
            <Button
              style={{
                backgroundColor: null,
                borderWidth: null,
                borderColor: null,
                flexDirection: "row-reverse",
                elevation: 0,
              }}
              onPress={() => {
                navigate("AddFeed");
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
            </Button>
          )}
        </Col>
      </Row>
    </View>
  );
}
function addBtn() {
  return (
    <Button
      style={{
        backgroundColor: null,
        borderWidth: null,
        borderColor: null,
        flexDirection: "row-reverse",
        elevation: 0,
      }}
      onPress={() => {
        navigate("AddFeed");
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
    </Button>
  );
}
function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        swipeEnabled: false,
        header: ({ scene }) => {
          const { options } = scene.descriptor;
          const rightBtn = options.rightBtn ? true : false;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;

          return (
            <MyHeader
              rightBtn={rightBtn}
              title={title}
              onPress={scene.descriptor.navigation.toggleDrawer}
              navigate={scene.descriptor.navigation.navigate}
              // style={options.headerStyle}
            />
          );
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {/* <Drawer.Screen name="Home" component={App} /> */}
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen
        name="Feed"
        component={Feed}
        options={{
          rightBtn: true,
        }}
      />
      <Drawer.Screen name="News" component={News} />
      <Drawer.Screen name="Live" component={Chat} />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />

      <Drawer.Screen
        name="SingleNews"
        component={SingleNews}
        options={{ title: "" }}
      />
      <Drawer.Screen
        name="Standing"
        component={Standing}
        options={{ title: "Standing" }}
      />
      <Drawer.Screen
        name="Schedule"
        component={Schedule}
        options={{ title: "Season Schedule" }}
      />
      <Drawer.Screen
        name="AddFeed"
        component={AddFeed}
        options={{ title: "Send Post" }}
      />
      <Drawer.Screen
        name="FeedSingle"
        component={FeedSingle}
        options={{ title: "" }}
      />
      <Drawer.Screen
        name="RaceSingle"
        component={RaceSingle}
        options={{ title: "" }}
      />
      <Drawer.Screen
        name="User"
        component={User}
        options={{ title: "User Account" }}
      />
    </Drawer.Navigator>
  );
}
function CustomDrawerContent(props) {
  const { state, ...rest } = props;
  const newState = { ...state };
  newState.routes = newState.routes.filter(
    //(item) => item.name !== "RaceSingle"
    (item) =>
      !["RaceSingle", "FeedSingle", "Login", "SingleNews", "AddFeed"].includes(
        item.name
      )
  );
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList state={newState} {...rest} />
      {/* 
      <DrawerItem
        label="News"
        onPress={() => props.navigation.navigate("News")}
      /> */}
    </DrawerContentScrollView>
  );
}
function App() {
  return (
    <Root>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </Root>
  );
}
function App_old() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        // headerStyle: {
        //   backgroundColor: "#f4511e",
        // },
        // headerTintColor: "#fff",
        // headerTitleStyle: {
        //   fontWeight: "300",
        //   fontFamily: "Shabnam-Light",
        // },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: null,
          headerShown: false,
          headerRight: null,
          animationEnabled: false,

          headerLeft: () => (
            <Button
              style={{
                backgroundColor: null,
                borderWidth: null,
                borderColor: null,
                flexDirection: "row-reverse",
                elevation: 0,
              }}
              onPress={() => {
                navigation.toggleDrawer();
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
                name="bars"
              />
            </Button>
          ),
        })}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <Stack.Screen name="News" component={News} options={{ title: "News" }} />
      <Stack.Screen name="Chat" component={Chat} options={{ title: "Live" }} />
      <Stack.Screen
        name="User"
        component={User}
        options={{ title: "User Account", animationEnabled: false }}
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
        options={{ title: "Season Schedule" }}
      />
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={({ navigation }) => ({
          title: "Feed",

          animationEnabled: false,
          headerLeft: () => (
            <Button
              style={{
                backgroundColor: null,
                borderWidth: null,
                borderColor: null,
                flexDirection: "row-reverse",
                elevation: 0,
              }}
              onPress={() => {
                navigation.toggleDrawer();
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
                name="bars"
              />
            </Button>
          ),
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
                {"Add Post"}
              </Text>
            </Button>
          ),
        })}
      />
      <Stack.Screen
        name="AddFeed"
        component={AddFeed}
        options={{ title: "Send Post" }}
      />
      <Stack.Screen
        name="FeedSingle"
        component={FeedSingle}
        options={{ title: null }}
      />
      <Stack.Screen
        name="RaceSingle"
        component={RaceSingle}
        options={{ title: null }}
      />
    </Stack.Navigator>
  );
}

export default App;
