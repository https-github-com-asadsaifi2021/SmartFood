import {
  Button,
  TextInput,
  View,
  Pressable,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import { globalStyles } from "../styles/GlobalStyles";
import { Database } from "../database/Database";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddItemForm({
  onItemAdded,
  onItemEdited,
  editData,
  editMode,
}) {
  // EditMode
  const initValues = editMode
    ? {
        id: editData ? editData.id.toString() : "",
        name: editData ? editData.name.toString() : "",
        quantity: editData ? editData.quantity.toString() : "",
        expiryDate: editData ? editData.expiryDate.toString() : "",
      }
    : {
        name: "",
        quantity: "",
        expiryDate: "",
      };

  // DatePicker
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  // Android
  const onChangeAndroid = ({ type }, selectedDate, props) => {
    if (type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      if (Platform.OS === "android") {
        const dateString = currentDate.toDateString();
        if (props.values.expiryDate !== dateString) {
          props.setFieldValue("expiryDate", dateString);
        }
      }
    }
  };

  // IOS
  const confirmIOSDate = () => {
    props.setFieldValue("expiryDate", date.toDateString());
    toggleDatePicker();
  };

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={initValues}
        onSubmit={async (values, actions) => {
          if (editMode) {
            await Database.updateItem(
              values.id,
              values.name,
              values.quantity,
              values.expiryDate
            );
            onItemEdited();
            actions.resetForm();
          } else {
            await Database.insertItem(
              values.name,
              values.quantity,
              values.expiryDate
            );
            onItemAdded();
            actions.resetForm();
          }
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Name"
              onChangeText={props.handleChange("name")}
              value={props.values.name}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Quantity"
              onChangeText={props.handleChange("quantity")}
              value={props.values.quantity}
            />
            <Pressable onPress={toggleDatePicker}>
              <TextInput
                style={globalStyles.input}
                placeholder="Expiry Date"
                onChangeText={props.handleChange("expiryDate")}
                value={props.values.expiryDate}
                editable={false}
              />
            </Pressable>

            {/* DatePicker */}
            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={({ type }, selectedDate) => {
                  if (selectedDate) {
                    toggleDatePicker();
                    onChangeAndroid({ type }, selectedDate, props);
                  }
                }}
              />
            )}

            {/* IOS confirm button for datepicker*/}
            {showPicker && Platform.OS === "ios" && (
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                {/* ---- TODO ---- Styling text button */}
                <TouchableOpacity style={[]} onPress={toggleDatePicker}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[]} onPress={confirmIOSDate}>
                  <Text>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}

            <Button
              title={editMode ? "Save" : "submit"}
              color="green"
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}
