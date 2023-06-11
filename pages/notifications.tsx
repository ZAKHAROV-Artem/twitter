import requireAuth from "@/utils/requireAuth";
import { NextPageContext } from "next";
import Header from "./../components/layout/header/Header";
import NotificationList from "@/components/layout/notifications/NotificationList";

export async function getServerSideProps(context: NextPageContext) {
  return requireAuth(context, async () => {
    return {
      props: {},
    };
  });
}
export default function Notifications() {
  
  return (
    <div>
      <Header text="Notifications" />
      <NotificationList />
    </div>
  );
}
