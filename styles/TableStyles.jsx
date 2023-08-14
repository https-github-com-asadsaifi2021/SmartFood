import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

export const tableStyles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  tableCell: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 6,
  },

  headingCell: {
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
  },

  editButton: {
    backgroundColor: "#007bff",
    padding: 3,
    borderRadius: 1,
    marginRight: 5,
  },

  deleteButton: {
    backgroundColor: "#ff6347",
    padding: 3,
    borderRadius: 1,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
