import * as Yup from "yup";

const tweetFormValidationSchema = Yup.object({
  body:Yup.string().min(1).max(200).required()
});

export default tweetFormValidationSchema;
