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
import AddItemForm from "./AddItemForm";
import { Database } from "../database/Database";

const HomeScreen = () => {
  const [addItemFormModal, setaddItemFormModal] = useState(false);

  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const queryItems = await Database.getItems();
      setItems(queryItems);
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleItemAdded = async () => {
    setaddItemFormModal(false);
    await fetchData();
  };

  return (
    <View style={globalStyles.container}>
      {/* Items view */}
      {items.map((item) => (
        <Text key={item.id}>
          {item.name} - Expiry Date: {item.expiryDate} - Quantity:{" "}
          {item.quantity}
        </Text>
      ))}

      {/* Modal */}
      <Modal visible={addItemFormModal} animationType="slide">
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
              onPress={() => setaddItemFormModal(false)}
            />
            <AddItemForm onItemAdded={handleItemAdded} />
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
