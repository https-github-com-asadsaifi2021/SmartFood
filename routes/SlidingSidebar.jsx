import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import { FontAwesome } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const SlidingSidebar = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: "blue",
        drawerInactiveTintColor: "gray",
        drawerItemStyle: { marginVertical: 2 },
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          drawerLabel: "Settings",
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="cog" color={color} size={size} />
          ),
        }}
      />
      {/* Add more drawer items as needed */}
    </Drawer.Navigator>
  );
};

export default SlidingSidebar;
