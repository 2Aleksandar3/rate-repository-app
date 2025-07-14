import { View, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Text from "./Text";

const styles = StyleSheet.create({
  form: {
    padding: 15,
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "#d73a4a",
    marginBottom: 10,
  },
  inputError: {
    borderColor: "#d73a4a",
  },
});

const validationSchema = Yup.object().shape({
  ownerName: Yup.string().required("Repository owner's username is required"),
  repositoryName: Yup.string().required("Repository name is required"),
  rating: Yup.number()
    .required("Rating is required")
    .min(0, "Minimum rating is 0")
    .max(100, "Maximum rating is 100"),
  text: Yup.string(),
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        ownerName: "",
        repositoryName: "",
        rating: "",
        text: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.form}>
          <TextInput
            style={[
              styles.input,
              touched.ownerName && errors.ownerName && styles.inputError,
            ]}
            placeholder="Repository owner's username"
            value={values.ownerName}
            onChangeText={handleChange("ownerName")}
            onBlur={handleBlur("ownerName")}
          />
          {touched.ownerName && errors.ownerName && (
            <Text style={styles.errorText}>{errors.ownerName}</Text>
          )}

          <TextInput
            style={[
              styles.input,
              touched.repositoryName &&
                errors.repositoryName &&
                styles.inputError,
            ]}
            placeholder="Repository name"
            value={values.repositoryName}
            onChangeText={handleChange("repositoryName")}
            onBlur={handleBlur("repositoryName")}
          />
          {touched.repositoryName && errors.repositoryName && (
            <Text style={styles.errorText}>{errors.repositoryName}</Text>
          )}

          <TextInput
            style={[
              styles.input,
              touched.rating && errors.rating && styles.inputError,
            ]}
            placeholder="Rating between 0 and 100"
            value={values.rating}
            onChangeText={handleChange("rating")}
            onBlur={handleBlur("rating")}
            keyboardType="numeric"
          />
          {touched.rating && errors.rating && (
            <Text style={styles.errorText}>{errors.rating}</Text>
          )}

          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Review"
            value={values.text}
            onChangeText={handleChange("text")}
            onBlur={handleBlur("text")}
            multiline
          />
          <Button title="Create review" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;
