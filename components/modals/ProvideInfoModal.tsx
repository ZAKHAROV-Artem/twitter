import Modal from "./Modal";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import Divider from "../data-display/Divider";
import Button from "../inputs/Button";
import useCurrentUser from "@/hooks/useCurrentUser";
import useProvideInfoModal from "@/state/ProvideInfoModalState";
import useProvideInfo from "@/hooks/useProvideInfo";
import Input from "../inputs/Input";
import provideInfoFormValidationSchema from "@/validation/ProvideInfoFormSchema copy";
import useUserExist from "@/hooks/useUserExist";

export default function ProvideInfoModal() {
  const { user } = useCurrentUser();
  const provideInfoModal = useProvideInfoModal();
  const [loading, setLoading] = useState<boolean>(false);
  const { mutateAsync } = useProvideInfo();

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    enableReinitialize: true,
    validationSchema: provideInfoFormValidationSchema,
    onSubmit: async (values, actions) => {
      setLoading(true);

      await mutateAsync(values.username)
        .then(() => {
          toast.success("Info successfully provided");
          provideInfoModal.toggleModal();
        })
        .catch((err: AxiosError<{ message: string }>) => {
          toast.error(err.response?.data.message || "", {
            duration: 4000,
          });
        })
        .finally(() => {
          setLoading(false);
          actions.resetForm();
        });
    },
  });

  const {isExist} = useUserExist(formik.values.username)


  const body: JSX.Element = (
    <div className="w-full">
      <div className="my-3 text-2xl font-bold">Provide required data</div>
      <div className="mb-3 text-lg font-bold">
        if you close this window, you will be singed out
      </div>
      <div className="">
        <Input
          type="text"
          name="username"
          id="username"
          placeholder="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={(formik.touched.username && formik.errors.username) || isExist && "Username already taken" || ""}
        />
      </div>
      <Divider className="my-2" />
      <div className="flex items-center justify-between">
        <Button
          onClick={() => {
            formik.validateForm();
            formik.handleSubmit();
          }}
          disabled={!formik.isValid || isExist}
          text="Save profile"
          variant="filled"
        />
      </div>
    </div>
  );
  return (
    <Modal
      body={body}
      loading={loading}
      canClose={false}
      toggleModal={provideInfoModal.toggleModal}
      isOpen={provideInfoModal.isOpen}
    />
  );
}
