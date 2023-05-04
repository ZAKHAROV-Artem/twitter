import useSignInModal from "@/state/SignInModalState";
import Modal from "./Modal";
import { useFormik } from "formik";
import loginFormValidationSchema from "@/validation/LoginFormSchema";
import GoogleLoginButton from "../inputs/GoogleLoginButon";
import Divider from "../data-display/Divider";
import Button from "../inputs/Button";
import Input from "../inputs/Input";

export default function SignInModal() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: true,
    validationSchema: loginFormValidationSchema,
    onSubmit: (values, actions) => {
      alert(JSON.stringify(values, null, 2));
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
      toggleModal={signInModal.toggleModal}
      isOpen={signInModal.isOpen}
    />
  );
}
