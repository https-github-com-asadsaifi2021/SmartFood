import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { globalStyles } from "../styles/GlobalStyles";

const HomeScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-center text-teal-600">
        This is the HomeScreen (Changed)
      </Text>
      <TouchableOpacity style={globalStyles.addButtonContainer}>
        <FontAwesome name="plus" style={globalStyles.addButtonIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
