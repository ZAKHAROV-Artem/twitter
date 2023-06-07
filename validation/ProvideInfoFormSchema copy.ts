import * as Yup from "yup";

const provideInfoFormValidationSchema = Yup.object({
  username: Yup.string()
    .min(2, "Min length is 2")
    .max(30, "Max length is 30")
    .required("Username is required"),
});

export default provideInfoFormValidationSchema;
