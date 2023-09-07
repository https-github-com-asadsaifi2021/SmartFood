import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function CustomHeader({ title, navigation }) {
  const goToSettings = () => {
    navigation.navigate("SettingScreen");
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        justifyContent: "space-between",
      }}
    >
      {/* Title */}
      <Text style={{ fontSize: 20 }}>{title}</Text>

      {/* Right header icon for settings */}
      <TouchableOpacity onPress={goToSettings}>
        <FontAwesome name="cog" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
