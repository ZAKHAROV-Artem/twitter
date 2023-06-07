import useNotifications from "@/hooks/useNotifications";
import { Fragment } from "react";
import { InView } from "react-intersection-observer";
import Notification from "./Notification";

export default function NotificationList() {
  const {
    data: notifications,
    isFetchingNextPage,
    fetchNextPage,
  } = useNotifications();

  const handleNextPage = async (isView: boolean) => {
    if (isView && !isFetchingNextPage) await fetchNextPage();
  };
  return (
    <div className="relative">
      {notifications?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.data.map((notification) => (
            <Notification notification={notification} key={notification.id} />
          ))}
        </Fragment>
      ))}

      <InView
        as="div"
        className="absolute bottom-0 h-2 w-full bg-transparent"
        onChange={handleNextPage}
      />
    </div>
  );
}
