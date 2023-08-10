import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { globalStyles } from "../styles/GlobalStyles";
import AddItemForm from "./AddItemForm";

const HomeScreen = () => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View className="flex-1 justify-center items-center">
        <View>
          <AddItemForm />
        </View>
        <TouchableOpacity style={globalStyles.addButtonContainer}>
          <FontAwesome name="plus" style={globalStyles.addButtonIcon} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
