import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

export const lightStyles = StyleSheet.create({
  // For base container
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#eee",
  },

  // Any add button
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

  // For Text input
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 3,
    marginTop: 2,
    marginBottom: 10,
  },

  // For modal close button
  modalClose: {
    marginBottom: 10,
    padding: 10,
    alignSelf: "flex-end",
    backgroundColor: "#ff6347",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  primaryText: {
    color: "black",
  },
});
