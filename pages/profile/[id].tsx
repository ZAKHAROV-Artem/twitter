import requireAuth from "@/utils/requireAuth";
import { NextPageContext } from "next";
import ProfileHeader from "../../components/layout/profile/ProfileHeader";
import ProfilePosts from "@/components/layout/profile/ProfilePosts";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";
import NotFound from "../404";

export async function getServerSideProps(context: NextPageContext) {
  return requireAuth(context, () => {
    return {
      props: {},
    };
  });
}

export default function Profile() {
  const router = useRouter();
  const { user, isLoading } = useUser(router.query.id as string);
  if (isLoading) return null;
  if (!user) return <NotFound />;
  return (
    <div>
      <ProfileHeader user={user} />
      <ProfilePosts user={user} />
    </div>
  );
}
