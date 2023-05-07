import { getSession } from "next-auth/react";

export default async function requireAuth(context: any, cb: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return cb();
}
