import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/utils/serverAuth";
import handleError from "@/error/handleError";
import ApiError from "@/error/ApiError";
import { prisma } from "@/libs/prismadb";

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
