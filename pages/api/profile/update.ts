import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import ApiError from "@/error/ApiError";
import handleError from "@/error/handleError";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    if (!currentUser) throw ApiError.isNotAuth("Not authenticated");
    const { name, bio, location, site } = req.body;

    if (!name || !bio || !location || !site)
      throw ApiError.badRequest("No data");
    const user = await prisma.user.update({
      where: {
        email: currentUser.email as string,
      },
      data: {
        name,
        bio,
        location,
        site,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    return handleError(error, res);
  }
}
