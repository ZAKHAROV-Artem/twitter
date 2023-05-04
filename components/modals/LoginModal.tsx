import useLoginModal from "@/state/LoginModalState";
import Avatar from "../data-display/Avatar";
import Modal from "./Modal";

export default function LoginModal() {
  const logModal = useLoginModal();

  const handleSubmit = () => {};
  const body: JSX.Element = (
    <div className="flex">
      Login Modal
      <div></div>
    </div>
  );
  return (
    <Modal
      body={body}
      toggleModal={logModal.toggleModal}
      isOpen={logModal.isOpen}
    />
  );
}
