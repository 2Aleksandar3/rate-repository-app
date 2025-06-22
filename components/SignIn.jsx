import React from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";

// Validation schema
const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      padding: 16,
      paddingTop: 40,
    },
    input: {
      height: 40,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 4,
      marginBottom: 8,
      paddingHorizontal: 10,
    },
    inputError: {
      borderColor: "#d73a4a",
    },
    errorText: {
      color: "#d73a4a",
      marginBottom: 8,
    },
    button: {
      backgroundColor: "#0366d6",
      padding: 12,
      borderRadius: 4,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      {/* Username Field */}
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
        style={[
          styles.input,
          formik.touched.username &&
            formik.errors.username &&
            styles.inputError,
        ]}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}

      {/* Password Field */}
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        secureTextEntry
        style={[
          styles.input,
          formik.touched.password &&
            formik.errors.password &&
            styles.inputError,
        ]}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      {/* Submit Button */}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
