import * as Yup from "yup";

const tweetFormValidationSchema = Yup.object({
  body:Yup.string().min(1).max(200).required(),
  image:Yup.string()
});

export default tweetFormValidationSchema;
