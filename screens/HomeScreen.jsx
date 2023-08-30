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
import { globalStyles } from "../styles/GlobalStyles";
import { tableStyles } from "../styles/TableStyles";
import AddItemForm from "./AddItemForm";
import { Database } from "../database/Database";
import { FlatList } from "react-native-gesture-handler";
import {
  handleDelete,
  handleEdit,
  handleItemAdded,
  handleItemEdited,
} from "../lib/HomePageHandlers";

const HomeScreen = () => {
  const [addItemFormModal, setaddItemFormModal] = useState(false);
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

  // Items to be Rendered in FlatList
  const renderItem = ({ item }) => (
    <View style={tableStyles.tableRow}>
      <Text style={tableStyles.tableCell}>{item.name} </Text>
      <Text style={tableStyles.tableCell}>{item.expiryDate} </Text>
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

  return (
    <View style={globalStyles.container}>
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
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Modal */}
      <Modal visible={addItemFormModal || editItemModal} animationType="slide">
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={globalStyles.container}>
            <MaterialIcons
              name="close"
              style={globalStyles.modalClose}
              size={24}
              onPress={() => {
                setaddItemFormModal(false);
                setEditItemModal(false);
                setEditMode(false);
              }}
            />
            <AddItemForm
              onItemAdded={() =>
                handleItemAdded(fetchData, setaddItemFormModal)
              }
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
        style={globalStyles.addButtonContainer}
        onPress={() => setaddItemFormModal(true)}
      >
        <FontAwesome name="plus" style={globalStyles.addButtonIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
