import * as Yup from "yup";

const editProfileFormValidationSchema = Yup.object({
  name: Yup.string()
    .max(50, "Max length is 50")
    .required("Name can't be blank"),
  bio: Yup.string().max(160, "Max length is 160"),
  location: Yup.string().max(30, "Max length is 30"),
  site: Yup.string().max(100, "Max length is 100"),
  profileImage: Yup.string(),
  coverImage: Yup.string(),
});

export default editProfileFormValidationSchema;
