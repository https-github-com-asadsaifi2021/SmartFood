import * as SQL from "expo-sqlite";

// Initializing db
const db = SQL.openDatabase("smartFoodDatabse.db");

// Export the functions to perform database operations
export const Database = {
  init: () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT," +
          "name TEXT NOT NULL, quantity INTEGER NOT NULL, expiryDate TEXT NOT NULL)",
        [],
        (_, result) => {
          console.log("Table created: ", result);
        },
        (error) => {
          console.log("Error creating table: ", error);
        }
      );
    });
  },

  insertItem: (name, quantity, expiryDate, callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO items (name, quantity, expiryDate) VALUES (?,?,?)",
        [name, quantity, expiryDate],
        (_, results) => {
          if (callback) {
            callback(results);
          }
        },
        (error) => {
          console.error("Error inserting item", error);
        }
      );
    });
  },
  // More functions as needed
};
