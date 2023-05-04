import * as Yup from "yup";

const registerFormValidationSchema = Yup.object({
  name: Yup.string()
    .max(50, "Max length is 50")
    .required("What is your name ?"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  birthDate: Yup.date(),
});

export default registerFormValidationSchema;
