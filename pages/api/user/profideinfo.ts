import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/utils/serverAuth";
import handleError from "@/error/handleError";
import ApiError from "@/error/ApiError";
import { prisma } from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const currentUser = await serverAuth(req, res);
    if (!currentUser) return;
    const { username } = req.body;
    if (!username)
      throw ApiError.badRequest(
        "I can not update username without username :("
      );
    const candidate = await prisma?.user.findUnique({ where: { username } });
    if (candidate)
      throw ApiError.badRequest(
        "Username with this username already exists :("
      );

    const user = await prisma?.user.update({
      where: {
        email: currentUser.email as string,
      },
      data: {
        username,
        infoProvided: true,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    handleError(error, res);
  }
}
