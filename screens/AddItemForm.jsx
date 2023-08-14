import { Button, TextInput, View } from "react-native";
import { Formik } from "formik";
import { globalStyles } from "../styles/GlobalStyles";
import { Database } from "../database/Database";

export default function AddItemForm({ onItemAdded }) {
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ name: "", quantity: "", expiryDate: "" }}
        onSubmit={(values, actions) => {
          Database.insertItem(values.name, values.quantity, values.expiryDate);
          onItemAdded();
          actions.resetForm();
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Name"
              onChangeText={props.handleChange("name")}
              value={props.values.title}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Quantity"
              onChangeText={props.handleChange("quantity")}
              value={props.values.quantity}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="expiryDate"
              onChangeText={props.handleChange("expiryDate")}
              value={props.values.expiryDate}
            />
            <Button title="submit" color="green" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}
