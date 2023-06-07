import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  isOpen: boolean;
  postId: string;
  username: string;
};
type Actions = {
  toggleModal: (postId?: string,username?:string) => void;
};
const useCommentModal = create(
  immer<State & Actions>((set) => ({
    isOpen: false,
    postId: "",
    username: "",
    toggleModal: (postId, username) =>
      set((state) => {
        state.isOpen = !state.isOpen;
        if (state.isOpen && postId && username) {
          state.postId = postId;
          state.username = username;
        }
      }),
  }))
);

export default useCommentModal;
