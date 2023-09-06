import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

export const addFormStyles = StyleSheet.create({
  form: {
    alignItems: "left",
  },

  errorText: {
    color: "red",
    marginBottom: 2,
  },
});
