import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { Database } from './database/Database';
import { NavigationContainer } from "@react-navigation/native";
import SlidingSidebar from "./routes/SlidingSidebar";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './features';

const store = configureStore({
  reducer: rootReducer,
});

export default function App() {
  //Initialize database when app starts
  useEffect(() => {
    Database.init();
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SlidingSidebar/>
      </NavigationContainer>
    </Provider>
  );
}
