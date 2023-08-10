import { Button, TextInput, View } from "react-native";
import { Formik } from "formik";
import { globalStyles } from "../styles/GlobalStyles";

export default function AddItemForm() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Formik
        initialValues={{ name: "", quantity: "", expiryDate: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Name"
              onChangeText={props.handleChange("title")}
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
