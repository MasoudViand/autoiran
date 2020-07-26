import { StyleSheet } from "react-native";

export default (style = StyleSheet.create({
  text: {
    fontFamily: "Shabnam",
    color: "#222",
    textAlign: "right",
    writingDirection: "rtl",
  },
  card: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: "rgba(193, 173, 173, 0.3)",
    borderRadius: 7,
  },
}));
