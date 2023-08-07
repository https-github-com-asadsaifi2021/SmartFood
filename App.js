import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-green-500">
        This shows that NativeWind is setup properly!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
