import * as Yup from "yup";

const loginFormValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .max(60, "Max length is 60")
    .min(6, "Min length is 6")
    .required("Password is required"),
});

export default loginFormValidationSchema;
