import React from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LightTheme, DarkTheme } from "../styles/SlideBarTheme";
import { connect } from "react-redux";

const CustomHeader = ({ title, icon, isDarkTheme }) => {
  const theme = isDarkTheme ? DarkTheme : LightTheme;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <FontAwesome name={icon} size={16} color={theme.primaryText} />
      <Text style={{ fontSize: 20, marginLeft: 5, color: theme.primaryText }}>
        {title}
      </Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  isDarkTheme: state.theme,
});

export default connect(mapStateToProps)(CustomHeader);
