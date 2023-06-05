import * as Yup from "yup";

const commentFormValidationSchema = Yup.object({
  body: Yup.string().min(1).max(200).required(),
});

export default commentFormValidationSchema;
