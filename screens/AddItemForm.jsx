import { Button, TextInput, View } from "react-native";
import { Formik } from "formik";
import { globalStyles } from "../styles/GlobalStyles";
import { Database } from "../database/Database";

export default function AddItemForm({
  onItemAdded,
  onItemEdited,
  editData,
  editMode,
}) {
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
