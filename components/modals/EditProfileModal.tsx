import { useState } from "react";
import Modal from "./Modal";
import useEditProfileModal from "@/state/EditProfileModalState";
import Input from "../inputs/Input";
import { useFormik } from "formik";
import editProfileFormValidationSchema from "@/validation/EditProfileFormSchema";
import TextArea from "../inputs/Textarea";
import Button from "../inputs/Button";
import useCurrentUser from "@/hooks/useCurrentUser";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import FileUpload from "./../inputs/FileUpload";
import uploadToS3 from "@/services/s3/uploadToS3";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import deleteFromS3 from "@/services/s3/deleteFromS3";
import isValidUrl from "@/utils/isValidUrl";

export default function EditProfileModal() {
  const { user } = useCurrentUser();

  const [loading, setLoading] = useState<boolean>(false);
  const editModal = useEditProfileModal();
  const { mutateAsync } = useUpdateProfile();
  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      bio: user?.bio || "",
      location: user?.location || "",
      site: user?.site || "",
      profileImage: user?.profileImage || user?.image || "",
      coverImage: user?.coverImage || "",
    },
    enableReinitialize: true,
    validateOnBlur: true,
    validationSchema: editProfileFormValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      if (
        values.coverImage !== "" &&
        values.coverImage.startsWith("data:image/jpeg;base64")
      ) {
        if(user?.coverImage && user?.coverImage?.length !== 0)await deleteFromS3(
          `${user?.username}/cover-image-${user?.coverImage?.split("-").at(-1)}`
        );
        await uploadToS3(
          values.coverImage,
          `${user?.username}/cover-image-${Date.now()}`
        )
          .then((str) => {
            values.coverImage = str;
          })
          .catch((err) => console.log(err));
      }
      if (
        values.profileImage !== "" &&
        values.profileImage.startsWith("data:image/jpeg;base64")
      ) {
        if(user?.profileImage && user.profileImage.length !== 0)await deleteFromS3(
          `${user?.username}/profile-image-${user?.profileImage
            ?.split("-")
            .at(-1)}`
        );
        await uploadToS3(
          values.profileImage,
          `${user?.username}/profile-image-${Date.now()}`
        )
          .then((str) => {
            values.profileImage = str;
          })
          .catch((err) => console.log(err));
      }
      if (values.coverImage === "")
        await deleteFromS3(
          `${user?.username}/cover-image-${user?.coverImage?.split("-").at(-1)}`
        );

      await mutateAsync(values)
        .then(() => {
          toast.success("Successfully updated. Info will be shown soon");
          editModal.toggleModal();
        })
        .catch((err: AxiosError<{ message: string }>) => {
          if (err.response?.status === 413) {
            toast.error("Files are too big. Try to update them separately", {
              duration: 3000,
            });
          } else {
            toast.error(
              err.response?.data.message ||
                "Something went wrong :(\nProfile not updated",
              {
                duration: 3000,
              }
            );
          }
        })
        .finally(() => setLoading(false));
    },
  });

  const handleToggle = () => {
    formik.resetForm();
    editModal.toggleModal();
  };

  const body = (
    <div className="ml-3 h-full overflow-y-scroll md:max-h-[80vh]">
      <div className="mb-3 text-2xl font-bold">Edit your profile</div>
      <div className="relative mr-2 flex flex-col gap-y-5">
        <div className="relative mb-16 w-full">
          <FileUpload
            value={formik.values.coverImage}
            onChange={(image) => formik.setFieldValue("coverImage", image)}
            disabled={loading}
            className="w-full"
            type="cover"
          />
          <FileUpload
            value={formik.values.profileImage}
            onChange={(image) => formik.setFieldValue("profileImage", image)}
            disabled={loading}
            className="absolute top-[65%] ml-4 w-fit rounded-full"
            type="avatar"
          />
        </div>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Name *"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={(formik.touched.name && formik.errors.name) || ""}
        />
        <TextArea
          name="bio"
          id="bio"
          placeholder="Biography"
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={(formik.touched.bio && formik.errors.bio) || ""}
          maxLength={160}
          className="h-32 resize-none items-start justify-start overflow-hidden"
        />
        <Input
          type="text"
          name="location"
          id="location"
          placeholder="Location"
          value={formik.values.location}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={(formik.touched.location && formik.errors.location) || ""}
        />
        <Input
          type="url"
          name="site"
          id="site"
          placeholder="Site"
          value={formik.values.site}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            (formik.touched.site &&
              (formik.errors.site ||
                (!isValidUrl(formik.values.site) &&
                  formik.setFieldError("site", "Incorrect url")))) ||
            ""
          }
        />
        <div className="flex justify-end">
          <Button
            onClick={() => {
              formik.validateForm();
              formik.handleSubmit();
            }}
            disabled={!!formik.errors.site || !formik.isValid}
            text="Save profile"
            variant="filled"
          />
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      body={body}
      loading={loading}
      toggleModal={handleToggle}
      isOpen={editModal.isOpen}
    />
  );
}
