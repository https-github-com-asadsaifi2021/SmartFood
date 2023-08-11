import React, { useState } from "react";
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

const HomeScreen = () => {
  const [addItemFormModal, setaddItemFormModal] = useState(false);

  return (
    <View style={globalStyles.container}>
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
            <AddItemForm />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
