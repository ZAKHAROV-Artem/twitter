import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  isOpen: boolean;
};
type Actions = {
  toggleModal: () => void;
};
const useRegisterModal = create(
  immer<State & Actions>((set) => ({
    isOpen: false,
    toggleModal: () =>
      set((state) => {
        state.isOpen = !state.isOpen;
      }),
  }))
);

export default useRegisterModal;
