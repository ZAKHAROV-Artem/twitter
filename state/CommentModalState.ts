import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  isOpen: boolean;
  postId:string;
};
type Actions = {
  toggleModal: (postId?:string) => void;
};
const useCommentModal = create(
  immer<State & Actions>((set) => ({
    isOpen: false,
    postId:"",
    toggleModal: (postId) =>
      set((state) => {
        state.isOpen = !state.isOpen;
        if(state.isOpen && postId)state.postId=postId
      }),
  }))
);

export default useCommentModal;
