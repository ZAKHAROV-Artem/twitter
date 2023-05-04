import { useFormik } from "formik";
import Input from "../inputs/Input";
import Modal from "./Modal";
import useRegisterModal from "@/state/RegisterModalState";
import registerFormValidationSchema from "@/validation/RegisterFormSchema";
import Button from "../inputs/Button";
import DatePicker from "../inputs/DatePicker";
import Divider from "../data-display/Divider";
import GoogleLoginButton from "../inputs/GoogleLoginButon";

export default function RegisterModal() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthDate: new Date(),
    },
    validateOnBlur: true,
    validationSchema: registerFormValidationSchema,
    onSubmit: (values, actions) => {
      alert(JSON.stringify(values, null, 2));
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
          />
          <DatePicker
            id="birthDate"
            name="birthDate"
            selected={formik.values.birthDate}
            onChange={formik.setFieldValue}
            maxDate={new Date()}
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div className="flex justify-end">
          <Button
            onClick={formik.handleSubmit}
            disabled={!formik.isValid}
            text="Create"
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
      toggleModal={regModal.toggleModal}
      isOpen={regModal.isOpen}
    />
  );
}
