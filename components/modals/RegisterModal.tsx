import { useFormik } from "formik";
import Input from "../inputs/Input";
import Modal from "./Modal";
import useRegisterModal from "@/state/RegisterModalState";
import registerFormValidationSchema from "@/validation/RegisterFormSchema";
import Button from "../inputs/Button";
import DatePicker from "../inputs/DatePicker";
import Divider from "../data-display/Divider";
import GoogleLoginButton from "../inputs/GoogleLoginButon";
import axios from "axios";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useState } from "react";

export default function RegisterModal() {
  const [loading, setLoading] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      birthDate: new Date(),
      password: "",
    },
    validateOnBlur: true,
    validationSchema: registerFormValidationSchema,
    onSubmit: async (values, actions) => {
      setLoading(true);
      await axios
        .post("/api/registration", values)
        .then(() => {
          toast.success("Account created successfully !");
          signIn("credentials", {
            email: values.email,
            password: values.password,
          });
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    },
  });
  const regModal = useRegisterModal();

  const body: JSX.Element = (
    <div className="mx-5 my-3">
      <div className="mb-3 text-2xl font-bold">Create your account</div>
      <div>
        <div className="mb-3 flex flex-col gap-y-4">
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={(formik.touched.name && formik.errors.name) || ""}
          />
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={(formik.touched.email && formik.errors.email) || ""}
          />{" "}
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={(formik.touched.username && formik.errors.username) || ""}
          />
          <DatePicker
            id="birthDate"
            name="birthDate"
            selected={formik.values.birthDate}
            onChange={formik.setFieldValue}
            maxDate={new Date()}
            dateFormat="yyyy/MM/dd"
          />{" "}
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
            onClick={()=>formik.handleSubmit()}
            disabled={!formik.isValid}
            text="Create"
            variant="filled"
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
      toggleModal={regModal.toggleModal}
      isOpen={regModal.isOpen}
    />
  );
}
