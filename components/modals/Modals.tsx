import useCurrentUser from "@/hooks/useCurrentUser";
import CommentModal from "./CommentModal";
import EditProfileModal from "./EditProfileModal";
import ProvideInfoModal from "./ProvideInfoModal";
import RegisterModal from "./RegisterModal";
import SignInModal from "./SignInModal";
import TweetModal from "./TweetModal";

export default function Modals() {
  const { user } = useCurrentUser();
  return (
    <>
      <TweetModal />
      <SignInModal />
      <RegisterModal />
      <EditProfileModal />
      <CommentModal />
      {!user?.infoProvided && <ProvideInfoModal />}
    </>
  );
}
