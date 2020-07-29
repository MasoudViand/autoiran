import { StyleSheet } from "react-native";

export default (style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aaa",
  },
  text: {
    fontFamily: "Shabnam",
    color: "#222",
    textAlign: "right",
    writingDirection: "rtl",
  },
  card: {
    backgroundColor: "#fff",
    // paddingVertical: 12,
    // paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: "rgba(193, 173, 173, 0.3)",
    borderRadius: 7,
    flexDirection: "row-reverse",
    overflow: "hidden",
  },
  thumbnail: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "contain",
  },
  boxPadding: {
    paddingHorizontal: 7,
    paddingVertical: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    //marginBottom: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Shabnam",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Shabnam",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
}));
