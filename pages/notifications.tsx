import requireAuth from "@/utils/requireAuth";
import { NextPageContext } from "next";
import Header from "./../components/layout/header/Header";
import NotificationList from "@/components/layout/notifications/NotificationList";
import useClearNotifications from "@/hooks/useClearNotifications";
import { useEffect } from 'react';

export async function getServerSideProps(context: NextPageContext) {
  return requireAuth(context, async () => {
    return {
      props: {},
    };
  });
}
export default function Notifications() {
  const {mutate} = useClearNotifications();
  useEffect(()=>{
    mutate()
  },[]);
  return (
    <div>
      <Header text="Notifications" />
      <NotificationList />
    </div>
  );
}
