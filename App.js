import React, { useEffect } from "react";
import HomeStackNavigator from "./routes/HomeStack";
import { Database } from './database/Database';

export default function App() {
  //Initialize database when app starts
  useEffect(() => {
    Database.init();
  });

  return (
    <HomeStackNavigator />
  );
}
