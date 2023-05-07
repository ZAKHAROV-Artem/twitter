import { useEffect, useState } from "react";
import { VscClose } from "react-icons/vsc";
import Spinner from "../feedback/Spinner";

interface ModalProps {
  body: JSX.Element;
  loading?: boolean;
  toggleModal: () => void;
  submitModal?: () => void;
  isOpen: boolean;
}
export default function Modal({
  body,
  toggleModal,
  isOpen,
  loading,
  submitModal,
}: ModalProps) {
  const [showModal, setShowModal] = useState<boolean>(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = (e: any) => {
    e.stopPropagation();
    setShowModal(false);
    setTimeout(() => {
      toggleModal();
    }, 300);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-screen">
      <div
        onClick={(e) => handleClose(e)}
        className={`absolute h-screen w-screen ${
          showModal ? "bg-modal" : "bg-modal/0"
        } duration-300`}
      />
      <div
        className={`relative mx-auto h-screen w-full bg-black p-3 duration-300 md:mt-10 md:h-fit md:max-w-xl md:rounded-2xl  ${
          showModal ? "translate-y-0" : "translate-y-full"
        }
          ${showModal ? "opacity-100" : "opacity-0"}`}
      >
        <div>
          {/* === HEADER === */}
          <div
            className="mb-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-gray-300/20"
            onClick={handleClose}
          >
            <VscClose color="white" size={25} />
          </div>
          {/* === MAIN === */}
          <div className="text-white">{body}</div>
          {loading && (
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center  bg-black md:rounded-2xl">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
