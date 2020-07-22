import firebase from "@react-native-firebase/app";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";
//import { firebase, auth, database, uid } from "react-native-firebase";

class PhoneAuthScreen extends Component {
  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate;
  }
  // static navigationOptions = {
  //   title: "Chatter",
  // };

  state = {
    phone: "",
    confirmResult: null,
    verificationCode: "",
    userId: "",
    name: "",
    inputName: null,
  };
  isLoggedin = () => {
    if (auth().currentUser) {
      return true;
    } else {
      return false;
    }
  };
  redirectIfLoggedin = () => {
    if (auth().currentUser) {
      this.navigate("Chat", { name: this.state.inputName || this.state.name });
    }
  };
  onPress = () => {
    this.navigate("Chat", { name: this.state.inputName || this.state.name });
  };
  logOut = () => {
    auth()
      .signOut()
      .then(() => {
        this.setState({
          phone: "",
          confirmResult: null,
          verificationCode: "",
          userId: "",
          name: "",
          inputName: null,
        });
        this.navigate("Home");
        alert("User signed out!");
      });
  };
  getUsersData = (userId) => {
    database()
      .ref("/users/" + userId)
      .once("value", (snapshot) => {
        var username = (snapshot.val() && snapshot.val().Name) || null;
        this.setState({ inputName: username });
      });
  };
  validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(this.state.phone);
  };
  checkUser = (phone) => {
    database()
      .ref()
      .child("users")
      .orderByChild("Phone")
      .equalTo(phone)
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach(function(data) {
            //console.log(data.val());
            return (userData = data.val());
          });
          this.setState({ inputName: userData.Name });
        } else {
          //alert("doesn't exist");
        }
      });
  };
  handleSendCode = () => {
    // Request to send OTP
    if (this.validatePhoneNumber()) {
      auth()
        .signInWithPhoneNumber(this.state.phone)
        .then((confirmResult) => {
          this.setState({ confirmResult });
        })
        .then(this.checkUser(this.state.phone))
        .catch((error) => {
          alert(error.message);

          console.log(error);
        });
    } else {
      alert("Invalid Phone Number");
    }
  };

  changePhoneNumber = () => {
    this.setState({ confirmResult: null, verificationCode: "" });
  };
  updateProfile = () => {
    if (auth().currentUser) {
      userId = auth().currentUser.uid;
      if (userId) {
        database()
          .ref("users/" + userId)
          .set({
            Name: this.state.name,
            Phone: this.state.phone,
          })
          .then(this.setState({ inputName: this.state.name }));
      }
    }
  };
  handleVerifyCode = () => {
    // Request for OTP verification
    const { confirmResult, verificationCode } = this.state;
    if (verificationCode.length == 6) {
      confirmResult
        .confirm(verificationCode)
        .then((user) => {
          this.setState({ userId: user.uid });
          if (this.state.inputName === null) {
            this.updateProfile();
          }
        })
        .then(() => {
          this.onPress();
          //this.setState({ inputName: this.state.name });
          alert(`Welcome! ${this.state.inputName}`);
        })
        .catch((error) => {
          alert(error.message);
          console.log(error);
        });
    } else {
      alert("Please enter a 6 digit OTP code.");
    }
  };
  renderSightoutView = () => {
    if (auth().currentUser) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            padding: 10,
            backgroundColor: "#e1e1e1",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ color: "#222" }}>
              Wellcome Back {this.state.inputName}
            </Text>
          </View>
          <TouchableOpacity onPress={this.logOut}>
            <Text style={{ color: "#222" }}>Logout</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  renderNameInput = () => {
    return (
      <TextInput
        style={styles.textInput}
        placeholder="Name"
        placeholderTextColor="#eee"
        keyboardType="default"
        value={this.state.name}
        onChangeText={(name) => {
          this.setState({ name });
        }}
        maxLength={25}
      />
    );
  };
  renderWellcome = () => {
    return <Text>Wellcome Back {this.state.inputName}</Text>;
  };
  renderConfirmationCodeView = () => {
    return (
      <View style={styles.verificationView}>
        <TextInput
          style={styles.textInput}
          placeholder="Verification code"
          placeholderTextColor="#eee"
          value={this.state.verificationCode}
          keyboardType="numeric"
          onChangeText={(verificationCode) => {
            this.setState({ verificationCode });
          }}
          maxLength={6}
        />
        {this.state.inputName === null
          ? this.renderNameInput()
          : this.renderWellcome()}
        <TouchableOpacity
          style={[styles.themeButton, { marginTop: 20 }]}
          onPress={this.handleVerifyCode}
        >
          <Text style={styles.themeButtonTitle}>Verify Code</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: "#333" }]}>
        <View style={styles.page}>
          <View style={{ flex: 0.5 }}>{this.renderSightoutView()}</View>
          <View style={{ flex: 3 }}>
            <TouchableOpacity onPress={this.onPress}>
              <Text>Go to Live page</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.navigate("News")}>
              <Text>Go to News page</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.textInput}
            placeholder="Phone Number : (i.e. +989124567890)"
            placeholderTextColor="#eee"
            keyboardType="phone-pad"
            value={this.state.phone}
            onChangeText={(phone) => {
              this.setState({ phone });
            }}
            maxLength={15}
            editable={this.state.confirmResult ? false : true}
          />

          <TouchableOpacity
            style={[styles.themeButton, { marginTop: 20 }]}
            onPress={
              this.state.confirmResult
                ? this.changePhoneNumber
                : this.handleSendCode
            }
          >
            <Text style={styles.themeButtonTitle}>
              {this.state.confirmResult ? "Change Phone Number" : "Send Code"}
            </Text>
          </TouchableOpacity>

          {this.state.confirmResult ? this.renderConfirmationCodeView() : null}
        </View>
      </SafeAreaView>
    );
  }
  componentDidMount() {
    if (auth().currentUser) {
      var userId = auth().currentUser.uid;
      database()
        .ref("/users/" + userId)
        .once("value", (snapshot) => {
          var username = (snapshot.val() && snapshot.val().Name) || null;
          this.setState({ inputName: username });
        });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aaa",
  },
  page: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  textInput: {
    marginTop: 20,
    width: "90%",
    height: 40,
    borderColor: "#555",
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
    color: "#fff",
    fontSize: 16,
  },
  themeButton: {
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#888",
    borderColor: "#555",
    borderWidth: 2,
    borderRadius: 5,
  },
  themeButtonTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  verificationView: {
    width: "100%",
    alignItems: "center",
    marginTop: 50,
  },
});
export default PhoneAuthScreen;
