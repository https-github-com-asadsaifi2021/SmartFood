import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

export const globalStyles = StyleSheet.create({
  addButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: (windowWidth - 60) / 2, // Center horizontally
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  addButtonIcon: {
    color: "#fff",
    fontSize: 30,
  },

  input: {
    borderWidth: 1,
    borderBlockColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 3,
  },
});
