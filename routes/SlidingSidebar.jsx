import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";

const Drawer = createDrawerNavigator();

const SlidingSidebar = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="SettingScreen" component={SettingScreen} />
      {/* Add more drawer items as needed */}
    </Drawer.Navigator>
  );
};

export default SlidingSidebar;
