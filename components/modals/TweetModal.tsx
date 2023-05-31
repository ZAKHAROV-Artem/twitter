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
import { CiImageOn } from 'react-icons/ci';
import FileUpload from './../inputs/FileUpload';
import uploadToS3 from "@/services/s3/uploadToS3";
import useCurrentUser from "@/hooks/useCurrentUser";

interface TweetModalProps {}
export default function TweetModal({}: TweetModalProps) {
  const {user} = useCurrentUser();
  const twModal = useTweetModal();
  const [loading, setLoading] = useState<boolean>(false);
  const {mutateAsync} = useCreatePost()
  const formik = useFormik({
    initialValues: {
      body: "",
      image:"",
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
      await mutateAsync(values).then(()=>{
        toast.success("Tweet created");
          twModal.toggleModal();
      }).catch((err: AxiosError<{ message: string }>) => {
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
      <div className="flex w-full gap-x-3">
        <CurrentUserAvatar size="md" />

        <div className="grow">
          <textarea
            name="body"
            id="body"
            autoFocus
            placeholder="What is happening ?"
            value={formik.values.body}
            onChange={formik.handleChange}
            className="h-28 w-full resize-none border-none bg-transparent text-xl outline-none focus:border-none"
          />
        </div>
      </div>
      <Divider className="my-2" />
      <div className="flex justify-between items-center">
        <Button
          text="Tweet"
          color="blue"
          onClick={() => {
            formik.validateForm();
            formik.handleSubmit();
          }}
        />
       <FileUpload  value={formik.values.image}
            onChange={(image) => formik.setFieldValue("image", image)} type="post"/>
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
