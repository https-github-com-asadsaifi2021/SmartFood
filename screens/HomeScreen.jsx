import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { globalStyles, lightStyles } from "../styles/LightStyles";
import { darkStyles } from "../styles/DarkStyles";
import { tableStyles } from "../styles/TableStyles";
import AddItemForm from "../modals/AddItemForm";
import { Database } from "../database/Database";
import { FlatList } from "react-native-gesture-handler";
import {
  handleDelete,
  handleEdit,
  handleItemAdded,
  handleItemEdited,
} from "../lib/HomePageHandlers";
import { connect } from "react-redux";

const HomeScreen = ({ isDarkTheme }) => {
  const [addItemFormModal, setAddItemModal] = useState(false);
  const [editItemModal, setEditItemModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [items, setItems] = useState([]);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    try {
      const queryItems = await Database.getItems();
      setItems(queryItems);
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  };

  // Useeffect to track change in database
  useEffect(() => {
    fetchData();
  }, []);

  /* Functions for data manipulaton */
  const getDaysLeft = (date) => {
    const timeDiff = new Date(date) - new Date();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  // Items to be Rendered in FlatList
  const renderItem = ({ item }) => {
    const daysLeft = getDaysLeft(item.expiryDate);
    const daysLeftStyle = daysLeft <= 2 ? tableStyles.daysLeftRed : {};

    return (
      <View style={tableStyles.tableRow}>
        <Text style={tableStyles.tableCell}>{item.name} </Text>
        <View style={tableStyles.tableCell}>
          <Text style={daysLeftStyle}>
            {daysLeft}
            {daysLeft <= 0 && <Text style={{ color: "red" }}>(Expired)</Text>}
          </Text>
        </View>
        <Text style={tableStyles.tableCell}>{item.quantity} </Text>
        <TouchableOpacity
          onPress={() =>
            handleEdit(
              item.id,
              item.name,
              item.expiryDate,
              item.quantity,
              setEditData,
              setEditMode,
              setEditItemModal
            )
          } // Call a function to handle edit
          style={tableStyles.editButton}
        >
          <Text style={tableStyles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item.id, fetchData)} // Call a function to handle delete
          style={tableStyles.deleteButton}
        >
          <Text style={tableStyles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={isDarkTheme ? darkStyles.container : lightStyles.container}>
      {/* Items view */}
      {/* Heading */}
      <View style={tableStyles.tableRow}>
        <Text style={[tableStyles.tableCell, tableStyles.headingCell]}>
          Name
        </Text>
        <Text style={[tableStyles.tableCell, tableStyles.headingCell]}>
          DaysLeft
        </Text>
        <Text style={[tableStyles.tableCell, tableStyles.headingCell]}>
          Quantity
        </Text>
        <Text style={[tableStyles.tableCell, tableStyles.headingCell]}>
          Actions
        </Text>
      </View>
      {/* List of items */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      {/* Modal */}
      <Modal visible={addItemFormModal || editItemModal} animationType="slide">
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={lightStyles.container}>
            <MaterialIcons
              name="close"
              style={lightStyles.modalClose}
              size={24}
              onPress={() => {
                setAddItemModal(false);
                setEditItemModal(false);
                setEditMode(false);
              }}
            />
            <AddItemForm
              onItemAdded={() => handleItemAdded(fetchData, setAddItemModal)}
              onItemEdited={() =>
                handleItemEdited(fetchData, setEditMode, setEditItemModal)
              }
              editData={editData}
              editMode={editMode}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Add button */}
      <TouchableOpacity
        style={lightStyles.addButtonContainer}
        onPress={() => setAddItemModal(true)}
      >
        <FontAwesome name="plus" style={lightStyles.addButtonIcon} />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({
  isDarkTheme: state.theme,
});

export default connect(mapStateToProps)(HomeScreen);
