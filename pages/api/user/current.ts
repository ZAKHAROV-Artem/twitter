import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/utils/serverAuth";
import handleError from "@/error/handleError";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const currentUser = await serverAuth(req, res);
    if (!currentUser) return;
    const { hashedPassword, ...user } = currentUser;
    return res.status(200).json(user);
  } catch (error) {
    handleError(error, res);
  }
}
