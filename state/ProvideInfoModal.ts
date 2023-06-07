import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  isOpen: boolean;
};
type Actions = {
  toggleModal: () => void;
  openModal:()=>void;
};
const useProvideInfoModal = create(
  immer<State & Actions>((set) => ({
    isOpen: false,
    toggleModal: () =>
      set((state) => {
        state.isOpen = !state.isOpen;
      }),
    openModal: () =>
      set((state) => {
        state.isOpen = true;
      }),
  }))
);

export default useProvideInfoModal;
