import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import { FontAwesome } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerTitle: () => <Text style={{ fontSize: 20 }}>SmartFood</Text>,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SettingScreen");
                }}
                style={{ marginRight: 15 }}
              >
                <FontAwesome name="cog" size={24} color="#000" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
