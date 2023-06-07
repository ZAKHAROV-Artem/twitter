import useTweetModal from "@/state/TweetModalState";
import Modal from "./Modal";
import CurrentUserAvatar from "./../data-display/CurrentUserAvatar";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import tweetFormValidationSchema from "@/validation/TweetFormSchema";
import Divider from "../data-display/Divider";
import Button from "../inputs/Button";
import useCreatePost from "@/hooks/useCreatePost";
import { CiImageOn } from "react-icons/ci";
import FileUpload from "./../inputs/FileUpload";
import uploadToS3 from "@/services/s3/uploadToS3";
import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";

interface TweetModalProps {}
export default function TweetModal({}: TweetModalProps) {
  const { user } = useCurrentUser();
  const twModal = useTweetModal();
  const [loading, setLoading] = useState<boolean>(false);
  const { mutateAsync } = useCreatePost();
  const formik = useFormik({
    initialValues: {
      body: "",
      image: "",
    },
    enableReinitialize: true,
    validationSchema: tweetFormValidationSchema,
    onSubmit: async (values, actions) => {
      setLoading(true);
      if (values.image !== "")
        await uploadToS3(values.image, `${user?.username}/posts/${Date.now()}`)
          .then((str) => {
            values.image = str;
          })
          .catch((err) => console.log(err));
      await mutateAsync(values)
        .then(() => {
          toast.success("Tweet created");
          twModal.toggleModal();
        })
        .catch((err: AxiosError<{ message: string }>) => {
          toast.error(err.response?.data.message || "", {
            duration: 3000,
          });
        })
        .finally(() => {
          setLoading(false);
          actions.resetForm();
        });
    },
  });

  const body: JSX.Element = (
    <div className="w-full">
      <div className="grid md:grid-cols-6 w-full gap-x-3">
        <CurrentUserAvatar size="md" className="mb-5 md:m-0"/>

        <div className="col-span-5">
          <textarea
            name="body"
            id="body"
            autoFocus
            placeholder="What is happening ?"
            value={formik.values.body}
            onChange={formik.handleChange}
            className="h-28 w-full resize-none border-none bg-transparent text-xl outline-none focus:border-none"
          />
          {formik.values.image && (
            <Image
              className="mt-2 max-h-[600px] w-full rounded-xl object-cover"
              width={1600}
              height={900}
              src={formik.values.image}
              alt="post"
            />
          )}
        </div>
      </div>
      <Divider className="my-2" />
      <div className="flex items-center justify-between">
        <Button
          text="Tweet"
          color="blue"
          onClick={() => {
            formik.validateForm();
            formik.handleSubmit();
          }}
        />
        <FileUpload
          value={formik.values.image}
          onChange={(image) => formik.setFieldValue("image", image)}
          type="post"
        />
      </div>
    </div>
  );
  return (
    <Modal
      body={body}
      loading={loading}
      toggleModal={twModal.toggleModal}
      isOpen={twModal.isOpen}
    />
  );
}
