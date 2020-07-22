import firebase from "react-native-firebase";
// import firebase from "@react-native-firebase/app";
// import database from "@react-native-firebase/database";
import _ from "lodash";
class Fire {
  constructor() {
    this.init();
    this.observeAuth();
  }
  state = {
    isLogged: false,
  };
  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyADaREJngiW4x78ppPkiFI0COVdRE8pwV8",
        authDomain: "autoiran-5818f.firebaseapp.com",
        databaseURL: "https://autoiran-5818f.firebaseio.com",
        projectId: "autoiran-5818f",
        storageBucket: "",
        messagingSenderId: "417245324345",
      });
    }
  };

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = (user) => {
    // firebase
    //   .database()
    //   .ref("users")
    //   .child(user.uid)
    //   .set("name", "mASOUD");
    if (!user) {
      //this.props.navigation.navigate("Main");
      // try {
      //   firebase.auth().signInAnonymously();
      // } catch ({ message }) {
      //   alert(message);
      // }
    }
  };

  get uid() {
    const uid = (firebase.auth().currentUser || {}).uid;
    return uid;
  }
  // get profile() {
  //   var userId = firebase.auth().currentUser.uid;
  //   firebase
  //     .database()
  //     .ref("/users/" + userId + "/Name")
  //     .once("value", (snapshot) => {
  //       this.setState({ userName: snapshot.val() });
  //     });
  //   return this.state.userName;
  // }
  get ref() {
    return firebase.database().ref("messages");
  }

  parse = (snapshot) => {
    const { createdAt: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const createdAt = new Date(numberStamp);
    const message = {
      _id,
      createdAt,
      text,
      user,
    };
    return message;
  };

  on = (callback) =>
    this.ref
      .limitToLast(20)
      .on("child_added", (snapshot) => callback(this.parse(snapshot)));

  get timestamp() {
    newTime = firebase.database.ServerValue.TIMESTAMP;
    //console.log("Mas", NewTime);
    return newTime;
  }
  // send the message to the Backend
  send = (messages) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        createdAt: this.timestamp,
      };
      this.append(message);
    }
  };

  append = (message) => this.ref.push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
