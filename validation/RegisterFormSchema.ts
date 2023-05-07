import * as Yup from "yup";

const registerFormValidationSchema = Yup.object({
  name: Yup.string()
    .max(50, "Max length is 50")
    .required("What is your name ?"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  username: Yup.string()
    .max(30, "Max length is 30")
    .required("Username is required"),
  birthDate: Yup.date(),
  password: Yup.string()
    .max(60, "Max length is 60")
    .min(6, "Min length is 6")
    .required("Password is required"),
});

export default registerFormValidationSchema;
