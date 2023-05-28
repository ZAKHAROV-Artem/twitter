import useTweetModal from "@/state/TweetModalState";
import Avatar from "../data-display/Avatar";
import Modal from "./Modal";
import CurrentUserAvatar from "./../data-display/CurrentUserAvatar";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import tweetFormValidationSchema from "@/validation/TweetFormSchema";
import Divider from "../data-display/Divider";
import Button from "../inputs/Button";
import { useMutation } from "@tanstack/react-query";
import createPost from "@/services/posts/createPost";
import useCreatePost from "@/hooks/useCreatePost";

interface TweetModalProps {}
export default function TweetModal({}: TweetModalProps) {
  const twModal = useTweetModal();
  const [loading, setLoading] = useState<boolean>(false);
  const {mutateAsync} = useCreatePost()
  const formik = useFormik({
    initialValues: {
      body: "",
    },
    enableReinitialize: true,
    validationSchema: tweetFormValidationSchema,
    onSubmit: async (values, actions) => {
      setLoading(true);

      await mutateAsync(values.body).then(()=>{
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

        <div className="w-full">
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
      <div>
        <Button
          text="Tweet"
          color="blue"
          onClick={() => {
            formik.validateForm();
            formik.handleSubmit();
          }}
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
