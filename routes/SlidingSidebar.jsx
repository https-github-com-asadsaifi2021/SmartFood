import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, TouchableOpacity } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import { FontAwesome } from "@expo/vector-icons";
import { LightTheme, DarkTheme } from "../styles/SlideBarTheme";
import CustomHeader from "../components/CustomHeader";
import { connect } from "react-redux";
import NotificationDropdown from "../modals/NotificationDropDown";

const Drawer = createDrawerNavigator();

const SlidingSidebar = ({ isDarkTheme }) => {
  const theme = isDarkTheme ? DarkTheme : LightTheme;

  const headerRightContainerStyle = {
    marginRight: 10,
  };

  const headerRightIconStyle = {
    color: theme.primaryText,
  };

  const notificationDotStyle = {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    width: 10,
    height: 10,
    borderRadius: 5,
    zIndex: 1,
  };

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const yourNotificationsArray = [
    { message: "Notification 1" },
    { message: "Notification 2" },
    { message: "Notification 3" },
  ];

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          flexDirection: "row",
          flex: 1,
          backgroundColor: theme.primaryBackground,
        },
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
          headerTitle: () => <CustomHeader title="Home" icon="home" />,
          headerRight: () => (
            <View style={headerRightContainerStyle}>
              <TouchableOpacity onPress={toggleDropdown}>
                <FontAwesome
                  name="bell"
                  size={24}
                  style={headerRightIconStyle}
                />
                <View style={notificationDotStyle}></View>
              </TouchableOpacity>
              <NotificationDropdown
                isVisible={isDropdownVisible}
                notifications={yourNotificationsArray}
                onClose={toggleDropdown}
              />
            </View>
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
