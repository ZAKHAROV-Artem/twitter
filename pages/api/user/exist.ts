import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/utils/serverAuth";
import handleError from "@/error/handleError";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import ApiError from "@/error/ApiError";

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
    const { username } = req.query;

    if (!username)
      throw ApiError.badRequest(
        "I can not check whether username already taken without username :("
      );

    const candidate = await prisma?.user.findUnique({
      where: { username: username as string },
    });
    return res.status(200).json(!!candidate);
  } catch (error) {
    handleError(error, res);
  }
}
