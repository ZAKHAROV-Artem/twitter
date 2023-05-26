import requireAuth from "@/utils/requireAuth";
import { NextPageContext } from "next";
import Header from "./../components/layout/header/Header";

export async function getServerSideProps(context: NextPageContext) {
  return requireAuth(context, () => {
    return {
      props: {},
    };
  });
}
export default function Notifications() {
  return (
    <div>
      <Header text="Notifications" />
    </div>
  );
}
