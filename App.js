import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { Database } from './database/Database';
import { NavigationContainer } from "@react-navigation/native";
import SlidingSidebar from "./routes/SlidingSidebar";

export default function App() {
  //Initialize database when app starts
  useEffect(() => {
    Database.init();
  });

  return (
    <NavigationContainer>
      <SlidingSidebar/>
    </NavigationContainer>
  );
}
