import useSignInModal from "@/state/SignInModalState";
import Modal from "./Modal";
import { useFormik } from "formik";
import loginFormValidationSchema from "@/validation/LoginFormSchema";
import GoogleLoginButton from "../inputs/GoogleLoginButon";
import Divider from "../data-display/Divider";
import Button from "../inputs/Button";
import Input from "../inputs/Input";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useState } from "react";

export default function SignInModal() {
  const [loading, setLoading] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: true,
    validationSchema: loginFormValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      await signIn("credentials", values)
        .then(() => {
          toast.success("Successfully sign in!");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    },
  });
  const signInModal = useSignInModal();
  const body: JSX.Element = (
    <div className="mx-5 my-3">
      <div className="mb-3 text-2xl font-bold">Enter to your account</div>
      <div>
        <div className="mb-3 flex flex-col gap-y-4">
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={(formik.touched.email && formik.errors.email) || ""}
          />
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={(formik.touched.password && formik.errors.password) || ""}
          />
        </div>
        <div className="flex justify-end">
          <Button
            onClick={formik.handleSubmit}
            disabled={!formik.isValid}
            text="Sign in"
            type="filled"
          />
        </div>
      </div>
      <Divider text="or" />
      <div>
        <GoogleLoginButton />
      </div>
    </div>
  );
  return (
    <Modal
      body={body}
      loading={loading}
      toggleModal={signInModal.toggleModal}
      isOpen={signInModal.isOpen}
    />
  );
}
