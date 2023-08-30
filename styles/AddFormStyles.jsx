import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

export const addFormStyles = StyleSheet.create({
  form: {
    alignItems: "left",
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginBottom: 10,
  },
});
