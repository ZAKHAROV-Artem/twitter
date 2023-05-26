import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import handleError from "@/error/handleError";
import { signOut } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    if (!currentUser) signOut();
    const { hashedPassword, ...user } = currentUser;
    return res.status(200).json(user);
  } catch (error) {
    console.log("Not auth");
    return handleError(error, res);
  }
}
