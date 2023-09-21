import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import { FontAwesome } from "@expo/vector-icons";
import { LightTheme, DarkTheme } from "../styles/SlideBarTheme";
import { connect } from "react-redux";

const Drawer = createDrawerNavigator();

const SlidingSidebar = ({ isDarkTheme }) => {
  const theme = isDarkTheme ? DarkTheme : LightTheme;

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: theme.primaryBackground },
        drawerActiveTintColor: theme.accentColor1,
        drawerInactiveTintColor: theme.accentColor2,
        drawerItemStyle: { marginVertical: 2 },
        drawerLabelStyle: { fontSize: 16, color: theme.primaryText },
        headerStyle: {
          backgroundColor: theme.primaryBackground,
        },
        headerTintColor: theme.primaryText,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Setting"
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

const mapStateToProps = (state) => ({
  isDarkTheme: state.theme,
});

export default connect(mapStateToProps)(SlidingSidebar);
