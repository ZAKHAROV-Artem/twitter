import requireAuth from "@/utils/requireAuth";
import { NextPageContext } from "next";

export async function getServerSideProps(context: NextPageContext) {
  return requireAuth(context, () => {
    return {
      props: {},
    };
  });
}
export default function Notifications() {
  return <div></div>;
}
