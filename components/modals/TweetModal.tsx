import useTweetModal from "@/state/TweetModalState";
import Avatar from "../data-display/Avatar";
import Modal from "./Modal";

interface TweetModalProps {}
export default function TweetModal({}: TweetModalProps) {
  const twModal = useTweetModal();

  const handleSubmit = () => {};
  const body: JSX.Element = (
    <div className="flex">
      <Avatar name="Zakharov Artem" />
      <div></div>
    </div>
  );
  return (
    <Modal
      body={body}
      toggleModal={twModal.toggleModal}
      isOpen={twModal.isOpen}
    />
  );
}
