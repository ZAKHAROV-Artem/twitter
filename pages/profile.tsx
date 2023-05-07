import useCurrentUser from "@/hooks/useCurrentUser";
import requireAuth from "@/utils/requireAuth";
import { NextPageContext } from "next";
import ProfileHeader from "./../components/pages/profile/ProfileHeader";

export async function getServerSideProps(context: NextPageContext) {
  return requireAuth(context, () => {
    return {
      props: {},
    };
  });
}

export default function Profile() {
  const { data: user } = useCurrentUser();
  return (
    <div>
      <ProfileHeader />
    </div>
  );
}
