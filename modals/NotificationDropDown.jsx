import { View, Text, Modal, Button } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { lightStyles } from "../styles/LightStyles";
import { darkStyles } from "../styles/DarkStyles";
import { connect } from "react-redux";

const NotificationDropdown = ({
  isVisible,
  notifications,
  onClose,
  isDarkTheme,
}) => {
  const style = isDarkTheme ? darkStyles : lightStyles;

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={style.container}>
        <MaterialIcons
          name="close"
          style={style.modalClose}
          size={24}
          onPress={onClose}
        />
        {/* Render your list of notifications here */}
        {notifications.map((notification, index) => (
          <Text key={index} style={style.primaryText}>
            {notification.message}
          </Text>
        ))}
      </View>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  isDarkTheme: state.theme,
});

export default connect(mapStateToProps)(NotificationDropdown);
