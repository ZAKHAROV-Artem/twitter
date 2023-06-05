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
import useCommentModal from "@/state/CommentModalState";
import commentFormValidationSchema from "@/validation/CommentFormSchema";
import useCreateComment from "@/hooks/useCreateComment";

export default function CommentModal() {
  const { user } = useCurrentUser();
  const comModal = useCommentModal();
  const [loading, setLoading] = useState<boolean>(false);
  const { mutateAsync } = useCreateComment(comModal.postId);
  const formik = useFormik({
    initialValues: {
      body: "",
      postId: comModal.postId,
    },
    enableReinitialize: true,
    validationSchema: commentFormValidationSchema,
    onSubmit: async (values, actions) => {
      setLoading(true);

      await mutateAsync(values)
        .then(() => {
          toast.success("Comment created");
          comModal.toggleModal();
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
      <div className="flex w-full gap-x-3">
        <CurrentUserAvatar size="md" />

        <div className="grow">
          <textarea
            name="body"
            id="body"
            autoFocus
            placeholder="Write your comment here ..."
            value={formik.values.body}
            onChange={formik.handleChange}
            className="h-28 w-full resize-none border-none bg-transparent text-xl outline-none focus:border-none"
          />
        </div>
      </div>
      <Divider className="my-2" />
      <div className="flex items-center justify-between">
        <Button
          text="Create"
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
      toggleModal={comModal.toggleModal}
      isOpen={comModal.isOpen}
    />
  );
}
