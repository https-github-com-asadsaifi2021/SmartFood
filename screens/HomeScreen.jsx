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

  // Handle item added to database
  const handleItemAdded = async () => {
    setaddItemFormModal(false);
    await fetchData();
  };

  // Handle edit button
  const handleEdit = async (id, name, expiryDate, quantity) => {
    setEditMode(true);
    setEditData({
      id,
      name,
      expiryDate,
      quantity,
    });
    setEditItemModal(true);
  };

  // Hanlde item edited to database
  const handleItemEdited = async () => {
    setEditMode(false);
    setEditItemModal(false);
    await fetchData();
  };

  // Handle delete button
  const handleDelete = async (id) => {
    try {
      await Database.deleteItem(id).then((message) => {
        console.log(message);
      });
      await fetchData();
    } catch (error) {
      console.error(error);
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
      <Text style={tableStyles.tableCell}> {item.expiryDate} </Text>
      <Text style={tableStyles.tableCell}> {item.quantity} </Text>
      <TouchableOpacity
        onPress={() =>
          handleEdit(item.id, item.name, item.expiryDate, item.quantity)
        } // Call a function to handle edit
        style={tableStyles.editButton}
      >
        <Text style={tableStyles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDelete(item.id)} // Call a function to handle delete
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
          ExpiryDate
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
              onItemAdded={handleItemAdded}
              onItemEdited={handleItemEdited}
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
