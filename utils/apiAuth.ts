import serverAuth from "@/libs/serverAuth";
import { signOut } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async function apiAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { currentUser } = await serverAuth(req, res);
  if (!currentUser) signOut();
  return currentUser;
}
