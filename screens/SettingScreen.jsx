import { View, Text, Switch } from "react-native";
import { connect } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";

const SettingScreen = ({ isDarkTheme, toggleTheme }) => {
  const toggleSwitch = () => {
    toggleTheme();
  };

  return (
    <View>
      <Text>Dark Theme:</Text>
      <Switch value={isDarkTheme} onValueChange={toggleSwitch} />
    </View>
  );
};

const mapStateToProps = (state) => ({
  isDarkTheme: state.theme,
});

const mapDispatchToProps = {
  toggleTheme,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
