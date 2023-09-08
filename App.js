import React, { useEffect } from "react";
import HomeStack from "./routes/HomeStack";
import { Database } from './database/Database';

export default function App() {
  //Initialize database when app starts
  useEffect(() => {
    Database.init();
  });

  return (
    <HomeStack />
  );
}
